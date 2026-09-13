/* ============================================================
   29 · BANKA OTÁZEK — kapitoly 4–7
   ============================================================ */
BANK.q4=[
 {t:"single",q:"Jaká je správná zkrácená konfigurace atomu chromu (Z = 24)?",
  o:["[Ar] 3d⁶","[Ar] 3d⁵ 4s¹","[Ar] 4s² 4p⁴","[Ar] 3d⁴ 4s²"],c:1,
  e:"Chrom je výjimka z výstavbového principu: zpola zaplněná podslupka 3d⁵ (pět nepárových elektronů se stejným spinem) je stabilnější než 3d⁴ 4s², proto jeden elektron ze 4s přejde do 3d. Očekávané [Ar] 3d⁴ 4s² je nejčastější chybná odpověď."},
 {t:"single",q:"Proč se orbital 4s obsazuje dříve než 3d?",
  o:["Protože 3d neexistuje ve 3. periodě","Protože 4s pojme méně elektronů","Protože má vyšší hlavní kvantové číslo","Protože má nižší součet n + l (4 + 0 = 4 proti 3 + 2 = 5), a tedy u prázdného 3d nižší energii"],c:3,
  e:"Madelungovo pravidlo: nižší n + l = nižší energie. Orbital 4s navíc „proniká“ k jádru, takže u draslíku a vápníku leží níž než prázdné 3d. Jakmile se 3d obsadí, klesne pod 4s — proto se při ionizaci odtrhávají elektrony 4s první."},
 {t:"single",q:"Jaká je konfigurace iontu Fe³⁺?",
  o:["[Ar] 3d⁶ 4s²","[Ar] 3d³ 4s²","[Ar] 3d⁵","[Ar] 3d⁴ 4s¹"],c:2,
  e:"Fe je [Ar] 3d⁶ 4s². Odtrháváme z orbitalu s nejvyšším n: nejdřív oba elektrony 4s, potom jeden z 3d → [Ar] 3d⁵. Zpola zaplněná d je stabilní, proto se Fe²⁺ snadno oxiduje. Odpověď [Ar] 3d³ 4s² vznikne chybou „odtrhnout to, co přišlo poslední“."},
 {t:"multi",q:"Které částice jsou izoelektronové s neonem?",
  o:["Na⁺","Cl⁻","O²⁻","Al³⁺","K⁺"],c:[0,2,3],
  e:"Neon má 10 elektronů. Na⁺ (11 − 1), O²⁻ (8 + 2) a Al³⁺ (13 − 3) mají také 10 — všechny mají konfiguraci 1s² 2s² 2p⁶. Cl⁻ (18) a K⁺ (18) jsou izoelektronové s argonem."},
 {t:"single",q:"Proč je uhlík ve sloučeninách čtyřvazný, když má v základním stavu jen dva nepárové elektrony?",
  o:["Protože excitací 2s → 2p vznikne 2s¹ 2p³ se čtyřmi nepárovými elektrony a energie čtyř vazeb excitaci mnohonásobně vrátí","Protože uhlík má ve skutečnosti konfiguraci 2s¹ 2p³ i v základním stavu","Protože využívá prázdné orbitaly 2d","Protože tvoří dvě vazby donorově z volného páru"],c:0,
  e:"Excitace 2s → 2p stojí asi 400 kJ·mol⁻¹, ale dvě vazby navíc vrátí zhruba 800 kJ·mol⁻¹. Základní stav uhlíku je 2s² 2p² (podle výstavbového principu); orbitaly 2d neexistují, což je právě důvod, proč vaznost prvků 2. periody nepřesáhne 4."},
 {t:"num",q:"Kolik nepárových elektronů má ion Mn²⁺ (Z = 25)?",
  ans:5,tol:0,unit:"elektronů",
  e:"Mn: [Ar] 3d⁵ 4s². Odtržením obou elektronů 4s vznikne Mn²⁺: [Ar] 3d⁵ — pět elektronů v pěti orbitalech d, každý sám: <b>5 nepárových</b>. Proto je Mn²⁺ silně paramagnetický a stabilní (zpola zaplněná podslupka)."}
];

