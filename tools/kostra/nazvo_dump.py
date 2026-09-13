# -*- coding: utf-8 -*-
"""nazvo_dump.py — vypíše datovou tabulku do JSON pro Node.js."""
import io, os, sys, json
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import nazvo_data as ND

out = os.path.join(HERE, "nazvo_data.json")
io.open(out, "w", encoding="utf-8").write(
    json.dumps(ND.export(), ensure_ascii=False, separators=(",", ":")))
print(out)
