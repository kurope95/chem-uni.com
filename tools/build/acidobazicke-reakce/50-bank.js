/* ============================================================
   T19 · BANKA OTÁZEK — kapitolové mini-testy
   ============================================================ */

BANK.q0=[
 {t:"single",q:"Co přesně znamená zápis <span class='chem'>H⁺</span> v rovnici acidobazické reakce ve vodném roztoku?",
  o:["Volný proton, který se v roztoku pohybuje samostatně","Atom vodíku, který ztratil neutron","Zkratku pro oxoniový kation H₃O⁺, tedy proton navázaný na molekulu vody","Molekulu vodíku H₂ rozpuštěnou ve vodě"],c:2,
  e:"Holý proton je natolik malý a jeho náboj tak koncentrovaný, že se ve vodě okamžitě naváže na volný elektronový pár kyslíku a vznikne H₃O⁺. Zápis H⁺ je proto jen dohodnutá zkratka. Atom vodíku ostatně žádný neutron ve své nejběžnější podobě nemá."},
 {t:"single",q:"Jaká je koncentrace hydroxidových aniontů v roztoku o pH 3 (25 °C)?",
  o:["10⁻¹¹ mol·dm⁻³","Nulová — v kyselém roztoku žádné OH⁻ nejsou","10⁻³ mol·dm⁻³","10⁻⁷ mol·dm⁻³"],c:0,
  e:"Z iontového součinu [OH⁻] = Kw/[H₃O⁺] = 10⁻¹⁴/10⁻³ = 10⁻¹¹ mol·dm⁻³. Hydroxidové anionty jsou přítomné vždy — jen jich je v kyselém prostředí extrémně málo. Nulová koncentrace by znamenala nekonečné pOH, což je nesmysl."},
 {t:"single",q:"Čistá voda má při 50 °C pH 6,63. Co to znamená?",
  o:["Voda je při této teplotě slabě kyselá","Voda je stále neutrální, protože [H₃O⁺] = [OH⁻]; jen Kw je větší","Došlo k chybě měření, čistá voda má vždy pH 7","Voda se rozkládá na vodík a kyslík"],c:1,
  e:"Autoprotolýza je endotermická, takže se zahřátím posune doprava a Kw roste (při 50 °C na 5,5·10⁻¹⁴). Obě koncentrace rostou stejně, takže voda zůstává neutrální — jen odpovídající pH klesne na 6,63. Neutralita je definovaná rovností [H₃O⁺] = [OH⁻], ne číslem 7."},
 {t:"multi",q:"Která tvrzení o stupnici pH jsou správná?",
  o:["Rozdíl jedné jednotky pH znamená desetinásobný rozdíl koncentrace H₃O⁺","Roztok o pH 2 má stokrát víc H₃O⁺ než roztok o pH 4","pH nemůže být záporné ani větší než 14","Součet pH a pOH je při 25 °C roven 14"],c:[0,1,3],
  e:"Stupnice je logaritmická, takže jedna jednotka je desetinásobek a dvě jednotky stonásobek. Součet pH + pOH = pKw = 14 při 25 °C. Meze 0 a 14 jsou jen praktické: koncentrovaná HCl má pH kolem −1 a nasycený NaOH kolem 15."},
 {t:"single",q:"Indikátor je chemicky vzato…",
  o:["sůl silné kyseliny a silné zásady","katalyzátor acidobazické reakce","organické barvivo bez kyselých vlastností","slabá kyselina, jejíž forma HInd má jinou barvu než forma Ind⁻"],c:3,
  e:"Platí rovnováha HInd ⇌ H⁺ + Ind⁻ a obě formy mají různou barvu; podle pH převládne jedna z nich. Přechodová oblast je proto široká asi dvě jednotky pH kolem pKa indikátoru. Katalyzátor to není — indikátor se reakce účastní jako reaktant, jen v nepatrném množství."},
 {t:"num",q:"Vypočítejte pH roztoku kyseliny chlorovodíkové o koncentraci 0,0050 mol·dm⁻³. (Zadejte na dvě desetinná místa.)",
  ans:2.30,tol:0.05,unit:"pH",
  e:"HCl je silná kyselina, takže [H₃O⁺] = 0,0050 mol·dm⁻³. pH = −log(5,0·10⁻³) = 3 − log 5,0 = 3 − 0,70 = <b>2,30</b>. Kdyby šlo o stejně koncentrovanou kyselinu octovou, vyšlo by pH kolem 3,5 — silná a slabá kyselina o stejné koncentraci dají různé pH."}
];

