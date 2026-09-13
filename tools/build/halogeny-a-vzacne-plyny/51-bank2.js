/* ============================================================
   29 · BANKA OTÁZEK — kapitolové mini-testy k5 až k8
   ============================================================ */
BANK.q5 = [
 {t:"single", q:"Která z kyselin <span class=\"chem\">HF</span>, <span class=\"chem\">HCl</span>, <span class=\"chem\">HBr</span>, <span class=\"chem\">HI</span> je nejsilnější a proč?",
  o:["HF, protože fluor má nejvyšší elektronegativitu","<b>HI, protože vazba H—I je nejslabší (298 kJ·mol⁻¹)</b>","HCl, protože je nejběžnější a nejlevnější","Všechny jsou stejně silné, protože všechny disociují úplně"], c:1,
  e:"Při disociaci se vazba musí přetrhnout celá, takže rozhoduje její <b>pevnost</b>, ne polarita. H—I je nejslabší (298 proti 567 kJ·mol⁻¹ u H—F), a proto je jodovodíková kyselina nejsilnější. Odpověď s elektronegativitou je nejlákavější past — HF je jako jediná slabá kyselina."},
 {t:"single", q:"Proč má fluorovodík teplotu varu +19,5 °C, zatímco chlorovodík −85 °C?",
  o:["Protože molekula HF je těžší než HCl","Protože HF je iontová sloučenina","<b>Protože mezi molekulami HF působí silné vodíkové můstky F—H···F</b>","Protože HF má nižší molární hmotnost, a tedy vyšší kohezi"], c:2,
  e:"Vodík vázaný na malý, silně elektronegativní fluor nese velký kladný parciální náboj a přitáhne volný pár sousední molekuly. V kapalině tak vznikají řetězce a kruhy, jejichž rozbití při varu stojí energii navíc. HF je naopak <b>lehčí</b> než HCl, takže hmotnost trend nevysvětluje."},
 {t:"single", q:"Proč nelze připravit bromovodík z bromidu a koncentrované kyseliny sírové?",
  o:["Protože bromid se v kyselině sírové nerozpustí","<b>Protože kyselina sírová bromid zoxiduje na elementární brom</b>","Protože vzniklý HBr by se okamžitě rozložil na prvky","Protože kyselina sírová je slabší než bromovodíková"], c:1,
  e:"Koncentrovaná H₂SO₄ je oxidační činidlo a proběhne <span class=\"chem\">2 NaBr + 2 H₂SO₄ → Na₂SO₄ + Br₂ + SO₂ + 2 H₂O</span> — místo bezbarvého plynu dostanete hnědé páry. Řešením je neoxidující H₃PO₄ nebo hydrolýza PBr₃. Kyselina sírová je sice slabší než HBr, ale to jí ve vytěsnění nebrání, protože HBr z reakce těká pryč."},
 {t:"single", q:"Kterou reakcí fluorovodík leptá sklo?",
  o:["SiO₂ + 2 HF → SiF₂ + H₂O₂","SiO₂ + 2 H₂O → Si(OH)₄","<b>SiO₂ + 4 HF → SiF₄ + 2 H₂O</b>","Na₂SiO₃ + 2 HF → 2 NaF + SiO₂ + H₂O"], c:2,
  e:"Fluorovodík jako jediná běžná kyselina napadá oxid křemičitý; ve vodném roztoku vzniká navíc kyselina hexafluorokřemičitá (<span class=\"chem\">SiO₂ + 6 HF → H₂SiF₆ + 2 H₂O</span>). Proto se HF skladuje v polyethylenu."},
 {t:"num", q:"Jaké pH má roztok HF o koncentraci 0,10 mol·dm⁻³? p<span class=\"q\">K</span><sub>a</sub>(HF) = 3,17. (Zadejte pH na dvě desetinná místa.)",
  ans:2.08, tol:0.08, unit:"pH",
  e:"K<sub>a</sub> = 10⁻³·¹⁷ = 6,8·10⁻⁴. Pro slabou kyselinu platí [H⁺] = √(K<sub>a</sub>·c) = √(6,8·10⁻⁵) = 8,2·10⁻³ mol·dm⁻³, tedy pH = 2,08. Kyselina chlorovodíková stejné koncentrace by měla pH 1,00 — rozdíl celé jednotky."},
 {t:"multi", q:"Které výroky o halogenovodících platí?",
  o:["Vodný roztok HCl o koncentraci asi 36 % se nazývá kyselina solná","HI se na vzduchu samovolně oxiduje a hnědne","HF se skladuje ve skleněných lahvích","Redukční síla halogenidů roste v řadě F⁻ < Cl⁻ < Br⁻ < I⁻","Všechny halogenovodíky jsou za normálních podmínek plynné"], c:[0,1,3,4],
  e:"HF se ve skle skladovat nesmí — leptá ho; používá se polyethylen nebo teflon. Ostatní výroky platí: HI se oxiduje už vzdušným kyslíkem (<span class=\"chem\">4 HI + O₂ → 2 I₂ + 2 H₂O</span>) a redukční síla halogenidu roste, jak klesá oxidační síla odpovídajícího halogenu."}
];

