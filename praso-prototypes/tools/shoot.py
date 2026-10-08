"""Gera screenshots dos protótipos (393×852 @3x) e comparativos lado a lado com as referências.
Uso: python3 tools/shoot.py [url_base] [out_dir] [ref_dir]
"""
import sys, os
from playwright.sync_api import sync_playwright
from PIL import Image

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8765/prototypes/app-atual/index.html'
OUT = sys.argv[2] if len(sys.argv) > 2 else '/tmp/shots'
REF = sys.argv[3] if len(sys.argv) > 3 else None
os.makedirs(OUT, exist_ok=True)

# (nome, hash, seletor para alinhar, y alvo em pt na tela, referência)
SHOTS = [
    ('splash', 'splash', None, 0, 'ref-splash.png'),
    ('inicio-topo', 'inicio', None, 0, 'ref-inicio-topo.png'),
    ('inicio-departamentos', 'inicio', '.ps-depts', 494, 'ref-inicio-departamentos.png'),
    ('inicio-harald', 'inicio', '.ps-brand__banner[src*=harald]', 127, 'ref-inicio-harald.png'),
    ('inicio-combos', 'inicio', '.ps-combo', 379, 'ref-inicio-combos.png'),
    ('explorar', 'explorar', None, 0, 'ref-explorar.png'),
    ('notificacoes', 'notificacoes', None, 0, 'ref-notificacoes.png'),
    ('conta', 'conta', None, 0, 'ref-conta.png'),
    ('carrinho', 'carrinho', None, 0, 'ref-carrinho.png'),
]

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 393, 'height': 852}, device_scale_factor=3)
    for name, h, sel, y, ref in SHOTS:
        pg.goto(f'{BASE}#/{h}'); pg.wait_for_timeout(700)
        if sel:
            pg.evaluate("""([sel,y]) => { const s=document.querySelector('.ps-scroll'); const el=document.querySelector(sel);
              if(!el) return; s.scrollTop += el.getBoundingClientRect().top - y; }""", [sel, y])
            pg.wait_for_timeout(300)
        f = f'{OUT}/{name}.png'; pg.screenshot(path=f)
        if REF and os.path.exists(os.path.join(REF, ref)):
            a = Image.open(os.path.join(REF, ref)).convert('RGB').resize((1179, 2556))
            m = Image.open(f).convert('RGB')
            c = Image.new('RGB', (1179 * 2 + 30, 2556), 'white'); c.paste(a, (0, 0)); c.paste(m, (1209, 0))
            c.resize((c.width // 2, c.height // 2)).save(f'{OUT}/cmp-{name}.png')
    b.close()
print('ok', OUT)