BANK.q1=[
 {t:"single",q:"Proč Arrheniova teorie nevysvětlí zásaditost amoniaku?",
  o:["Protože amoniak je plyn, a Arrhenius pracoval jen s pevnými látkami","Protože molekula NH₃ neobsahuje žádnou skupinu OH, kterou by mohla ve vodě odštěpit","Protože amoniak ve vodě nereaguje","Protože amoniak je podle Arrhenia kyselina"],c:1,
  e:"Arrheniova zásada musí ve vodě odštěpovat OH⁻, jenže v NH₃ žádný kyslík není. Arrhenius si pomáhal fikcí „NH₄OH“, která ve skutečnosti neexistuje. Brønsted problém vyřešil definicí zásady jako akceptoru protonu: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻."},
 {t:"single",q:"Podle Brønstedovy–Lowryho teorie je zásada…",
  o:["látka odštěpující ve vodě OH⁻","akceptor elektronového páru","akceptor protonu","látka s pH nad 7"],c:2,
  e:"Brønstedova zásada proton přijímá, kyselina ho odevzdává. Odštěpování OH⁻ je definice Arrheniova a akceptor elektronového páru je Lewisova <em>kyselina</em>. pH je vlastnost roztoku, ne definice částice."},
 {t:"single",q:"Která z uvedených látek je Lewisovou kyselinou, ale <b>není</b> kyselinou podle Brønsteda?",
  o:["BF₃","HCl","CH₃COOH","NH₄⁺"],c:0,
  e:"Fluorid boritý nemá žádný proton, který by mohl odevzdat, takže Brønstedova teorie ho nepopíše. Bor v něm má jen šest valenčních elektronů a volný p-orbital, takže ochotně přijme elektronový pár — například od amoniaku. Zbylé tři látky protony mají a jsou kyselinami podle obou teorií."},
 {t:"multi",q:"Které reakce jsou acidobazické podle Lewise, ale nejde v nich o přenos protonu?",
  o:["Cu²⁺ + 4 NH₃ → [Cu(NH₃)₄]²⁺","CaO + CO₂ → CaCO₃","HCl + NaOH → NaCl + H₂O","AlCl₃ + Cl⁻ → [AlCl₄]⁻"],c:[0,1,3],
  e:"V prvním, druhém a čtvrtém případě vzniká donor-akceptorová vazba mezi elektronovým párem a jeho akceptorem, a žádný proton se nepřenáší. Neutralizace HCl s NaOH je naproti tomu klasický přenos protonu, tedy reakce brønstedovská (a zároveň lewisovská)."},
 {t:"single",q:"Co znamená vyrovnávací (nivelizační) efekt vody?",
  o:["Že voda má vždy pH přesně 7","Že se ve vodě vyrovnají koncentrace všech iontů","Že voda tlumí změny pH jako pufr","Že se všechny kyseliny silnější než H₃O⁺ jeví ve vodě stejně silné"],c:3,
  e:"Nejsilnější kyselina, která ve vodě může existovat, je H₃O⁺; cokoli silnějšího jí předá proton úplně. HCl, HNO₃ i HClO₄ proto ve vodě nelze rozlišit a jejich pKa se určuje v jiných rozpouštědlech. Analogicky je nejsilnější možnou bází ve vodě OH⁻."},
 {t:"single",q:"Reakce plynného HCl s plynným NH₃ dává pevný NH₄Cl. Podle kterých teorií jde o acidobazickou reakci?",
  o:["Podle žádné — chybí voda","Podle Arrhenia i Brønsteda, ne podle Lewise","Podle Brønsteda i Lewise, ne podle Arrhenia","Jen podle Arrhenia"],c:2,
  e:"HCl odevzdá proton (Brønstedova kyselina), NH₃ ho přijme svým volným párem (Brønstedova zásada i Lewisova zásada). Arrheniova teorie mlčí, protože reakce probíhá bez vody a NH₃ neobsahuje OH. Právě takové případy vedly ke vzniku obou novějších teorií."}
];

