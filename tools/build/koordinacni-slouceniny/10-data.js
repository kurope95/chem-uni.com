/* ============================================================
   1 · DATA — ligandy, centrální atomy, komplexy, konstanty
   Všechny hodnoty ověřeny skriptem numcheck.py proti běžným
   tabulkám (Housecroft–Sharpe, Huheey, Shriver–Atkins, CRC).
   ============================================================ */

/* --- fyzikální konstanty použité v přepočtech --------------- */
var HC_KJ = 1.19627e5;    /* h·c·N_A  [kJ·nm·mol⁻¹] */
var HC_EV = 1239.84;      /* h·c      [eV·nm]       */
var RT23  = 5.708;        /* 2,303·R·T při 298,15 K [kJ·mol⁻¹] */

function nmFromWn(wn){ return 1e7/wn; }          /* cm⁻¹ → nm */
function wnFromNm(nm){ return 1e7/nm; }          /* nm → cm⁻¹ */
function kJFromNm(nm){ return HC_KJ/nm; }        /* nm → kJ·mol⁻¹ */
function eVFromNm(nm){ return HC_EV/nm; }        /* nm → eV */

/* ============================================================
   LIGANDY
   nm   = současný název ligandu v komplexu (IUPAC 2005, česky)
   old  = starší název, na který student narazí ve sbírkách
   q    = náboj ligandu
   don  = donorový atom
   dent = denticita (počet donorových atomů vázaných k jednomu centru)
   f    = Jørgensenův faktor síly ligandového pole (H₂O = 1,00)
   bis  = ligand vyžaduje násobící předpony bis-, tris-, tetrakis-
   ============================================================ */
