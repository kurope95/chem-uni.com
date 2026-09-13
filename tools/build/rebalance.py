# -*- coding: utf-8 -*-
"""Rebalance correct-answer positions in single-choice questions by rotating option lists."""
import io, os, re, sys, random
sys.stdout.reconfigure(encoding="utf-8")

D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "elektronovy-obal")
FILES = ["50-bank-a.js", "51-bank-b.js", "52-bank-final.js", "53-bank-rychlo.js"]

def find_array(s, i):
    """s[i] == '[' ; return (elements, end_index_after_])"""
    assert s[i] == "["
    depth = 0
    j = i
    q = None
    parts = []
    start = i + 1
    while j < len(s):
        ch = s[j]
        if q:
            if ch == "\\":
                j += 2; continue
            if ch == q:
                q = None
        else:
            if ch in "\"'":
                q = ch
            elif ch == "[":
                depth += 1
            elif ch == "]":
                depth -= 1
                if depth == 0:
                    parts.append(s[start:j])
                    return parts, j + 1
            elif ch == "," and depth == 1:
                parts.append(s[start:j]); start = j + 1
        j += 1
    raise ValueError("unterminated array")

def process(path, targets_iter):
    s = io.open(path, encoding="utf-8").read()
    out = []
    pos = 0
    changed = 0
    for m in re.finditer(r'\{t:"single"', s):
        if m.start() < pos:
            continue
        # find o:[ after this
        om = re.compile(r'\bo:\s*\[').search(s, m.end())
        if not om:
            continue
        elems, aend = find_array(s, om.end() - 1)
        cm = re.compile(r'\s*,\s*c:\s*(\d)\s*,').match(s, aend)
        if not cm:
            continue
        c = int(cm.group(1))
        n = len(elems)
        target = next(targets_iter)
        if target >= n:
            target = target % n
        k = (c - target) % n          # rotate left by k
        new = elems[k:] + elems[:k]
        assert new[target].strip() == elems[c].strip()
        out.append(s[pos:om.end() - 1])
        out.append("[" + ",".join(new) + "]")
        out.append(",c:%d," % target)
        pos = cm.end()
        changed += 1
    out.append(s[pos:])
    io.open(path, "w", encoding="utf-8", newline="\n").write("".join(out))
    return changed

rng = random.Random(20260912)
def targets():
    while True:
        p = [0, 1, 2, 3]
        rng.shuffle(p)
        for x in p:
            yield x

it = targets()
tot = 0
for f in FILES:
    n = process(os.path.join(D, f), it)
    print(f, "->", n, "single questions rotated")
    tot += n
print("total", tot)