BANK.q2=[
 {t:"single",q:"Konjugovaná báze kyseliny <span class='chem'>H₂PO₄⁻</span> je…",
  o:["H₃PO₄","PO₄³⁻","HPO₄²⁻","H₂PO₃⁻"],c:2,
  e:"Konjugovaná báze vznikne odebráním jednoho protonu: ubude jeden vodík a náboj klesne o jedna, tedy z −1 na −2. H₃PO₄ je naopak konjugovaná kyselina a PO₄³⁻ je o dva protony dál — s H₂PO₄⁻ tedy konjugovaný pár netvoří."},
 {t:"single",q:"Které dvě částice <b>netvoří</b> konjugovaný pár?",
  o:["HCO₃⁻ a CO₂","NH₄⁺ a NH₃","HS⁻ a H₂S","CH₃COOH a CH₃COO⁻"],c:0,
  e:"Konjugovaný pár se liší přesně o jeden proton. HCO₃⁻ a CO₂ se liší o H₂O (přesněji: konjugovanou kyselinou HCO₃⁻ je H₂CO₃, která se teprve rozkládá na CO₂ a vodu). Zbylé tři dvojice se liší jediným protonem."},
 {t:"single",q:"V reakci <span class='chem'>NH₃ + H₂O ⇌ NH₄⁺ + OH⁻</span> je voda…",
  o:["katalyzátorem","kyselinou, protože odevzdává proton","jen rozpouštědlem, do rovnice ji píšeme formálně","zásadou, protože přijímá proton"],c:1,
  e:"Voda tu proton odevzdává amoniaku, takže vystupuje jako Brønstedova kyselina; jejím konjugovaným párem je H₂O/OH⁻. V reakci s HCl by naopak proton přijímala a byla by zásadou — proto je voda amfolyt. Do rovnice patří jako plnohodnotný reaktant."},
 {t:"multi",q:"Které částice jsou amfolyty (amfiprotní)?",
  o:["HCO₃⁻","Cl⁻","H₂O","HSO₄⁻","NO₃⁻"],c:[0,2,3],
  e:"Amfolyt musí umět proton přijmout i odevzdat. HCO₃⁻, voda i HSO₄⁻ mají odštěpitelný vodík a zároveň volný elektronový pár. Chloridový a dusičnanový anion žádný odštěpitelný proton nemají a jako konjugované báze silných kyselin jsou navíc prakticky nebazické."},
 {t:"single",q:"Kyselina HA má pKa = 5,2. Jaké pKb má její konjugovaná báze A⁻ (25 °C)?",
  o:["5,2","19,2","−5,2","8,8"],c:3,
  e:"Pro konjugovaný pár platí pKa + pKb = 14, tedy pKb = 14 − 5,2 = 8,8. Vztah plyne ze součinu Ka·Kb = Kw = 10⁻¹⁴. Hodnota 19,2 by vznikla chybným sečtením místo odečtení."},
 {t:"single",q:"Co plyne z toho, že HCl je velmi silná kyselina?",
  o:["Chloridový anion je velmi slabá báze a ve vodě se nehydrolyzuje","Chloridový anion je silná báze","Roztoky chloridů jsou vždy kyselé","HCl je zároveň silná Lewisova zásada"],c:0,
  e:"Čím ochotněji kyselina proton odevzdává, tím neochotněji ho její konjugovaná báze bere zpět. Cl⁻ má odhadované pKb kolem 21, takže s vodou prakticky nereaguje — a proto je roztok NaCl neutrální. Kyselost roztoků některých chloridů (AlCl₃, NH₄Cl) způsobuje kation, ne chlorid."}
];