var LIG = [
 {id:"I",   vz:"I⁻",        nm:"jodido",        old:"jodo",      q:-1, don:"I", dent:1, f:0.70, bis:false, pozn:"velmi slabé pole, velký měkký anion"},
 {id:"Br",  vz:"Br⁻",       nm:"bromido",       old:"bromo",     q:-1, don:"Br",dent:1, f:0.72, bis:false, pozn:"slabé pole"},
 {id:"SCNs",vz:"SCN⁻",      nm:"thiokyanato-κS",old:"thiokyanato",q:-1,don:"S", dent:1, f:0.73, bis:false, pozn:"vázaný sírou — vazebná izomerie"},
 {id:"Cl",  vz:"Cl⁻",       nm:"chlorido",      old:"chloro",    q:-1, don:"Cl",dent:1, f:0.78, bis:false, pozn:"slabé pole, nejběžnější halogenido­ligand"},
 {id:"F",   vz:"F⁻",        nm:"fluorido",      old:"fluoro",    q:-1, don:"F", dent:1, f:0.90, bis:false, pozn:"malý tvrdý anion, přesto slabé pole"},
 {id:"OH",  vz:"OH⁻",       nm:"hydroxido",     old:"hydroxo",   q:-1, don:"O", dent:1, f:0.94, bis:false, pozn:"často můstkový (μ-OH)"},
 {id:"ox",  vz:"C₂O₄²⁻",    nm:"oxaláto",       old:"oxalato",   q:-2, don:"O", dent:2, f:0.98, bis:true,  pozn:"chelátový, tvoří pětičlenný kruh"},
 {id:"H2O", vz:"H₂O",       nm:"aqua",          old:"aquo",      q: 0, don:"O", dent:1, f:1.00, bis:false, pozn:"referenční ligand řady, f = 1,00"},
 {id:"NCS", vz:"NCS⁻",      nm:"thiokyanato-κN",old:"isothiokyanato",q:-1,don:"N",dent:1,f:1.02,bis:false, pozn:"vázaný dusíkem — silnější pole než přes S"},
 {id:"py",  vz:"C₅H₅N",     nm:"pyridin",       old:"pyridin",   q: 0, don:"N", dent:1, f:1.23, bis:true,  pozn:"aromatický N-donor, i π-akceptor"},
 {id:"NH3", vz:"NH₃",       nm:"ammin",         old:"ammin",     q: 0, don:"N", dent:1, f:1.25, bis:false, pozn:"píše se se dvěma m — ammin, ne amin"},
 {id:"en",  vz:"C₂H₈N₂",    nm:"ethylendiamin", old:"1,2-ethandiamin",q:0,don:"N",dent:2,f:1.28,bis:true, pozn:"chelátový, zkratka en"},
 {id:"NO2", vz:"NO₂⁻",      nm:"nitrito-κN",    old:"nitro",     q:-1, don:"N", dent:1, f:1.40, bis:false, pozn:"vázaný dusíkem; přes kyslík je to nitrito-κO"},
 {id:"CN",  vz:"CN⁻",       nm:"kyanido",       old:"kyano",     q:-1, don:"C", dent:1, f:1.70, bis:false, pozn:"silný σ-donor i π-akceptor, konec řady"},
 {id:"CO",  vz:"CO",        nm:"karbonyl",      old:"karbonyl",  q: 0, don:"C", dent:1, f:1.90, bis:false, pozn:"nejsilnější pole, čistý π-akceptor"}
];
/* další ligandy jen do tabulky (nejsou ve spektrochemickém posuvníku) */
var LIG2 = [
 {id:"O",   vz:"O²⁻",       nm:"oxido",         old:"oxo",       q:-2, don:"O", dent:1, f:null, bis:false, pozn:"v oxoaniontech typu MnO₄⁻"},
 {id:"S2O3",vz:"S₂O₃²⁻",    nm:"thiosulfato",   old:"thiosulfato",q:-2,don:"S", dent:1, f:null, bis:true,  pozn:"fotografický ustalovač"},
 {id:"SO4", vz:"SO₄²⁻",     nm:"sulfato",       old:"sulfato",   q:-2, don:"O", dent:1, f:null, bis:false, pozn:"v koordinační sféře i jako kompenzující iont"},
 {id:"CO3", vz:"CO₃²⁻",     nm:"karbonato",     old:"karbonato", q:-2, don:"O", dent:2, f:null, bis:false, pozn:"může být jedno- i dvoudonorový"},
 {id:"H",   vz:"H⁻",        nm:"hydrido",       old:"hydrido",   q:-1, don:"H", dent:1, f:null, bis:false, pozn:"v hydridokomplexech, klíč ke katalýze"},
 {id:"NO",  vz:"NO",        nm:"nitrosyl",      old:"nitrosyl",  q: 0, don:"N", dent:1, f:null, bis:false, pozn:"π-akceptor, nitroprussid"},
 {id:"edta",vz:"C₁₀H₁₂N₂O₈⁴⁻",nm:"edetato",     old:"EDTA",      q:-4, don:"N, O",dent:6,f:null, bis:false, pozn:"šestidonorový chelátor, dva N a čtyři O"},
 {id:"dmg", vz:"C₄H₇N₂O₂⁻", nm:"dimethylglyoximato",old:"dimethylglyoximato",q:-1,don:"N",dent:2,f:null,bis:true,pozn:"červená sraženina s Ni²⁺"},
 {id:"phen",vz:"C₁₂H₈N₂",   nm:"1,10-fenanthrolin",old:"o-fenanthrolin",q:0,don:"N",dent:2,f:null,bis:true, pozn:"chelát, sytě oranžový s Fe²⁺"},
 {id:"cp",  vz:"C₅H₅⁻",     nm:"η⁵-cyklopentadienyl",old:"h⁵-cyklopentadienyl",q:-1,don:"—",dent:5,f:null,bis:false,pozn:"nespecifikovaný donorový atom, ferrocen"}
];
function ligAll(){ return LIG.concat(LIG2); }
function ligById(id){ var a=ligAll(); for(var i=0;i<a.length;i++) if(a[i].id===id) return a[i]; return null; }

/* ============================================================
   CENTRÁLNÍ ATOMY
   kat = české přídavné jméno pro komplexní kation / nenabitý komplex
   an  = český podstatný název pro komplexní anion
   g   = Jørgensenův faktor kovu [cm⁻¹] (Δ ≈ f · g)
   d   = počet elektronů d v dané oxidační vrstvě
   ============================================================ */
