# -*- coding: utf-8 -*-
"""Prevede zkratkovy zapis kroku reseneho prikladu
   <div class="step"><span class="eyebrow">Nadpis</span>...</div>
   na markup, ktery ceka CSS kostry (.step-n + .step-b)."""
import re, io, sys

for p in sys.argv[1:]:
    s = io.open(p, encoding="utf-8").read()
    if 'class="step"><span class="eyebrow"' not in s:
        print(p, "- nic k opravě"); continue
    parts = s.split('<div class="worked-steps">')
    res = [parts[0]]
    for part in parts[1:]:
        m = re.search(r'</div>\s*\n\s*</div>\s*\n\s*</div>', part)
        body, rest = part[:m.start()], part[m.start():]
        n = [0]
        def rep(mm):
            n[0] += 1
            return ('<div class="step"><span class="step-n">%d</span><div class="step-b">'
                    '<p class="eyebrow" style="color:var(--accent)">%s</p>' % (n[0], mm.group(1)))
        body = re.sub(r'<div class="step"><span class="eyebrow">([^<]*)</span>', rep, body)
        body = re.sub(r'</p></div>(\s*\n)', r'</p></div></div>\1', body)
        res.append(body + rest)
    io.open(p, "w", encoding="utf-8").write('<div class="worked-steps">'.join(res))
    print(p, "- opraveno")