BANK.q6 = [
 {t:"single", q:"Který z uvedených chloridů má <b>nejvíc kovalentní</b> charakter vazby?",
  o:["NaCl","MgCl₂","AlCl₃","<b>SiCl₄</b>"], c:3,
  e:"Iontovost klesá s rozdílem elektronegativit: NaCl 2,23 > MgCl₂ 1,85 > AlCl₃ 1,55 > SiCl₄ 1,26. Odpovídá tomu i teplota tání — z 801 °C u NaCl na −69 °C u SiCl₄, které je za laboratorní teploty kapalinou."},
 {t:"single", q:"Jak poznáte roztok fluoridu od roztoků ostatních halogenidů pomocí <span class=\"chem\">AgNO₃</span>?",
  o:["Vznikne bílá sraženina rozpustná v amoniaku","Vznikne žlutá sraženina nerozpustná v amoniaku","<b>Nevznikne žádná sraženina, protože AgF je ve vodě rozpustný</b>","Vznikne nažloutlá sraženina, která na světle černá"], c:2,
  e:"Fluorid stříbrný je jako jediný halogenid stříbrný ve vodě dobře rozpustný, takže absence sraženiny je pro fluorid poznávacím znamením. Bílá sraženina rozpustná v amoniaku je AgCl, nažloutlá AgBr a žlutá nerozpustná AgI."},
 {t:"single", q:"Proč <span class=\"chem\">CCl₄</span> nehydrolyzuje, zatímco <span class=\"chem\">SiCl₄</span> hydrolyzuje bouřlivě?",
  o:["Protože vazba C—Cl je iontová a Si—Cl kovalentní","<b>Z kinetických důvodů: malý uhlík je čtyřmi chlory zcela zastíněn a voda nemá kudy zaútočit</b>","Protože hydrolýza CCl₄ je silně endotermní","Protože CCl₄ se ve vodě nerozpouští, a tedy s ní nemůže reagovat"], c:1,
  e:"Termodynamicky by hydrolýza CCl₄ proběhnout měla — je exotermní. Zabraňuje jí vysoká aktivační energie: uhlík je malý a nemůže rozšířit koordinační číslo. Křemík je větší a snese koordinaci 5 nebo 6, takže se voda naváže a reakce běží. Je to učebnicový rozdíl mezi termodynamickou možností a kinetickou dostupností."},
 {t:"single", q:"Proč se jod dobře rozpouští v roztoku jodidu draselného, ale ne v čisté vodě?",
  o:["Protože draselné ionty jod chemicky rozpustí","Protože roztok KI má vyšší teplotu","<b>Protože se tvoří trijodidový anion I₃⁻ podle rovnice I₂ + I⁻ ⇌ I₃⁻</b>","Protože KI sníží povrchové napětí vody"], c:2,
  e:"Volný pár jodidu se naváže na molekulu jodu a vznikne lineární polyhalogenidový anion, který je na rozdíl od nepolárního I₂ ve vodě dobře rozpustný. Přesně na tom stojí Lugolův roztok i jodometrická titrace."},
 {t:"single", q:"Jaký tvar má molekula interhalogenu <span class=\"chem\">ClF₃</span>?",
  o:["<b>tvar písmene T</b>","trigonální planární","trigonální pyramida","tetraedrická"], c:0,
  e:"Chlor má 7 valenčních elektronů, tři použije na vazby a zbudou dva volné páry: celkem 5 párů, tedy trigonální bipyramida. Volné páry obsadí prostornější rovníkové polohy a tři fluory zbudou ve tvaru T. Trigonální planární by byl tvar bez volných párů."},
 {t:"multi", q:"Které výroky o halogenidech platí?",
  o:["Iontovost halogenidu klesá s rostoucím oxidačním číslem kovu","AlCl₃ v páře existuje jako dimer Al₂Cl₆ s můstkovými atomy chloru","Všechny halogenidy se ve vodě hydrolyzují","SnCl₂ má vyšší teplotu tání než SnCl₄","Halogen má v halogenidech vždy oxidační číslo −I"], c:[0,1,3,4],
  e:"Hydrolyzují jen kovalentní halogenidy s dostupným středovým atomem; iontové (NaCl, KI) ve vodě jen disociují a CCl₄ nebo SF₆ nereagují vůbec. Ostatní tvrzení platí — SnCl₂ taje při 247 °C, kdežto SnCl₄ je kapalina vroucí při 114 °C."}
];