var CEN = [
 {s:"Ti", cz:"titan",   ox:3, kat:"titanitý",   an:"titaničitan",  g:20300, d:1},
 {s:"V",  cz:"vanad",   ox:3, kat:"vanadytý",   an:"vanaditan",    g:17700, d:2},
 {s:"Cr", cz:"chrom",   ox:3, kat:"chromitý",   an:"chromitan",    g:17400, d:3},
 {s:"Mn", cz:"mangan",  ox:2, kat:"manganatý",  an:"manganatan",   g: 8000, d:5},
 {s:"Fe", cz:"železo",  ox:2, kat:"železnatý",  an:"železnatan",   g:10400, d:6},
 {s:"Fe", cz:"železo",  ox:3, kat:"železitý",   an:"železitan",    g:14000, d:5},
 {s:"Co", cz:"kobalt",  ox:2, kat:"kobaltnatý", an:"kobaltnatan",  g: 9000, d:7},
 {s:"Co", cz:"kobalt",  ox:3, kat:"kobaltitý",  an:"kobaltitan",   g:18200, d:6},
 {s:"Ni", cz:"nikl",    ox:2, kat:"nikelnatý",  an:"nikelnatan",   g: 8700, d:8},
 {s:"Cu", cz:"měď",     ox:2, kat:"měďnatý",    an:"měďnatan",     g:12600, d:9},
 {s:"Zn", cz:"zinek",   ox:2, kat:"zinečnatý",  an:"zinečnatan",   g:null,  d:10},
 {s:"Ag", cz:"stříbro", ox:1, kat:"stříbrný",   an:"stříbrnan",    g:null,  d:10},
 {s:"Pt", cz:"platina", ox:2, kat:"platnatý",   an:"platnatan",    g:null,  d:8},
 {s:"Pt", cz:"platina", ox:4, kat:"platičitý",  an:"platičitan",   g:36000, d:6},
 {s:"Al", cz:"hliník",  ox:3, kat:"hlinitý",    an:"hlinitan",     g:null,  d:0},
 {s:"Rh", cz:"rhodium", ox:3, kat:"rhoditý",    an:"rhoditan",     g:27000, d:6},
 {s:"Ir", cz:"iridium", ox:3, kat:"iriditý",    an:"iriditan",     g:32000, d:6}
];
function cenGet(sym,ox){ for(var i=0;i<CEN.length;i++) if(CEN[i].s===sym&&CEN[i].ox===ox) return CEN[i]; return null; }

/* české násobící předpony */
var PREF  = ["","","di","tri","tetra","penta","hexa"];
var PREFB = ["","bis","bis","tris","tetrakis","pentakis","hexakis"];
function prefix(n,useBis){
  if(n===1) return useBis ? "" : "";
  return useBis ? PREFB[n] : PREF[n];
}

/* ============================================================
   KOORDINAČNÍ POLYEDRY
   ============================================================ */