BANK.q3=[
 {t:"single",q:"Kyselina octová má Ka = 1,74·10⁻⁵. Jaké je její pKa?",
  o:["5,00","−4,76","1,74","4,76"],c:3,
  e:"pKa = −log(1,74·10⁻⁵) = 5 − log 1,74 = 5 − 0,24 = 4,76. Záporné znaménko výsledku by znamenalo kyselinu silnější než H₃O⁺, což octová rozhodně není. Hodnota 5,00 by odpovídala Ka = 1,0·10⁻⁵."},
 {t:"single",q:"Která z uvedených kyselin je nejsilnější?",
  o:["HCN (pKa 9,21)","HF (pKa 3,17)","CH₃COOH (pKa 4,76)","H₂CO₃ (pKa 6,35)"],c:1,
  e:"Menší pKa znamená silnější kyselinu, protože jde o záporný logaritmus. HF s hodnotou 3,17 je tedy nejsilnější z nabídky a kyanovodík (9,21) nejslabší — rozdíl šesti jednotek znamená milionkrát větší Ka. Záměna směru čtení pKa je nejčastější chyba celé kapitoly."},
 {t:"single",q:"Proč je Ka₂ vícesytné kyseliny vždy mnohem menší než Ka₁?",
  o:["Protože se druhý proton odštěpuje z aniontu, který ho drží silněji","Protože je druhý proton vázán jiným typem vazby","Protože se molekula po první disociaci rozpadne","Protože Ka₂ se měří při jiné teplotě"],c:0,
  e:"Po odštěpení prvního protonu má částice záporný náboj, který další kladný proton přitahuje — odtrhnout ho stojí víc energie. Konstanty proto klesají zhruba o pět řádů na stupeň: H₃PO₄ má pKa 2,15; 7,20 a 12,3. Typ vazby O–H se přitom nemění."},
 {t:"multi",q:"Která tvrzení o síle a koncentraci jsou správná?",
  o:["Silná kyselina je ta, která ve vodě disociuje prakticky úplně","Zředěná silná kyselina může mít vyšší pH než koncentrovaná slabá","Stupeň disociace slabé kyseliny roste se zředěním","Ka slabé kyseliny roste se zředěním"],c:[0,1,2],
  e:"Síla je vlastnost látky popsaná konstantou Ka, koncentrace je vlastnost roztoku a pH je výsledek obojího. Ostwaldův zřeďovací zákon říká, že α ≈ √(Ka/c) — zředěním tedy roste stupeň disociace, ale konstanta Ka se nemění, jinak by to nebyla konstanta."},
 {t:"single",q:"Amoniak má pKb = 4,75. Jaké pKa má amonný kation?",
  o:["4,75","18,75","9,25","−4,75"],c:2,
  e:"NH₄⁺ a NH₃ jsou konjugovaný pár, takže pKa(NH₄⁺) = 14 − 4,75 = 9,25. Tabulková hodnota to potvrzuje. Právě proto jsou roztoky amonných solí silných kyselin slabě kyselé."},
 {t:"num",q:"Jaký je stupeň disociace kyseliny octové (Ka = 1,74·10⁻⁵) v roztoku o koncentraci 0,10 mol·dm⁻³? (Zadejte v procentech.)",
  ans:1.32,tol:0.15,unit:"%",
  e:"Pro slabou kyselinu platí α ≈ √(Ka/c) = √(1,74·10⁻⁵/0,10) = √(1,74·10⁻⁴) = 0,0132, tedy <b>1,32 %</b>. Ve stokrát zředěnějším roztoku by to bylo desetkrát víc, přibližně 13 %. Konstanta Ka přitom zůstává stejná."}
];

