# -*- coding: utf-8 -*-
"""shuffle_answers.py — rozhází pořadí možností u otázek typu `single`, aby správná
odpověď nebyla pořád první. Pracuje přímo nad hotovým HTML průvodcem.

Použití:
    python shuffle_answers.py <soubor.html>            # jen ukáže, co by udělal
    python shuffle_answers.py <soubor.html> --apply    # zapíše změnu (zálohu .bak)

Bezpečnost: mění jen pole `o:[…]` a odpovídající `c:N` uvnitř bloků BANK.*.
Text otázky ani vysvětlení nesahá. Možnosti, jejichž text odkazuje na pořadí
(„všechny výše uvedené", „ani jedna z možností", „a) i b)"), nechá na místě.
"""
import io, os, re, sys, random, collections

ANCHORED = re.compile(
    r"(všechn|ani jedn|žádná z|obě před|všechny výše|nic z uveden|a\)|b\)|c\)|d\))",
    re.I)

def split_options(body):
    """Rozdělí obsah o:[...] na jednotlivé řetězcové literály (respektuje escapy)."""
    out, i, n = [], 0, len(body)
    while i < n:
        while i < n and body[i] in " \t\r\n,":
            i += 1
        if i >= n:
            break
        q = body[i]
        if q not in "\"'":
            return None
        j, buf = i + 1, [q]
        while j < n:
            if body[j] == "\\":
                buf.append(body[j:j + 2]); j += 2; continue
            buf.append(body[j])
            if body[j] == q:
                j += 1; break
            j += 1
        else:
            return None
        out.append("".join(buf))
        i = j
    return out

def find_blocks(s):
    """Najde všechny otázky typu single: vrátí (start, end, o_span, options, c_span, c_val)."""
    res = []
    for m in re.finditer(r't\s*:\s*"single"', s):
        # konec objektu otázky: nejbližší '\n {t:' nebo '\n];'
        nxt = re.search(r'\n\s*[\{\]]', s[m.end():])
        end = m.end() + (nxt.start() if nxt else 4000)
        seg = s[m.start():end]
        om = re.search(r'\bo\s*:\s*\[', seg)
        if not om:
            continue
        # najdi uzavírací ] pro o:[
        depth, i = 1, om.end()
        while i < len(seg) and depth:
            if seg[i] == "[": depth += 1
            elif seg[i] == "]": depth -= 1
            i += 1
        o_body = seg[om.end():i - 1]
        opts = split_options(o_body)
        cm = re.search(r'\bc\s*:\s*(\d+)', seg[i:])
        if not opts or len(opts) < 3 or not cm:
            continue
        res.append({
            "o_start": m.start() + om.end(),
            "o_end": m.start() + i - 1,
            "opts": opts,
            "c_start": m.start() + i + cm.start(1),
            "c_end": m.start() + i + cm.end(1),
            "c": int(cm.group(1)),
        })
    return res

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    path = sys.argv[1]
    apply = "--apply" in sys.argv
    seed = 20260912
    s = io.open(path, encoding="utf-8").read()
    blocks = find_blocks(s)
    if not blocks:
        print("Nenalezena žádná otázka typu single."); sys.exit(1)

    rnd = random.Random(seed)
    before = collections.Counter(b["c"] for b in blocks)
    n = len(blocks)
    # cílové pozice: rovnoměrně rozdělené, pak zamíchané
    targets = [i % 4 for i in range(n)]
    rnd.shuffle(targets)

    skipped, changed, edits = [], 0, []
    for k, b in enumerate(blocks):
        opts = b["opts"]
        if any(ANCHORED.search(o) for o in opts):
            skipped.append(k); continue
        tgt = min(targets[k], len(opts) - 1)
        correct = opts[b["c"]]
        rest = [o for i, o in enumerate(opts) if i != b["c"]]
        rnd.shuffle(rest)
        new = rest[:tgt] + [correct] + rest[tgt:]
        assert sorted(new) == sorted(opts) and new[tgt] == correct
        if new != opts or tgt != b["c"]:
            changed += 1
        edits.append((b, new, tgt))

    # aplikuj odzadu, ať nerozhodíš offsety
    out = s
    for b, new, tgt in sorted(edits, key=lambda x: -x[0]["o_start"]):
        out = out[:b["c_start"]] + str(tgt) + out[b["c_end"]:]
        out = out[:b["o_start"]] + ",".join(new) + out[b["o_end"]:]

    after = collections.Counter()
    for b, new, tgt in edits: after[tgt] += 1
    for k in skipped: after[blocks[k]["c"]] += 1

    print("otázek typu single:", n, " přeskočeno (odkaz na pořadí):", len(skipped), " změněno:", changed)
    print("  před:", dict(sorted(before.items())))
    print("  po:  ", dict(sorted(after.items())))

    if apply:
        io.open(path + ".bak", "w", encoding="utf-8", newline="\n").write(s)
        io.open(path, "w", encoding="utf-8", newline="\n").write(out)
        print("zapsáno:", path, " (záloha:", path + ".bak)")
    else:
        tmp = os.path.join(os.environ.get("TEMP", "."), "shuffled_" + os.path.basename(path))
        io.open(tmp, "w", encoding="utf-8", newline="\n").write(out)
        print("náhled zapsán do:", tmp, " (pro zápis do originálu přidej --apply)")

if __name__ == "__main__":
    main()