var POLY = [
 {kc:1, id:"lin1", nm:"jednovazný",         uhel:"—",             hyb:"—",     prik:"[Cu(NH₃)]⁺ v plynné fázi", pozn:"velmi vzácné"},
 {kc:2, id:"lin",  nm:"lineární",           uhel:"180°",          hyb:"sp",    prik:"[Ag(NH₃)₂]⁺, [Au(CN)₂]⁻", pozn:"typické pro d¹⁰ ionty Ag⁺, Au⁺, Hg²⁺"},
 {kc:3, id:"tri",  nm:"trigonální (rovinný)",uhel:"120°",         hyb:"sp²",   prik:"[HgI₃]⁻",                 pozn:"vzácné"},
 {kc:4, id:"tet",  nm:"tetraedr",           uhel:"109,5°",        hyb:"sp³",   prik:"[CoCl₄]²⁻, [Zn(NH₃)₄]²⁺, [NiCl₄]²⁻", pozn:"malý centrální atom nebo objemné ligandy; nemá geometrické izomery"},
 {kc:4, id:"sq",   nm:"čtverec (tetragon)", uhel:"90° a 180°",    hyb:"dsp²",  prik:"[Ni(CN)₄]²⁻, [PtCl₄]²⁻, cis-[Pt(NH₃)₂Cl₂]", pozn:"typické pro d⁸ ionty; má cis a trans izomery"},
 {kc:5, id:"bip",  nm:"trigonální bipyramida",uhel:"120° a 90°",  hyb:"dsp³",  prik:"[Fe(CO)₅], [CuCl₅]³⁻",    pozn:"snadno přechází na tetragonální pyramidu"},
 {kc:6, id:"okt",  nm:"oktaedr",            uhel:"90° a 180°",    hyb:"d²sp³", prik:"[Fe(CN)₆]⁴⁻, [Co(NH₃)₆]³⁺, [Cr(H₂O)₆]³⁺", pozn:"zdaleka nejběžnější; má cis/trans i fac/mer izomery"}
];

/* ============================================================
   REÁLNÉ KOMPLEXY — změřené Δ(oktaedr) a barva
   Δ v cm⁻¹; λ = 10⁷/Δ  (přepočet ověřen v numcheck.py)
   barva = barva, kterou roztok jeví (doplňková k absorbované)
   ============================================================ */
var KMPX = [
 {vz:"[CrCl₆]³⁻",    d:13000, kov:"Cr³⁺", dn:3, lig:"Cl⁻",   barva:"zelená",          hs:"—"},
 {vz:"[CrF₆]³⁻",     d:15060, kov:"Cr³⁺", dn:3, lig:"F⁻",    barva:"zelená",          hs:"—"},
 {vz:"[Cr(H₂O)₆]³⁺", d:17400, kov:"Cr³⁺", dn:3, lig:"H₂O",   barva:"šedofialová",     hs:"—"},
 {vz:"[Cr(NH₃)₆]³⁺", d:21600, kov:"Cr³⁺", dn:3, lig:"NH₃",   barva:"žlutá",           hs:"—"},
 {vz:"[Cr(CN)₆]³⁻",  d:26600, kov:"Cr³⁺", dn:3, lig:"CN⁻",   barva:"světle žlutá",    hs:"—"},
 {vz:"[CoF₆]³⁻",     d:13100, kov:"Co³⁺", dn:6, lig:"F⁻",    barva:"modrá",           hs:"vysokospinový"},
 {vz:"[Co(H₂O)₆]³⁺", d:18200, kov:"Co³⁺", dn:6, lig:"H₂O",   barva:"modrozelená",     hs:"nízkospinový"},
 {vz:"[Co(NH₃)₆]³⁺", d:22900, kov:"Co³⁺", dn:6, lig:"NH₃",   barva:"oranžovožlutá",   hs:"nízkospinový"},
 {vz:"[Co(CN)₆]³⁻",  d:33500, kov:"Co³⁺", dn:6, lig:"CN⁻",   barva:"světle žlutá",    hs:"nízkospinový"},
 {vz:"[Rh(NH₃)₆]³⁺", d:34000, kov:"Rh³⁺", dn:6, lig:"NH₃",   barva:"bezbarvá",        hs:"nízkospinový"},
 {vz:"[Ir(NH₃)₆]³⁺", d:41000, kov:"Ir³⁺", dn:6, lig:"NH₃",   barva:"bezbarvá",        hs:"nízkospinový"},
 {vz:"[Fe(H₂O)₆]²⁺", d:10400, kov:"Fe²⁺", dn:6, lig:"H₂O",   barva:"bledě zelená",    hs:"vysokospinový"},
 {vz:"[Fe(H₂O)₆]³⁺", d:13700, kov:"Fe³⁺", dn:5, lig:"H₂O",   barva:"bledě fialová",   hs:"vysokospinový"},
 {vz:"[Fe(CN)₆]⁴⁻",  d:32200, kov:"Fe²⁺", dn:6, lig:"CN⁻",   barva:"světle žlutá",    hs:"nízkospinový"},
 {vz:"[Fe(CN)₆]³⁻",  d:35000, kov:"Fe³⁺", dn:5, lig:"CN⁻",   barva:"žlutá (roztok)",  hs:"nízkospinový"},
 {vz:"[Ni(H₂O)₆]²⁺", d: 8500, kov:"Ni²⁺", dn:8, lig:"H₂O",   barva:"zelená",          hs:"—"},
 {vz:"[Ni(NH₃)₆]²⁺", d:10800, kov:"Ni²⁺", dn:8, lig:"NH₃",   barva:"modrofialová",    hs:"—"},
 {vz:"[Ni(en)₃]²⁺",  d:11500, kov:"Ni²⁺", dn:8, lig:"en",    barva:"fialová",         hs:"—"},
 {vz:"[Ti(H₂O)₆]³⁺", d:20300, kov:"Ti³⁺", dn:1, lig:"H₂O",   barva:"fialová",         hs:"—"},
 {vz:"[V(H₂O)₆]³⁺",  d:17700, kov:"V³⁺",  dn:2, lig:"H₂O",   barva:"zelená",          hs:"—"},
 {vz:"[Mn(H₂O)₆]²⁺", d: 7800, kov:"Mn²⁺", dn:5, lig:"H₂O",   barva:"velmi bledě růžová",hs:"vysokospinový"},
 {vz:"[Co(H₂O)₆]²⁺", d: 9300, kov:"Co²⁺", dn:7, lig:"H₂O",   barva:"růžová",          hs:"vysokospinový"},
 {vz:"[Cu(H₂O)₆]²⁺", d:12600, kov:"Cu²⁺", dn:9, lig:"H₂O",   barva:"bledě modrá",     hs:"—"}
];