BANK.q4=[
 {t:"single",q:"Který halogenovodík je ve vodě nejsilnější kyselinou?",
  o:["HF, protože fluor má největší elektronegativitu","HI, protože vazba H–I je nejdelší a nejslabší","HCl, protože je nejběžnější","Všechny jsou stejně silné"],c:1,
  e:"Ve skupině shora dolů roste velikost atomu, vazba H–X se prodlužuje a slábne (H–F 567, H–I 299 kJ·mol⁻¹) a velký anion I⁻ lépe rozprostře náboj. Elektronegativita tu vede k opačnému, chybnému závěru — HF je jediný slabý halogenovodík. Ve vodě jsou ovšem HCl, HBr i HI vyrovnány na H₃O⁺."},
 {t:"single",q:"Proč je HClO₄ podstatně silnější kyselina než HClO?",
  o:["Protože má víc vodíků","Protože chlor má v HClO₄ nižší oxidační číslo","Protože tři kyslíky navíc odsávají elektrony a rezonancí stabilizují anion","Protože HClO₄ je pevná látka"],c:2,
  e:"Podle Paulingova pravidla sníží každý kyslík vázaný na centrální atom bez vodíku pKa asi o pět jednotek. Kyslíky odtahují elektronovou hustotu z vazby O–H a v aniontu ClO₄⁻ rozprostřou záporný náboj mezi čtyři rovnocenné atomy. Oxidační číslo chloru je v HClO₄ naopak nejvyšší možné, +VII."},
 {t:"single",q:"Seřaďte podle rostoucí kyselosti: ethanol, fenol, kyselina octová.",
  o:["kyselina octová < fenol < ethanol","fenol < ethanol < kyselina octová","ethanol < kyselina octová < fenol","ethanol < fenol < kyselina octová"],c:3,
  e:"Rozhoduje stabilita aniontu: v ethoxidu sedí náboj na jediném kyslíku (pKa ≈ 16), ve fenoxidu je rozprostřený rezonancí do jádra (9,99) a v karboxylátu rozdělený mezi dva rovnocenné kyslíky (4,76). Proto je kyselina octová z trojice zdaleka nejsilnější."},
 {t:"single",q:"Proč je trimethylamin (pKb 4,19) slabší báze než dimethylamin (pKb 3,27), přestože má o jeden alkyl navíc?",
  o:["Protože jeho kation má jen jeden vodík k solvataci vodou a stericky brání přístupu protonu","Protože methyl má ve skutečnosti −I efekt","Protože trimethylamin nemá volný elektronový pár","Protože je to terciární amin, a ty nejsou zásadité"],c:0,
  e:"Induktivní efekt by sám o sobě předpovídal, že terciární amin bude nejsilnější — v plynné fázi to skutečně platí. Ve vodě ale rozhoduje také stabilizace vzniklého kationtu vodíkovými vazbami, a (CH₃)₃NH⁺ má jen jeden vodík. Sterické stínění dusíku efekt ještě podpoří."},
 {t:"multi",q:"Které substituční efekty <b>zvyšují</b> sílu karboxylové kyseliny?",
  o:["chlor na α-uhlíku (−I)","methylová skupina (+I)","nitroskupina na aromatickém jádře (−M)","další chlor na témže uhlíku"],c:[0,2,3],
  e:"Elektronakceptorní skupiny (−I, −M) stabilizují záporný náboj aniontu, takže kyselina sílí; efekt se navíc sčítá (CH₃COOH 4,76 → ClCH₂COOH 2,87 → Cl₂CHCOOH 1,35). Alkyl naopak elektrony tlačí, náboj destabilizuje a kyselinu oslabuje — proto je kyselina mravenčí silnější než octová."},
 {t:"single",q:"Proč je anilin mnohem slabší báze než methylamin?",
  o:["Protože anilin nemá na dusíku volný elektronový pár","Protože je anilin nerozpustný ve vodě","Protože benzenové jádro odtahuje volný pár dusíku do konjugace, takže není dostupný protonu","Protože anilin je ve skutečnosti kyselina"],c:2,
  e:"Volný pár dusíku se v anilinu podílí na aromatickém konjugovaném systému (+M efekt do kruhu) a jeho vazba s protonem by tuto stabilizaci zrušila. Bazicita proto klesá o šest řádů (pKb 9,40 proti 3,36 u methylaminu). U amidů je stejný jev ještě výraznější — jsou prakticky nebazické."}
];