BANK.q5=[
 {t:"single",q:"Co určuje číslo periody prvku?",
  o:["Hlavní kvantové číslo n valenční slupky (nejvyšší obsazené n)","Počet obsazených podslupek","Počet protonů dělený osmi","Počet valenčních elektronů"],c:0,
  e:"Perioda = nejvyšší obsazené n. Draslík [Ar] 4s¹ je ve 4. periodě, i když má obsazené jen čtyři slupky a 3d prázdné. Počet valenčních elektronů určuje skupinu, ne periodu."},
 {t:"single",q:"Prvek má konfiguraci [Kr] 4d¹⁰ 5s² 5p². Kde v tabulce leží?",
  o:["4. perioda, 12. skupina, d-blok","5. perioda, 14. skupina, p-blok (cín)","5. perioda, 4. skupina, d-blok","6. perioda, 14. skupina, p-blok"],c:1,
  e:"Nejvyšší n = 5 → 5. perioda. Poslední plněná podslupka 5p → p-blok. Valenčních elektronů 5s² 5p² = 4 → skupina 10 + 4 = 14. Z = 36 + 10 + 2 + 2 = 50, cín. Podslupka 4d¹⁰ je zaplněná a do valence p-prvku se nepočítá."},
 {t:"single",q:"Proč má 4. perioda 18 prvků, zatímco 3. perioda jen 8?",
  o:["Protože 4. perioda obsahuje lanthanoidy","Protože 3. perioda má jen orbitaly s","Protože v 3. periodě se plní 3d, ale prvky s ním nejsou známé","Protože ve 4. periodě se kromě 4s a 4p plní i 3d (10 elektronů)"],c:3,
  e:"Délka periody = kapacita podslupek, které se v ní plní: 4s (2) + 3d (10) + 4p (6) = 18. Ve 3. periodě se plní jen 3s a 3p (8), protože 3d má vyšší energii než 4s a čeká na 4. periodu. Lanthanoidy patří do 6. periody (32 prvků)."},
 {t:"multi",q:"Které výroky o skupinách periodické tabulky jsou správné?",
  o:["Prvky ve skupině mají stejnou valenční konfiguraci, liší se jen n","Helium je ve skupině 18, ačkoli je to s-prvek","Skupiny 3–12 tvoří p-blok","Halogeny mají konfiguraci ns² np⁵","Vedlejší podskupiny (B) jsou d-prvky"],c:[0,1,3,4],
  e:"Skupiny 3–12 jsou <b>d-blok</b> (přechodné kovy), p-blok jsou skupiny 13–18. Ostatní platí: stejná valenční konfigurace je definice skupiny, helium (1s²) stojí ve skupině 18 kvůli uzavřené slupce, halogeny mají ns² np⁵ a vedlejší podskupiny jsou d-prvky."},
 {t:"single",q:"Lanthanoidy jsou prvky, u nichž se plní podslupka…",
  o:["5f","5d","4f","6s"],c:2,
  e:"Lanthanoidy (Ce–Lu) obsazují 4f, aktinoidy (Th–Lr) obsazují 5f. Obě řady mají po 14 prvcích (kapacita f) a kreslí se pod tabulku, ačkoli patří do 6. a 7. periody. Podslupka 5d se plní u přechodných kovů 6. periody."},
 {t:"single",q:"Který z prvků je polokov?",
  o:["Hliník","Fosfor","Germanium","Cín"],c:2,
  e:"Polokovy leží na diagonále B–Si–Ge–As–Sb–Te. Germanium je pod křemíkem ve 14. skupině a je typický polovodič. Hliník a cín jsou kovy (cín už pod diagonálou), fosfor je nekov."}
];