/* ============================================================
   KONSTANTY STABILITY (log β, vodné roztoky, 298 K, I → 0)
   ΔG° = −2,303·R·T·log β = −5,708·log β  [kJ·mol⁻¹]
   ============================================================ */
var BETA = [
 {vz:"[Fe(SCN)]²⁺",     lb: 3.0, n:1, lig:"SCN⁻",     typ:"jednodonorový", pozn:"krvavě červený — důkaz Fe³⁺"},
 {vz:"[FeF]²⁺",         lb: 5.2, n:1, lig:"F⁻",       typ:"jednodonorový", pozn:"bezbarvý, proto fluorid ruší reakci s SCN⁻"},
 {vz:"[Cd(NH₃)₄]²⁺",    lb: 7.0, n:4, lig:"NH₃",      typ:"jednodonorový", pozn:"bezbarvý"},
 {vz:"[Ag(NH₃)₂]⁺",     lb: 7.05,n:2, lig:"NH₃",      typ:"jednodonorový", pozn:"rozpouští AgCl, ne však AgBr"},
 {vz:"[Ni(NH₃)₆]²⁺",    lb: 8.6, n:6, lig:"NH₃",      typ:"jednodonorový", pozn:"srovnávací dvojice k [Ni(en)₃]²⁺"},
 {vz:"[Zn(NH₃)₄]²⁺",    lb: 9.1, n:4, lig:"NH₃",      typ:"jednodonorový", pozn:"tetraedrický, d¹⁰"},
 {vz:"[Cu(NH₃)₄]²⁺",    lb:12.6, n:4, lig:"NH₃",      typ:"jednodonorový", pozn:"sytě modrý, důkaz Cu²⁺"},
 {vz:"[Ag(S₂O₃)₂]³⁻",   lb:13.5, n:2, lig:"S₂O₃²⁻",   typ:"jednodonorový", pozn:"fotografický ustalovač"},
 {vz:"[Ni(en)₃]²⁺",     lb:18.3, n:3, lig:"en",       typ:"chelátový",     pozn:"o devět a půl řádu stálejší než amminkomplex"},
 {vz:"[Cu(en)₂]²⁺",     lb:19.6, n:2, lig:"en",       typ:"chelátový",     pozn:"o sedm řádů stálejší než [Cu(NH₃)₄]²⁺"},
 {vz:"[Ag(CN)₂]⁻",      lb:20.5, n:2, lig:"CN⁻",      typ:"jednodonorový", pozn:"základ galvanického stříbření"},
 {vz:"[HgI₄]²⁻",        lb:29.8, n:4, lig:"I⁻",       typ:"jednodonorový", pozn:"Nesslerovo činidlo"},
 {vz:"[Fe(CN)₆]⁴⁻",     lb:35.0, n:6, lig:"CN⁻",      typ:"jednodonorový", pozn:"tak stálý, že není jedovatý"},
 {vz:"[Co(NH₃)₆]³⁺",    lb:35.2, n:6, lig:"NH₃",      typ:"jednodonorový", pozn:"kobalt III váže amoniak mimořádně pevně"}
];