BANK.q5=[
 {t:"single",q:"Na které straně leží rovnováha acidobazické reakce?",
  o:["Na straně slabší kyseliny a slabší báze","Na straně silnější kyseliny a silnější báze","Vždy na straně produktů","Na straně, kde je víc částic"],c:0,
  e:"Proton putuje od ochotnějšího dárce k ochotnějšímu příjemci, takže vznikají částice, které ho drží pevněji — tedy slabší kyselina a slabší báze. Kvantitativně K = 10^(pKa vpravo − pKa vlevo): kladný exponent znamená posun doprava."},
 {t:"single",q:"Proběhne reakce <span class='chem'>CH₃COOH + Cl⁻ → CH₃COO⁻ + HCl</span>? pKa(CH₃COOH) = 4,76; pKa(HCl) ≈ −7.",
  o:["Ano, protože kyselina octová je slabá","Ano, ale jen za varu","Neproběhne — vznikla by silnější kyselina, K ≈ 10⁻¹²","Proběhne přesně z poloviny"],c:2,
  e:"K = 10^(−7 − 4,76) = 10⁻¹¹·⁸, tedy prakticky nula. Reakce by musela vyrobit kyselinu o dvanáct řádů silnější, než je výchozí — proton nikdy nejde od slabší kyseliny k silnější. Samovolně probíhá reakce opačná, tedy vytěsnění kyseliny octové z octanu kyselinou chlorovodíkovou."},
 {t:"single",q:"Kterým činidlem rozlišíte fenol (pKa 9,99) od kyseliny benzoové (pKa 4,20)?",
  o:["Roztokem NaOH — reaguje jen kyselina benzoová","Roztokem NaHCO₃ — šumí jen kyselina benzoová","Destilovanou vodou","Roztokem NaCl"],c:1,
  e:"S hydroxidem reagují obě látky, protože obě jsou kyselejší než voda. Hydrogenuhličitan však odpovídá kyselině uhličité s pKa 6,35: silnější kyselina benzoová z něj CO₂ vytěsní (K ≈ 140), zatímco slabší fenol nikoli (K ≈ 2·10⁻⁴). Bublinky plynu jsou tedy rozlišovacím znamením."},
 {t:"multi",q:"Ve kterých reakcích se uvolní plyn?",
  o:["Na₂CO₃ + HCl","NH₄Cl + NaOH (za zahřívání)","NaCl + H₂SO₄ (zředěná, za studena)","FeS + HCl"],c:[0,1,3],
  e:"Uhličitan dá CO₂, amonná sůl se silnou zásadou amoniak a sulfid sulfan — ve všech případech vytěsňuje silnější partner slabšího a plyn odchodem reakci dokončí. U chloridu sodného by musela zředěná kyselina sírová vytěsnit silnější HCl, což nejde."},
 {t:"single",q:"Reakce <span class='chem'>Zn + 2 HCl → ZnCl₂ + H₂</span> je…",
  o:["neutralizace","acidobazická reakce podle Brønsteda","hydrolýza","redoxní reakce, nikoli acidobazická"],c:3,
  e:"Zinek neodevzdává ani nepřijímá proton — odevzdává elektrony (Zn⁰ → Zn²⁺) a vodík se z oxidačního čísla +I redukuje na 0. Mění se tedy oxidační čísla, což je definiční znak redoxní reakce. O jejím průběhu rozhoduje elektrochemická řada kovů, ne hodnoty pKa."},
 {t:"num",q:"Vypočítejte rovnovážnou konstantu reakce <span class='chem'>HF + CH₃COO⁻ ⇌ F⁻ + CH₃COOH</span>. pKa(HF) = 3,17; pKa(CH₃COOH) = 4,76.",
  ans:38.9,tol:3,unit:"K",
  e:"K = 10^(pKa vpravo − pKa vlevo) = 10^(4,76 − 3,17) = 10^1,59 = <b>38,9</b>. Silnější kyselina HF předá proton octanu, takže rovnováha leží vpravo, ale ne úplně — rozdíl pKa je menší než tři jednotky. V roztoku proto najdeme v měřitelném množství všechny čtyři částice."}
];