BANK.q6=[
 {t:"single",q:"Proč atomový poloměr v periodě zleva doprava klesá, když přibývá elektronů?",
  o:["Protože se zmenšuje počet slupek","Protože elektrony přecházejí do nižších slupek","Protože přibývající elektrony jsou lehčí","Protože přibývají i protony a elektrony téže slupky se stíní špatně — roste efektivní náboj jádra a obal se stahuje"],c:3,
  e:"Nový elektron jde do téže slupky a stíní jádro jen málo, zatímco nový proton táhne celý obal silněji: Z<sub>ef</sub> roste, poloměr klesá (Li 128 → F 57 pm). Počet slupek se v periodě nemění; ten roste ve skupině a tam poloměr roste."},
 {t:"single",q:"Seřaďte podle rostoucího poloměru: Na, Na⁺, Cl, Cl⁻.",
  o:["Cl < Na < Na⁺ < Cl⁻","Na⁺ < Cl < Na < Cl⁻","Cl⁻ < Cl < Na⁺ < Na","Na⁺ < Na < Cl < Cl⁻"],c:1,
  e:"Na⁺ (102 pm) ztratil celou 3. slupku, je nejmenší. Cl (102 pm kovalentní) je v periodě vpravo, tedy menší než Na (166 pm). Cl⁻ (181 pm) má elektron navíc a odpuzování v obalu ho zvětší. Pořadí Na⁺ < Cl < Na < Cl⁻."},
 {t:"single",q:"Jaké maximální a minimální oxidační číslo lze čekat u prvku 15. skupiny (např. P)?",
  o:["+V a −III","+III a −V","+XV a −8","+VII a −I"],c:0,
  e:"Skupina 15 → 5 valenčních elektronů (ns² np³). Maximum = 5 (všechny odevzdané/sdílené) → +V (H₃PO₄). Minimum u nekovu = 5 − 8 = −3 → −III (PH₃, fosfidy). Hodnoty +VII/−I patří 17. skupině."},
 {t:"multi",q:"Které výroky o iontech jsou správné?",
  o:["Kation je menší než atom, z něhož vznikl","Anion je větší než atom, z něhož vznikl","V izoelektronové řadě je největší částice s nejvyšším Z","Al³⁺ je menší než Na⁺","Kationty tvoří hlavně nekovy"],c:[0,1,3],
  e:"Kation ztratí elektrony (často celou slupku) a smrští se; anion nabude odpuzování a zvětší se. V izoelektronové řadě je s rostoucím Z částice <b>menší</b> (víc protonů táhne stejný obal): Al³⁺ 54 pm < Na⁺ 102 pm. Kationty tvoří kovy, nekovy tvoří anionty."},
 {t:"single",q:"Proč fluor nikdy netvoří kladné oxidační číslo, zatímco chlor tvoří až +VII?",
  o:["Fluor má jen jeden valenční elektron","Chlor má více protonů","Fluor je nejelektronegativnější prvek, žádný partner mu vazebné elektrony neodtáhne; navíc nemá orbitaly d k excitaci","Fluor má menší atomovou hmotnost"],c:2,
  e:"Kladné oxidační číslo vyžaduje elektronegativnějšího partnera — nad fluorem (3,98) žádný není. Chlor (3,16) se s kyslíkem ochotně dělí a díky prázdným 3d dosahuje vaznosti 3, 5, 7 (HClO₂, HClO₃, HClO₄). Oba halogeny mají sedm valenčních elektronů, ne jeden."},
 {t:"single",q:"Kovový charakter prvků roste…",
  o:["v periodě doleva a ve skupině dolů","v periodě doprava a ve skupině dolů","pouze s rostoucí atomovou hmotností","v periodě doprava a ve skupině nahoru"],c:0,
  e:"Kov = snadno odevzdá elektrony = nízká ionizační energie a velký poloměr. Obojí roste doleva a dolů: cesium je nejkovovější, fluor nejméně. V 14. skupině je to vidět: C nekov → Si, Ge polokovy → Sn, Pb kovy."}
];