/* EDTA — log K komplexu [MY]ⁿ⁻ (Y⁴⁻ = plně deprotonovaná EDTA) */
var EDTA = [
 {ion:"Mg²⁺", lk: 8.7, pozn:"tvrdost vody"},
 {ion:"Ca²⁺", lk:10.7, pozn:"tvrdost vody, chelaton v mýdlech"},
 {ion:"Mn²⁺", lk:13.9, pozn:""},
 {ion:"Fe²⁺", lk:14.3, pozn:""},
 {ion:"Zn²⁺", lk:16.5, pozn:""},
 {ion:"Ni²⁺", lk:18.6, pozn:""},
 {ion:"Pb²⁺", lk:18.0, pozn:"antidotum při otravě olovem"},
 {ion:"Cu²⁺", lk:18.8, pozn:""},
 {ion:"Hg²⁺", lk:21.8, pozn:"antidotum při otravě rtutí"},
 {ion:"Fe³⁺", lk:25.1, pozn:"nejstálejší z běžných chelátů EDTA"}
];

/* ============================================================
   PRAKTICKÉ KOMPLEXY — tabulka v kapitole 8
   ============================================================ */
var PRAX = [
 {vz:"[Fe(porfyrin)(His)(O₂)]", nm:"hemoglobin a myoglobin", kov:"Fe²⁺", kc:6, obor:"biochemie",
  role:"přenos kyslíku krví; čtyři dusíky porfyrinu, pátý dusík z histidinu, šesté místo pro O₂"},
 {vz:"[Mg(chlorin)]", nm:"chlorofyl", kov:"Mg²⁺", kc:4, obor:"biochemie",
  role:"zachycení fotonu při fotosyntéze; hořčík v chlorinovém kruhu"},
 {vz:"[Co(korrin)(CN)]", nm:"vitamin B₁₂ (kyanokobalamin)", kov:"Co³⁺", kc:6, obor:"biochemie",
  role:"jediný známý biologicky nutný komplex kobaltu; přenos methylové skupiny"},
 {vz:"cis-[Pt(NH₃)₂Cl₂]", nm:"cisplatina", kov:"Pt²⁺", kc:4, obor:"medicína",
  role:"cytostatikum; váže se na dva sousední guaniny DNA a zabrání replikaci. Trans-izomer je neúčinný"},
 {vz:"[Ca(edta)]²⁻", nm:"chelaton (Komplexon III)", kov:"Ca²⁺", kc:6, obor:"analytika",
  role:"chelatometrické stanovení tvrdosti vody, změkčovadlo, antidotum při otravě těžkými kovy"},
 {vz:"[Ag(CN)₂]⁻", nm:"dikyanidostříbrnan", kov:"Ag⁺", kc:2, obor:"galvanika",
  role:"stříbřicí lázeň; malá koncentrace volných Ag⁺ dá jemný a přilnavý povlak"},
 {vz:"[Au(CN)₂]⁻", nm:"dikyanidozlatnan", kov:"Au⁺", kc:2, obor:"metalurgie",
  role:"kyanidové loužení zlata z chudých rud a zlacení kontaktů"},
 {vz:"[Ag(S₂O₃)₂]³⁻", nm:"bis(thiosulfato)stříbrnan", kov:"Ag⁺", kc:2, obor:"fotografie",
  role:"ustalovač — rozpustí neexponovaný AgBr z filmu"},
 {vz:"Fe₄[Fe(CN)₆]₃", nm:"berlínská modř", kov:"Fe²⁺ a Fe³⁺", kc:6, obor:"pigment",
  role:"nejstarší syntetický modrý pigment; dnes i antidotum při otravě thalliem"},
 {vz:"[Ni(dmgH)₂]", nm:"dimethylglyoximát nikelnatý", kov:"Ni²⁺", kc:4, obor:"analytika",
  role:"jasně červená sraženina — klasický důkaz a stanovení niklu"},
 {vz:"[Cu(C₄H₄O₆)₂]²⁻", nm:"Fehlingovo činidlo", kov:"Cu²⁺", kc:4, obor:"analytika",
  role:"vinan drží měď v alkalickém roztoku; důkaz aldehydů"},
 {vz:"[Ag(NH₃)₂]⁺", nm:"Tollensovo činidlo", kov:"Ag⁺", kc:2, obor:"analytika",
  role:"stříbrné zrcátko — důkaz aldehydové skupiny"},
 {vz:"[Fe(C₅H₅)₂]", nm:"ferrocen", kov:"Fe²⁺", kc:"—", obor:"organokovová chemie",
  role:"sendvičová molekula, začátek moderní organokovové chemie; přísada do paliv"},
 {vz:"[Rh(CO)H(PPh₃)₃]", nm:"Wilkinsonův typ katalyzátoru", kov:"Rh¹", kc:5, obor:"průmysl",
  role:"hydrogenace a hydroformylace alkenů — výroba aldehydů a alkoholů"},
 {vz:"[PdCl₄]²⁻", nm:"Wackerův proces", kov:"Pd²⁺", kc:4, obor:"průmysl",
  role:"katalytická oxidace ethenu na acetaldehyd; palladium regeneruje měďnatá sůl"},
 {vz:"[Na(kryptand)]⁺", nm:"kryptandy a korunové ethery", kov:"Na⁺, K⁺", kc:"6–8", obor:"laboratoř",
  role:"rozpustí sodné a draselné soli v organických rozpouštědlech"},
 {vz:"[Al F₆]³⁻", nm:"kryolit Na₃[AlF₆]", kov:"Al³⁺", kc:6, obor:"metalurgie",
  role:"snižuje teplotu tání Al₂O₃ z 2 050 °C na zhruba 950 °C při výrobě hliníku"},
 {vz:"[Zn(OH)₄]²⁻", nm:"tetrahydroxidozinečnatan", kov:"Zn²⁺", kc:4, obor:"anorganika",
  role:"proto se zinek rozpouští i v hydroxidu sodném — amfoterní chování"}
];

