# -*- coding: utf-8 -*-
"""brand.py — logo webu: benzenové jádro.

Šestiúhelník uhlíkového skeletu s atomy uhlíku ve vrcholech, vazby C–H s atomy
vodíku a uvnitř tečkovaný šestiúhelník delokalizovaných elektronů π.

  * logo_svg()      — do horní lišty (dlaždice .brand .dot dodá barvu pozadí,
                      kresba bere currentColor, takže sedí světlý i tmavý režim)
  * favicon_links() — ikona v záložce prohlížeče (SVG + PNG pro starší prohlížeče);
                      jednodušší a tučnější kresba, protože 16 px jemné detaily nedá.

Jiné logo („Ch“ apod.) do stránek nepsat ručně — vždy odsud.
"""
import base64, urllib.parse

C = 16.0          # střed
R = 8.0           # poloměr uhlíkového šestiúhelníku
# vrcholy (hrotem nahoru), v pořadí po směru hodinových ručiček
_UNIT = [(0, -1), (0.8660254, -0.5), (0.8660254, 0.5), (0, 1), (-0.8660254, 0.5), (-0.8660254, -0.5)]


def _f(v):
    return ("%.2f" % v).rstrip("0").rstrip(".")


def _pts(r):
    return " ".join("%s,%s" % (_f(C + ux * r), _f(C + uy * r)) for ux, uy in _UNIT)


def _stubs(r_from, length):
    return "".join("M%s %sl%s %s" % (_f(C + ux * r_from), _f(C + uy * r_from), _f(ux * length), _f(uy * length))
                   for ux, uy in _UNIT)


def _dots(r, radius):
    return "".join('<circle cx="%s" cy="%s" r="%s"/>' % (_f(C + ux * r), _f(C + uy * r), _f(radius))
                   for ux, uy in _UNIT)


# kresba loga (viewBox 0 0 32 32), barva currentColor
LOGO_BODY = (
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">'
    '<path stroke-width="1.2" d="%s"/>'                                 # vazby C–H
    '<polygon stroke-width="1.8" points="%s"/>'                         # uhlíkový skelet
    '<polygon stroke-width="1.8" stroke-dasharray="0 2.2" points="%s"/>'  # delokalizované π (tečky)
    '</g>'
    '<g fill="currentColor">%s%s</g>'                                   # atomy C a H
) % (_stubs(R, 3.0), _pts(R), _pts(4.4), _dots(R, 1.6), _dots(R + 3.4, 1.05))


def logo_svg(size=26):
    return ('<svg class="logo" viewBox="0 0 32 32" width="%d" height="%d" aria-hidden="true" '
            'focusable="false">%s</svg>' % (size, size, LOGO_BODY))


# ikona záložky: pevné barvy webu (akcent a papír), tučnější čáry, bez atomů vodíku
FAVICON_SVG = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
    '<rect width="32" height="32" rx="7" fill="#9b3320"/>'
    '<g fill="none" stroke="#fff7f2" stroke-linecap="round" stroke-linejoin="round">'
    '<path stroke-width="1.9" d="%s"/>'
    '<polygon stroke-width="2.3" points="%s"/>'
    '<polygon stroke-width="2.4" stroke-dasharray="0 4.4" points="%s"/>'
    '</g><g fill="#fff7f2">%s</g></svg>'
) % (_stubs(R, 3.4), _pts(R), _pts(4.4), _dots(R, 2.0))