BANK.q7 = [
 {t:"single", q:"Seřaďte kyseliny podle rostoucí síly.",
  o:["HClO₄ < HClO₃ < HClO₂ < HClO","HClO₂ < HClO < HClO₃ < HClO₄","<b>HClO < HClO₂ < HClO₃ < HClO₄</b>","HClO₃ < HClO₄ < HClO < HClO₂"], c:2,
  e:"Kyselost roste s počtem nevazebných kyslíků, které odsávají elektronovou hustotu a stabilizují vzniklý anion: p<span class=\"q\">K</span><sub>a</sub> jde 7,54 → 1,94 → ≈−1 → ≈−8. Pozor, aby se to nezaměnilo s <b>oxidační silou</b>, která jde přesně obráceně."},
 {t:"single", q:"Co vznikne zavedením chloru do <b>horkého koncentrovaného</b> roztoku NaOH?",
  o:["NaCl a NaClO","<b>NaCl a NaClO₃</b>","NaCl a NaClO₄","NaClO a NaClO₂"], c:1,
  e:"Za horka je chlornan nestálý a dál disproporcionuje, takže chlor stoupne rovnou na +V: <span class=\"chem\">3 Cl₂ + 6 NaOH → 5 NaCl + NaClO₃ + 3 H₂O</span>. Za studena by se reakce zastavila u chlornanu (savo) v poměru 1 : 1."},
 {t:"single", q:"Které tvrzení o kyselině chloristé je správné?",
  o:["Je nejslabší z oxokyselin chloru a nejsilnější oxidační činidlo","Je to plyn, který se rozpouští ve vodě za vzniku chloru","V zředěném vodném roztoku je mimořádně silné oxidační činidlo","<b>Je nejsilnější z oxokyselin chloru, ale zředěná prakticky neoxiduje</b>"], c:3,
  e:"HClO₄ má p<span class=\"q\">K</span><sub>a</sub> kolem −8, takže patří k nejsilnějším anorganickým kyselinám. Zředěná je ale rozdisociovaná a chloristanový anion je redoxně netečný, takže neoxiduje. Teprve koncentrovaná, málo disociovaná kyselina se s organickou látkou chová explozivně."},
 {t:"single", q:"Podle Paulingova pravidla p<span class=\"q\">K</span><sub>a</sub> ≈ 8 − 5·(počet nevazebných kyslíků) odhadněte p<span class=\"q\">K</span><sub>a</sub> kyseliny <span class=\"chem\">HClO₃</span>.",
  o:["<b>asi −2</b>","asi +3","asi +8","asi −7"], c:0,
  e:"HClO₃ má tři kyslíky a jeden vodík, tedy dva nevazebné kyslíky: 8 − 5·2 = −2. Skutečná hodnota je asi −1, takže odhad sedí na jednotku. Hodnota +3 patří HClO₂, +8 kyselině chlorné a −7 kyselině chloristé."},
 {t:"single", q:"Proč se nikdy nemá míchat savo s kyselým čističem?",
  o:["Protože vznikne výbušná směs vodíku s kyslíkem","Protože se savo neutralizuje a přestane bělit","<b>Protože chlornan v kyselém prostředí uvolní jedovatý chlor</b>","Protože vznikne kyselina chloristá, která exploduje"], c:2,
  e:"Proběhne synproporcionace <span class=\"chem\">NaClO + 2 HCl → NaCl + Cl₂ + H₂O</span> — chlor z +I a z −I se sejde na 0. Patří to k nejčastějším otravám v domácnosti. Kyselina chloristá takto nevzniká, ta vyžaduje úplně jiné podmínky."},
 {t:"multi", q:"Které výroky o kyslíkatých sloučeninách halogenů platí?",
  o:["Fluor netvoří žádnou oxokyselinu","ClO₂ je radikál s jedním nepárovým elektronem","I₂O₅ je jediný exotermický oxid halogenu","HIO₃ lze izolovat jako bílou krystalickou látku","Oxidační síla roste v řadě HClO < HClO₂ < HClO₃ < HClO₄"], c:[0,1,2,3],
  e:"Oxidační síla jde <b>opačně</b>: nejsilnějším oxidovadlem je kyselina chlorná (1,63 V) a nejslabším chloristá (1,20 V). Zbývající čtyři tvrzení jsou správná — kyselina jodičná je vedle chloristé jediná oxokyselina halogenu izolovatelná v tuhém stavu."}
];