BANK.q7=[
 {t:"single",q:"Ionizační energie je definována jako…",
  o:["energie uvolněná při přijetí elektronu atomem v plynném stavu","energie potřebná k odtržení elektronu z izolovaného atomu v plynném stavu; vždy kladná","schopnost atomu přitahovat vazebné elektrony","energie uvolněná při vzniku iontové vazby"],c:1,
  e:"X(g) → X⁺(g) + e⁻, I > 0 — odtržení elektronu od kladného jádra stojí práci. Energie uvolněná při přijetí elektronu je elektronová afinita, schopnost přitahovat vazebné elektrony je elektronegativita."},
 {t:"single",q:"Proč má dusík vyšší první ionizační energii (1402 kJ·mol⁻¹) než kyslík (1314 kJ·mol⁻¹), ačkoli kyslík je v periodě dál vpravo?",
  o:["Kyslík má nižší elektronegativitu","Dusík má více protonů","Kyslík má větší poloměr než dusík","Dusík má zpola zaplněnou podslupku 2p³, u kyslíku se odtrhává spárovaný elektron z 2p⁴, kterému pomáhá odpuzování"],c:3,
  e:"Konfigurace 2p³ (tři nepárové, stejný spin) je stabilní. U kyslíku 2p⁴ jsou v jednom orbitalu dva elektrony, které se odpuzují — jeden z nich se odtrhne snáz. Kyslík má menší poloměr a vyšší elektronegativitu než dusík, takže ostatní možnosti odporují faktům."},
 {t:"num",q:"Ionizační energie sodíku je 5,14 eV. Vyjádřete ji v kJ·mol⁻¹ (1 eV = 96,5 kJ·mol⁻¹).",
  ans:496,tol:3,unit:"kJ·mol⁻¹",
  e:"5,14 · 96,5 = <b>496 kJ·mol⁻¹</b>. Převod: 1 eV na jeden atom × náboj elektronu (1,602·10⁻¹⁹ J) × Avogadrova konstanta (6,022·10²³) = 96,5 kJ na mol. Chyba bývá dělit místo násobit — kJ·mol⁻¹ je vždy větší číslo než eV."},
 {t:"single",q:"Prvek má postupné ionizační energie 738, 1451, 7733, 10 543 kJ·mol⁻¹. Do které skupiny patří?",
  o:["13","3","1","2"],c:3,
  e:"Největší skok (7733/1451 = 5,3×) je mezi I₂ a I₃: třetí elektron se trhá z uzavřené slupky. Prvek má dva valenční elektrony → skupina 2 (hořčík). Skupina 1 by měla skok hned po I₁, skupina 13 po I₃."},
 {t:"multi",q:"Které výroky o elektronové afinitě a elektronegativitě jsou správné?",
  o:["Nejvyšší elektronovou afinitu má chlor, ne fluor","Elektronegativita se udává v kJ·mol⁻¹","Elektronegativita fluoru je 3,98 a je nejvyšší ze všech prvků","Vzácné plyny mají velkou elektronovou afinitu","Rozdíl elektronegativit rozhoduje o polaritě vazby"],c:[0,2,4],
  e:"EA: Cl 349 > F 328 kJ·mol⁻¹ (malý atom fluoru odpuzuje příchozí elektron). Paulingova elektronegativita je <b>bezrozměrná</b>, F 3,98 je maximum a Δχ určuje polaritu. Vzácné plyny stabilní anion netvoří, jejich EA je záporná."},
 {t:"single",q:"Vazba mezi atomy s elektronegativitami 2,20 a 3,44 (H–O) je…",
  o:["kovová","nepolární kovalentní (Δχ < 0,4)","polární kovalentní (Δχ = 1,24), kyslík nese δ−","iontová (Δχ > 1,7)"],c:2,
  e:"Δχ = 3,44 − 2,20 = 1,24, což je v pásmu 0,4–1,7 → polární kovalentní. Elektronegativnější kyslík přitáhne vazebný pár a nese parciální záporný náboj. Iontová by vazba byla nad 1,7 (např. Na–Cl 2,23)."}
];
