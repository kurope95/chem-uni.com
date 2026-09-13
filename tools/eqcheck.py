# -*- coding: utf-8 -*-
"""Nezávislá kontrola bilance rovnic v hotových průvodcích."""
import io, re, sys, collections, glob, os
try: sys.stdout.reconfigure(encoding="utf-8")
except Exception: pass

SUB = str.maketrans("₀₁₂₃₄₅₆₇₈₉", "0123456789")
SUP = {"⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁺":"+","⁻":"-"}

def parse_species(t):
    """vrátí (Counter atomů, náboj) nebo None"""
    t = t.strip()
    m = re.match(r"^(\d+)\s+(.*)$", t)
    coef = int(m.group(1)) if m else 1
    if m: t = m.group(2)
    t = re.sub(r"\((s|l|g|aq)\)$", "", t.strip())
    charge = 0
    ms = re.search(r"([⁰¹²³⁴⁵⁶⁷⁸⁹]*[⁺⁻])$", t)
    if ms:
        raw = "".join(SUP.get(c, "") for c in ms.group(1))
        sign = 1 if raw.endswith("+") else -1
        num = raw[:-1]
        charge = sign * (int(num) if num else 1)
        t = t[:ms.start()]
    t = t.translate(SUB)
    if not re.fullmatch(r"[A-Za-z0-9()\[\]·.]+", t): return None
    def expand(s):
        cnt = collections.Counter(); i = 0
        while i < len(s):
            c = s[i]
            if c in "([":
                d, j = 0, i
                while j < len(s):
                    if s[j] in "([": d += 1
                    elif s[j] in ")]":
                        d -= 1
                        if d == 0: break
                    j += 1
                if j >= len(s): return None
                inner = expand(s[i+1:j])
                if inner is None: return None
                k = j + 1; num = ""
                while k < len(s) and s[k].isdigit(): num += s[k]; k += 1
                mult = int(num) if num else 1
                for e, n in inner.items(): cnt[e] += n * mult
                i = k; continue
            if c in "·.":
                k = i + 1; num = ""
                while k < len(s) and s[k].isdigit(): num += s[k]; k += 1
                rest = expand(s[k:])
                if rest is None: return None
                mult = int(num) if num else 1
                for e, n in rest.items(): cnt[e] += n * mult
                return cnt
            m2 = re.match(r"([A-Z][a-z]?)(\d*)", s[i:])
            if not m2 or not m2.group(1): return None
            cnt[m2.group(1)] += int(m2.group(2)) if m2.group(2) else 1
            i += len(m2.group(0))
        return cnt
    at = expand(t)
    if at is None: return None
    return collections.Counter({k: v*coef for k, v in at.items()}), charge*coef

def check(eq):
    if "→" not in eq: return None
    L, R = eq.split("→", 1)
    if "→" in R: return None
    def side(x):
        tot = collections.Counter(); ch = 0
        for part in re.split(r"\s\+\s", x):
            p = parse_species(part)
            if p is None: return None
            tot += p[0]; ch += p[1]
        return tot, ch
    a, b = side(L), side(R)
    if a is None or b is None: return None
    return (a[0] == b[0] and a[1] == b[1]), a, b

files = sys.argv[1:]
for f in files:
    s = io.open(f, encoding="utf-8").read()
    eqs = set()
    for m in re.finditer(r'class="chem"[^>]*>(.*?)</span>', s, flags=re.S):
        t = re.sub(r"<[^>]+>", "", m.group(1))
        t = t.replace("&nbsp;", " ").replace("&rarr;", "→").replace("&amp;", "&")
        t = re.sub(r"\s+", " ", t).strip()
        if "→" in t and t.count("→") == 1: eqs.add(t)
    ok = bad = skip = 0; bads = []
    for e in sorted(eqs):
        r = check(e)
        if r is None: skip += 1
        elif r[0]: ok += 1
        else:
            bad += 1
            if len(bads) < 6: bads.append((e, dict(r[1][0]), dict(r[2][0]), r[1][1], r[2][1]))
    print("\n%-44s rovnic:%-4d vyvážených:%-4d NEVYVÁŽENÝCH:%-3d nepřečteno:%d"
          % (os.path.basename(f), len(eqs), ok, bad, skip))
    for e, l, rr, cl, cr in bads:
        print("   ✗ %s" % e[:88])
        print("      vlevo %s náboj %+d | vpravo %s náboj %+d" % (l, cl, rr, cr))