/* ============================================================
   SPEKTROCHEMICKÁ ŘADA — pořadí a stručný důvod
   ============================================================ */
var SERIE = [
 {l:"I⁻",   t:"σ i π donor", d:"π-donace zvedá t₂g nahoru → Δ malé"},
 {l:"Br⁻",  t:"σ i π donor", d:"totéž, o něco slabší efekt"},
 {l:"Cl⁻",  t:"σ i π donor", d:"nejběžnější slabý ligand"},
 {l:"F⁻",   t:"σ i π donor", d:"malý, ale stále π-donor"},
 {l:"OH⁻",  t:"σ i π donor", d:"často můstkový"},
 {l:"H₂O",  t:"σ donor",     d:"referenční bod řady"},
 {l:"NCS⁻", t:"σ donor",     d:"vázaný dusíkem"},
 {l:"NH₃",  t:"σ donor",     d:"žádná π-donace → Δ větší"},
 {l:"en",   t:"σ donor",     d:"dva dusíky, o něco silnější než NH₃"},
 {l:"NO₂⁻", t:"σ donor, π akceptor", d:"začíná zpětná donace"},
 {l:"CN⁻",  t:"σ donor, π akceptor", d:"silná zpětná donace snižuje t₂g → Δ velké"},
 {l:"CO",   t:"π akceptor",  d:"nejsilnější pole ze všech běžných ligandů"}
];