BANK.q6=[
 {t:"single",q:"Proč má roztok octanu sodného pH kolem 9?",
  o:["Protože sodný kation reaguje s vodou za vzniku NaOH","Protože octanový anion odebírá vodě proton a uvolňuje OH⁻","Protože octan sodný obsahuje hydroxidové skupiny","Protože se octan rozkládá na oxid uhličitý"],c:1,
  e:"Octan je konjugovaná báze slabé kyseliny octové (pKb 9,24), takže s vodou reaguje: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻. Sodný kation pochází ze silné zásady a s vodou nereaguje vůbec — je to jen hydratovaný divák."},
 {t:"single",q:"Který z roztoků (všechny 0,1 mol·dm⁻³) je kyselý?",
  o:["KNO₃","Na₂SO₄","CH₃COONa","AlCl₃"],c:3,
  e:"Hydratovaný kation [Al(H₂O)₆]³⁺ je díky vysokému náboji a malému poloměru znatelná kyselina (pKa ≈ 5) a odštěpuje proton z koordinované vody. Dusičnan draselný i síran sodný pocházejí od silných partnerů a jsou neutrální, octan sodný je zásaditý."},
 {t:"single",q:"Roztok hydrogensíranu sodného NaHSO₄ má pH asi 1,6. Čím to je?",
  o:["Anion HSO₄⁻ je sám středně silná kyselina a disociuje na SO₄²⁻ a H₃O⁺","Sodný kation hydrolyzuje kysele","Jde o sůl slabé kyseliny a slabé zásady","Sůl se rozkládá na kyselinu sírovou"],c:0,
  e:"Nejde o hydrolýzu, ale o prostou disociaci aniontu: HSO₄⁻ má pKa 1,99, tedy Ka ≈ 10⁻². Pravidlo „sůl silné kyseliny a silné zásady je neutrální“ na hydrogensoli nelze mechanicky použít — je nutné posoudit chování aniontu samotného."},
 {t:"multi",q:"Které soli mají ve vodném roztoku zásaditou reakci?",
  o:["Na₂CO₃","NH₄NO₃","KF","NaCN","CaCl₂"],c:[0,2,3],
  e:"Uhličitan, fluorid i kyanid jsou konjugované báze slabých kyselin (H₂CO₃, HF, HCN) a s vodou uvolňují OH⁻. Dusičnan amonný je naopak kyselý díky hydrolýze NH₄⁺ a chlorid vápenatý je neutrální, protože oba jeho ionty pocházejí od silných partnerů."},
 {t:"single",q:"Roztok octanu amonného CH₃COONH₄ je prakticky neutrální. Proč?",
  o:["Protože žádný z jeho iontů nehydrolyzuje","Protože hydrolyzuje jen kation a efekt je slabý","Protože hydrolyzují oba ionty a jejich konstanty jsou téměř stejné","Protože octan amonný je nerozpustný"],c:2,
  e:"Ka(NH₄⁺) = 5,6·10⁻¹⁰ a Kb(CH₃COO⁻) = 5,8·10⁻¹⁰, takže kation vyrábí H₃O⁺ prakticky stejně rychle jako anion OH⁻. Roztok je proto neutrální ne kvůli nepřítomnosti hydrolýzy, ale kvůli jejímu přesnému vyrovnání. U NH₄CN se rovnováha překlopí k zásaditému pH, protože Kb(CN⁻) je o čtyři řády větší."},
 {t:"single",q:"Proč se sodou (Na₂CO₃) dá prát a odmašťovat?",
  o:["Protože je to silná zásada rozpuštěná ve vodě","Protože hydrolýzou uhličitanu vzniká tolik OH⁻, že roztok má pH kolem 11,6 a zmýdelňuje tuky","Protože soda reaguje s tuky za vzniku oxidu uhličitého","Protože soda snižuje pH vody"],c:1,
  e:"Uhličitanový anion je poměrně silná báze (pKb 3,67) a jeho hydrolýza CO₃²⁻ + H₂O ⇌ HCO₃⁻ + OH⁻ posune pH k hodnotě kolem 11,6. Soda sama žádné hydroxidové skupiny neobsahuje, vyrábí si je až reakcí s vodou. Vzniklé prostředí hydrolyzuje esterové vazby tuků na rozpustná mýdla."}
];