# PNG 32 px téže ikony pro prohlížeče bez SVG ikon — vykreslené z FAVICON_SVG v prohlížeči
# (canvas.toDataURL). Po změně FAVICON_SVG je potřeba vykreslit znovu.
FAVICON_PNG_32 = (
    "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFJElEQVR4AaxWfUxVZRj/nSP3AooIWmqiKOZsa7oUaDRKFAhTWIZIDdOwGMqEtgy2BJIEXRDNmf0hmCAsoSRRoo9hi5SQxfoAXJNYFsUgBWKpfArcC/f0PO/l3nG5lzvOHWfvc87z9Xue33nP+773yph0feS32vus76rcQj+fmwV+q3QkyiyJjmtybe4xqSXMBCghXoahVZLwlgJlHSVpSGZraLgm1+Ye3MtUWBBgByUUkHM2m1I5m4PJFHBPjso8JdQ8jw214uq5CK6eC9XCRD735N6ypBiSyOPQm+8s/gyR58oI7tDQcG9ZlqRwh+AE0s6bD63bAtIcG9xbpql4zBH42vBIOLm6QDPXBaw7UoN78yJUPf1ztFoEJqdRT0kI67KTE+mqh4YJqEKt3BSC6NJKOLm4mnGsR3/yBVZuCjb7ZqrYJPBo6HYEJKVA6+ZmruPpswbhp84iLOcU5i9bDijAuE4nhHV3rxUU+xDbKcdjpY8ZxzUCXk/B6pDnzL7Jim0CWyOwfvc+7K6oRuw39YiraUDU+UtY5v+UwPa03ERF3Iuoe+8orr+bgcr4GLCPg16Us6v0c4FhLNdYH7MPq5/dxmErsUngakYKbhSfgcZ1rpgFWaOFJMkY+q8HNZmH8eWBPRjt68OWd3IQnJWLoZ5u4avJSsXw/buQKJcx/PZco6kon3CpVs3ZYZPAuG4UjefyMPhvN+cIURQD6nKz4Oy+ALwIh6jpra8q0FJRRk3vkc+ZYu6ozc4A5woQ3bgGExinmmRaDdnKM8nRVJxPlkSioPliKYLpjQOT07HML4B8IEKZqD+ZLXSvJwMQ+GY6NqcfF7likUBCU1GeiE93s0ug44dawtFqo0Jt175FV9PPGOnrRf/tdvJbjr6Odoz296L71ya01VRT0EjcWIPMaYZdAlMx372djNKIIPT90zE1RL52lIQH4eqRFKuYPYcqAvYKORpTRYDPgL1f18J9+Qqrfgu8V+GVqusIPX7CKmbPYZeA99ObCWv8lj4hW7F0gx9cPDyJgDemXu7LvWkXeFCOP3yCwyhsXDvGGmROM+wS8H3tIMGMhda9tBffH0tH/Qc5tBh/IT8QlJZFvwnpQu9s+Ili2bQNj4BzQQuXd4JvXCLsXTYJzNE6wy8+CW5LlpqxEh0uzxw+Ct1Avzh+5z/ihbURO/F4VIzI432uGxxAUGoWJMo1AbmGb9xBOie0JpfFU7awJozQYyew8dUE6IcfQDc4CINeJw6XeQ8tBp9+z+d/DA39TjQWngaLi8dC7DhTgi0ZOZi76GGRyxjGcg0mEJyZO1Hd8iFbmkark/Z7y+ULuBAVhvPbAlEU7I+K2Gh0NvwoEpas34ioonJsiI0n2Y/IwjIsXveEiN2hnMuxuwSGsVyDa3XdMH42kTTpZpNA88US+p454u1NuffbWlF16ACq0w5hoOsOIIGm1ZlEK/SBztsUewNXKKe37S+YLp4FXje/lX9qclk8bRKwyJhitNddw6U9L2BsZNgcYb385R1or6sx+2aqMAH9TJNNefw/oP5kDpm8QxSwbhgbI1v10MsSpFuqYQT4o6oSY8Mj0D8YAevkUj24t2xQlCrVyAnA2OgIfYqhCUv9g3vLiiSfJqjqz0AYWnAJuJLChxVbqkXPveWExr87aCoSVcMJcLf1d9z706EvSJtISuTevAgR39hWSCT2U02HZoJwaoaee3FPBgkCrLDDAHmNouB9Smgm36yQoTo8uGkz1+Ye3IudLP8DAAD//9Lz7MgAAAAGSURBVAMA6ugDYbnJSScAAAAASUVORK5CYII="
)


def favicon_links():
    """Odkazy na ikonu záložky (data: URI, takže fungují i u stránky uložené bez připojení)."""
    svg = "data:image/svg+xml," + urllib.parse.quote(FAVICON_SVG, safe=" =:/,.'-")
    return ('<link rel="icon" type="image/png" sizes="32x32" href="data:image/png;base64,%s">\n'
            '<link rel="icon" type="image/svg+xml" href="%s">\n' % (FAVICON_PNG_32, svg))