/* ============================================================
   TABULKA dⁿ V SILNÉM A SLABÉM OKTAEDRICKÉM POLI
   generuje se výpočtem, aby v ní nemohla být překlepová chyba
   (shoda s tabulkou ověřena skriptem numcheck.py)
   ============================================================ */
function fillD(d, silne){
  var t,e;
  if(silne){ t=Math.min(d,6); e=d-t; }
  else { var f1=Math.min(d,5), f2=Math.max(0,d-5);
         t=Math.min(3,f1)+Math.min(3,f2); e=Math.max(0,f1-3)+Math.max(0,f2-3); }
  var unp = silne ? ((t<=3?t:6-t) + (e<=2?e:4-e)) : (d<=5?d:10-d);
  return {t:t, e:e, unp:unp, cfse:(-0.4*t+0.6*e)};
}
function muSpin(n){ return Math.sqrt(n*(n+2)); }

/* barevný kruh: hranice absorbovaných pásem a pozorovaná barva */
var BARVY = [
 {od:380, do:430, abs:"fialová",      vid:"žlutozelená"},
 {od:430, do:470, abs:"modrá",        vid:"žlutá"},
 {od:470, do:490, abs:"zelenomodrá",  vid:"oranžová"},
 {od:490, do:510, abs:"modrozelená",  vid:"červená"},
 {od:510, do:545, abs:"zelená",       vid:"purpurová"},
 {od:545, do:570, abs:"žlutozelená",  vid:"fialová"},
 {od:570, do:595, abs:"žlutá",        vid:"modrá"},
 {od:595, do:625, abs:"oranžová",     vid:"zelenomodrá"},
 {od:625, do:780, abs:"červená",      vid:"modrozelená"}
];
/* Komplexy vhodné pro model „barva z Δ“: u konfigurací s víc elektrony d má
   spektrum několik pásů, takže jednoduchý vztah λ = 10⁷/Δ popisuje jen ty,
   u nichž hlavní viditelný pás skutečně odpovídá Δ. */
var CLPRIK = ["[Ti(H₂O)₆]³⁺","[V(H₂O)₆]³⁺","[Cr(H₂O)₆]³⁺","[Cr(NH₃)₆]³⁺",
              "[Cr(CN)₆]³⁻","[CoF₆]³⁻","[Co(NH₃)₆]³⁺","[Cu(H₂O)₆]²⁺"];
function barvaZLambda(l){
  if(l<380) return {abs:"ultrafialové záření", vid:"skoro bezbarvá"};
  if(l>780) return {abs:"infračervené záření", vid:"jen velmi bledá"};
  for(var i=0;i<BARVY.length;i++) if(l>=BARVY[i].od && l<BARVY[i].do) return BARVY[i];
  return BARVY[BARVY.length-1];
}
/* Přibližný odstín světla dané vlnové délky (po částech lineární interpolace
   mezi opěrnými body). Používá se hsl(), protože jde o skutečnou barvu světla,
   ne o prvek motivu stránky — barva pohlceného světla se s motivem nemění. */
var HUEOPORY = [[380,275],[440,240],[490,180],[510,120],[580,60],[645,0],[780,0]];
function hueZLambda(l){
  if(l<=380) return 275;
  if(l>=645) return 0;
  for(var i=0;i<HUEOPORY.length-1;i++){
    var a=HUEOPORY[i], b=HUEOPORY[i+1];
    if(l>=a[0] && l<=b[0]) return a[1] + (b[1]-a[1])*(l-a[0])/(b[0]-a[0]);
  }
  return 0;
}
function svetlo(l,sat,lig){ return svetloHue(hueZLambda(l),sat,lig); }
function svetloHue(h,sat,lig){
  var x=((h%360)+360)%360;
  return "hsl("+x.toFixed(0)+","+(sat||85)+"%,"+(lig||52)+"%)";
}