BANK.q8 = [
 {t:"single", q:"Proč se fluor vyrábí elektrolýzou <b>taveniny</b>, a ne vodného roztoku?",
  o:["Protože fluoridy nejsou ve vodě rozpustné","Protože ve vodě by elektrolýza spotřebovala příliš mnoho energie","<b>Protože vzniklý fluor by okamžitě zoxidoval vodu a na anodě by vznikl kyslík</b>","Protože voda by fluoridovou taveninu ochladila pod bod tuhnutí"], c:2,
  e:"E°(F₂/F⁻) = 2,87 V je vysoko nad E°(O₂/H₂O) = 1,23 V, takže ΔE° = +1,64 V a proběhne <span class=\"chem\">2 F₂ + 2 H₂O → 4 HF + O₂</span>. Elektrolyzuje se proto bezvodá tavenina KF·2HF. Rozpustnost fluoridů s tím nesouvisí — NaF i KF se ve vodě rozpouštějí dobře."},
 {t:"single", q:"Co vzniká při elektrolýze vodného roztoku NaCl na katodě?",
  o:["<b>vodík a hydroxidové ionty</b>","kovový sodík","chlor","kyslík"], c:0,
  e:"Voda se redukuje mnohem snáz než sodný kationt (E°(Na⁺/Na) = −2,71 V), takže na katodě běží <span class=\"chem\">2 H₂O + 2 e⁻ → H₂ + 2 OH⁻</span>. Sodík by vznikl jen z <b>taveniny</b>. Chlor se tvoří na anodě a kyslík se z roztoku NaCl nevylučuje kvůli přepětí."},
 {t:"single", q:"Proč se na anodě při chloralkalické elektrolýze vylučuje chlor, přestože kyslík má nižší <span class=\"q\">E</span>°?",
  o:["Protože chloridů je v roztoku víc než vody","Protože kyslík by okamžitě zreagoval s vodíkem","<b>Protože vylučování kyslíku má na běžných anodách velké přepětí</b>","Protože chlor má nižší molární hmotnost než kyslík"], c:2,
  e:"E°(O₂/H₂O) = 1,23 V je nižší než E°(Cl₂/Cl⁻) = 1,36 V, takže by měl vyhrát kyslík. Jeho vylučování je ale kineticky pomalé a vyžaduje přepětí kolem 0,5 V — bez tohoto jevu by celá technologie neexistovala."},
 {t:"num", q:"Kolik kilogramů chloru vyrobí elektrolyzér při proudu 12 kA za 24 hodin se stoprocentním proudovým výtěžkem? <span class=\"q\">F</span> = 96 485 C·mol⁻¹, <span class=\"q\">M</span>(Cl₂) = 70,90 g·mol⁻¹. (Zadejte v kilogramech.)",
  ans:381, tol:6, unit:"kg",
  e:"Q = I·t = 12 000 · 86 400 = 1,037·10⁹ C. n(e⁻) = Q/F = 10 746 mol, n(Cl₂) = 5 373 mol, m = 5 373 · 70,90 = 381 kg. Pozor na dvě klasické chyby: čas se dosazuje v sekundách a na jednu molekulu chloru připadají <b>dva</b> elektrony."},
 {t:"single", q:"Který proces chloralkalické elektrolýzy byl v Evropské unii ukončen ke konci roku 2017?",
  o:["membránový","diafragmový","<b>amalgámový</b>","všechny tři zůstaly v provozu"], c:2,
  e:"Amalgámový proces používá rtuťovou katodu a přes všechny výhody (nejčistší louh) měl nejvyšší spotřebu energie a rtuť v provozu i v odpadech. V EU skončil 11. prosince 2017; dnešním standardem je membránový proces."},
 {t:"multi", q:"Které výroky o freonech a ozonové vrstvě platí?",
  o:["Atom chloru v katalytickém cyklu se nespotřebovává","Brom je v ničení ozonu účinnější než chlor","HFC-134a ozonovou vrstvu neničí, ale je to skleníkový plyn","Freony se rozkládají už v troposféře, a proto do stratosféry nedoletí","Montrealský protokol byl přijat roku 1987"], c:[0,1,2,4],
  e:"Právě naopak — freony jsou v troposféře natolik netečné, že se nerozloží a doputují do stratosféry, kde je teprve tvrdé UV záření rozštěpí. To je jádro celého problému. Ostatní čtyři výroky jsou správné."}
];
