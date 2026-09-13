/* ============================================================
   T23 · BANKA OTÁZEK — kapitoly 5 až 8
   ============================================================ */
BANK.q5=[
 {t:"num",q:"25,0 mL CH₃COOH (0,100 mol·dm⁻³, p<span class='q'>K</span><sub>a</sub> = 4,76) titrujeme NaOH 0,100 mol·dm⁻³. Jaké je pH po přidání 12,5 mL? (Na dvě desetinná místa.)",
  ans:4.76,tol:0.06,unit:"pH",
  e:"V polovině titrace je přesně polovina kyseliny přeměněná na octan, poměr [A⁻]/[HA] = 1 a logaritmus je nula: pH = p<span class='q'>K</span><sub>a</sub> = <b>4,76</b>. Právě takhle se p<span class='q'>K</span><sub>a</sub> experimentálně určuje."},
 {t:"single",q:"Proč leží bod ekvivalence titrace kyseliny octové hydroxidem sodným nad pH 7?",
  o:["Protože NaOH je silnější zásada než HCl kyselina","Protože se nestihne zneutralizovat všechna kyselina","Protože indikátor posune výsledek","Protože v roztoku zůstane octan sodný, jehož anion hydrolyzuje zásaditě"],c:3,
  e:"V bodě ekvivalence není v baňce ani kyselina, ani hydroxid — jen sůl. Octanový anion je konjugovaná zásada slabé kyseliny, takže odebírá vodě proton a pH stoupne na 8,73. U silné kyseliny (NaCl) k tomu nedochází a pH je 7,00."},
 {t:"num",q:"Jaké je pH v bodě ekvivalence při titraci 25,0 mL CH₃COOH (0,100 M) hydroxidem 0,100 M? p<span class='q'>K</span><sub>a</sub> = 4,76. (Na dvě desetinná místa.)",
  ans:8.73,tol:0.06,unit:"pH",
  e:"Vznikne 2,50 mmol octanu v 50,0 mL, tedy c = 0,050 mol·dm⁻³ (poloviční, objem se zdvojnásobil!). pH = 7 + ½(4,76 + log 0,050) = 7 + ½(4,76 − 1,30) = <b>8,73</b>. Kdo použije 0,100 M, dostane 8,88."},
 {t:"single",q:"Jaký indikátor je vhodný pro titraci amoniaku kyselinou chlorovodíkovou (ekvivalence při pH 5,28)?",
  o:["methyloranž (přechod 3,1–4,4)","fenolftalein (8,2–10,0)","oba jsou stejně dobré","žádný, titrace se musí sledovat pH-metrem"],c:0,
  e:"Indikátor musí měnit barvu uvnitř skoku křivky, který u této titrace jde zhruba od 6,9 dolů k 3,7. Fenolftalein by se odbarvil dávno před ekvivalencí (kolem pH 9), zatímco methyloranž se trefí. Pro slabou kyselinu s hydroxidem to platí obráceně."},
 {t:"num",q:"25,0 mL HCl (0,100 M) titrujeme NaOH (0,100 M). Jaké je pH po přidání 24,9 mL? (Na dvě desetinná místa.)",
  ans:3.70,tol:0.06,unit:"pH",
  e:"Zbývá 2,50 − 2,49 = 0,010 mmol H₃O⁺ ve 49,9 mL, tedy 2,0·10⁻⁴ mol·dm⁻³ → pH = <b>3,70</b>. Po další jedné desetině mililitru bude pH 10,30: dvě kapky změní pH o 6,6 jednotky, a to je ten „skok“."},
 {t:"multi",q:"Která tvrzení o titračních křivkách jsou <b>správná</b>?",
  o:["Bod ekvivalence titrace silné kyseliny silnou zásadou má pH 7,00","V polovině titrace slabé kyseliny je pH rovno p<span class='q'>K</span><sub>a</sub>","Skok u slabé kyseliny je kratší než u silné","Bod ekvivalence je vždy při pH 7,00"],c:[0,1,2],
  e:"První tři platí. Poslední je nejčastější omyl: u slabé kyseliny je ekvivalence nad 7 (8,73), u slabé zásady pod 7 (5,28), protože vzniklá sůl hydrolyzuje. Právě kvůli kratšímu skoku selže u slabé kyseliny methyloranž."}
];

BANK.q6=[
 {t:"num",q:"Vypočítejte molární rozpustnost BaSO₄ (<span class='q'>K</span><sub>sp</sub> = 1,1·10⁻¹⁰). Zadejte v μmol·dm⁻³ (tedy v 10⁻⁶ mol·dm⁻³).",
  ans:10.5,tol:0.6,unit:"µmol·dm⁻³",
  e:"BaSO₄ je typ AB, takže K<sub>sp</sub> = s² a s = √(1,1·10⁻¹⁰) = 1,05·10⁻⁵ mol·dm⁻³ = <b>10,5 μmol·dm⁻³</b> (2,4 mg na litr). Proto se síran barnatý smí polykat jako kontrastní látka, přestože baryum je jedovaté."},
 {t:"num",q:"Vypočítejte molární rozpustnost PbI₂ (<span class='q'>K</span><sub>sp</sub> = 9,8·10⁻⁹). Zadejte v mmol·dm⁻³.",
  ans:1.35,tol:0.08,unit:"mmol·dm⁻³",
  e:"Typ AB₂: rozpustí-li se s molů, je [Pb²⁺] = s a [I⁻] = 2s, takže K<sub>sp</sub> = 4s³ a s = ∛(2,45·10⁻⁹) = 1,35·10⁻³ mol·dm⁻³ = <b>1,35 mmol·dm⁻³</b>. Kdo použije √K<sub>sp</sub>, dostane 9,9·10⁻⁵ — o řád vedle."},
 {t:"single",q:"AgCl má <span class='q'>K</span><sub>sp</sub> = 1,8·10⁻¹⁰, Ag₂CrO₄ jen 1,1·10⁻¹². Která sůl je rozpustnější?",
  o:["Ag₂CrO₄, protože je typ A₂B: s = ∛(K<sub>sp</sub>/4) = 6,5·10⁻⁵ oproti 1,3·10⁻⁵","AgCl, protože má větší <span class='q'>K</span><sub>sp</sub>","Obě stejně, součin rozpustnosti je jen jiný zápis rozpustnosti","Nelze rozhodnout bez molárních hmotností"],c:0,
  e:"Menší K<sub>sp</sub> neznamená automaticky menší rozpustnost — porovnávat lze jen soli téhož typu. Chroman stříbrný dává tři ionty, takže se ze součinu odmocňuje třetí mocnina a vyjde pětkrát vyšší rozpustnost. Na tom stojí Mohrova metoda."},
 {t:"num",q:"Jaké je pH nasyceného roztoku Mg(OH)₂ (<span class='q'>K</span><sub>sp</sub> = 5,6·10⁻¹²)? (Na dvě desetinná místa.)",
  ans:10.35,tol:0.06,unit:"pH",
  e:"s = ∛(K<sub>sp</sub>/4) = 1,12·10⁻⁴, ale [OH⁻] = <b>2s</b> = 2,24·10⁻⁴ → pOH = 3,65 → pH = <b>10,35</b>. Zapomenutá dvojka dá 10,05. Vyšší pH mléko hořečnaté dosáhnout nemůže, proto je jako antacidum bezpečné."},
 {t:"single",q:"Smícháme 50 mL CaCl₂ (0,010 M) a 50 mL Na₂SO₄ (0,010 M). Vznikne sraženina CaSO₄ (<span class='q'>K</span><sub>sp</sub> = 4,9·10⁻⁵)?",
  o:["Ano, protože 0,010 · 0,010 = 10⁻⁴ > <span class='q'>K</span><sub>sp</sub>","Ne, po zředění je <span class='q'>Q</span> = 0,0050² = 2,5·10⁻⁵ < <span class='q'>K</span><sub>sp</sub>","Ano, síran vápenatý je nerozpustný","Nelze rozhodnout bez teploty"],c:1,
  e:"Klíčové je zředění: smícháním stejných objemů klesnou obě koncentrace na polovinu, takže Q = 2,5·10⁻⁵ a je menší než K<sub>sp</sub>. První možnost je přesně ta chyba, které se má student vyvarovat — počítá s koncentracemi před smícháním."},
 {t:"num",q:"Jaká je rozpustnost AgCl (<span class='q'>K</span><sub>sp</sub> = 1,8·10⁻¹⁰) v roztoku NaCl o koncentraci 0,050 mol·dm⁻³? Zadejte v nmol·dm⁻³ (10⁻⁹ mol·dm⁻³).",
  ans:3.6,tol:0.3,unit:"nmol·dm⁻³",
  e:"Chlorid je už v roztoku, takže s = [Ag⁺] = K<sub>sp</sub>/[Cl⁻] = 1,8·10⁻¹⁰/0,050 = 3,6·10⁻⁹ mol·dm⁻³ = <b>3,6 nmol·dm⁻³</b>. To je 3700× méně než ve vodě (1,34·10⁻⁵) — efekt společného iontu."}
];

BANK.q7=[
 {t:"num",q:"Roztok obsahuje 0,010 mol·dm⁻³ [Ag(NH₃)₂]⁺ a 1,0 mol·dm⁻³ volného NH₃ (β = 1,6·10⁷). Jaká je hodnota pAg = −log[Ag⁺]? (Na dvě desetinná místa.)",
  ans:9.20,tol:0.08,unit:"pAg",
  e:"[Ag⁺] = c(M)/(β·[NH₃]²) = 0,010/1,6·10⁷ = 6,25·10⁻¹⁰ mol·dm⁻³, tedy pAg = <b>9,20</b>. Volné stříbro kleslo o sedm řádů — přesně tomu se říká maskování iontu."},
 {t:"single",q:"Konstanta nestability komplexu [Cu(NH₃)₄]²⁺ je 9,1·10⁻¹⁴. Jaká je jeho konstanta stability β?",
  o:["1,1·10¹³","9,1·10¹⁴","1,1·10⁻¹³","nelze určit bez koncentrací"],c:0,
  e:"Konstanta nestability je převrácená hodnota konstanty stability: β = 1/9,1·10⁻¹⁴ = 1,1·10¹³ (log β = 13,04). Stabilita se vždy udává velkým číslem, nestabilita mrňavým — záměna obou je klasická chyba."},
 {t:"num",q:"Jaká je rovnovážná konstanta reakce AgCl(s) + 2 NH₃ ⇌ [Ag(NH₃)₂]⁺ + Cl⁻? <span class='q'>K</span><sub>sp</sub> = 1,8·10⁻¹⁰, β = 1,6·10⁷. Zadejte v jednotkách 10⁻³ (tedy jako číslo x, kde K = x·10⁻³).",
  ans:2.88,tol:0.15,unit:"·10⁻³",
  e:"Sečtením obou rovnováh se konstanty násobí: K = K<sub>sp</sub>·β = 1,8·10⁻¹⁰ · 1,6·10⁷ = 2,88·10⁻³. Vypadá to málo, ale v 1 M amoniaku to stačí na rozpuštění 0,048 mol AgCl (7 g) na litr."},
 {t:"single",q:"Které činidlo spolehlivě rozpustí sraženinu AgI (<span class='q'>K</span><sub>sp</sub> = 8,5·10⁻¹⁷)?",
  o:["zředěná HCl","1 M amoniak (β = 1,6·10⁷)","1 M thiosíran (β = 2,9·10¹³)","1 M kyanid (β = 1,0·10²¹)"],c:3,
  e:"Rozhoduje součin K<sub>sp</sub>·β: s amoniakem je 1,4·10⁻⁹ (rozpustí se 3,7·10⁻⁵ mol), s thiosíranem 2,5·10⁻³ (0,045 mol) a s kyanidem 8,5·10⁴, tedy prakticky kvantitativně. Kyselina chlorovodíková nepomůže vůbec — jodid je anion silné kyseliny."},
 {t:"multi",q:"Která tvrzení o komplexotvorných rovnováhách jsou <b>správná</b>?",
  o:["Celková konstanta stability je součinem postupných konstant","Chelát je stálejší než obdobný komplex s jednovaznými ligandy","EDTA tvoří s většinou kovů komplexy v poměru 1 : 1","Ve výrazu pro β se ligand nemocní"],c:[0,1,2],
  e:"Poslední tvrzení je chybné: β = [ML<sub>n</sub>]/([M][L]<sup>n</sup>), takže ligand je umocněný na svůj počet. Zbytek platí — chelátový efekt má entropický původ a EDTA je šestivazný ligand, který obepne kov sám."},
 {t:"single",q:"K čemu slouží maskování iontů v analytické chemii?",
  o:["Ke zvýšení rozpustnosti všech solí najednou","Ke změně pH roztoku bez pufru","K urychlení srážecí reakce","K převedení rušivého iontu na stálý komplex, takže jeho volná koncentrace klesne o řády"],c:3,
  e:"Maskovací činidlo (NH₃, CN⁻, EDTA, fluorid) sváže rušivý kation do komplexu, takže volná koncentrace klesne pod hodnotu potřebnou pro srážení nebo barevnou reakci. Rovnováha stanovovaného iontu tím zůstane nedotčená."}
];

BANK.q8=[
 {t:"single",q:"„Vypočítejte pH roztoku octanu sodného o koncentraci 0,20 mol·dm⁻³ (<span class='q'>K</span><sub>a</sub> = 1,75·10⁻⁵).“ Jaký postup zvolíte?",
  o:["[H₃O⁺] = √(<span class='q'>K</span><sub>a</sub>·c)","pH = −log c","<span class='q'>K</span><sub>b</sub> = <span class='q'>K</span><sub>w</sub>/<span class='q'>K</span><sub>a</sub>, pak [OH⁻] = √(<span class='q'>K</span><sub>b</sub>·c) a pH = 14 − pOH","pH = p<span class='q'>K</span><sub>a</sub> + log([A⁻]/[HA])"],c:2,
  e:"Název soli je poznávací znak hydrolýzy: pracuje se s K<sub>w</sub>/K<sub>a</sub> a vyjde zásadité pH 9,03. První možnost by dala kyselé pH 2,73 a je nejlákavější, protože zadání K<sub>a</sub> obsahuje. HH rovnice by platila, jen kdyby v roztoku byla i kyselina octová."},
 {t:"single",q:"Zadání říká: „Smícháme 25 mL roztoku Pb(NO₃)₂ (0,020 M) a 25 mL KI (0,020 M).“ Na co se úloha nejspíš ptá a co počítáte?",
  o:["Reakční kvocient <span class='q'>Q</span> = [Pb²⁺][I⁻]² s koncentracemi po zředění a porovnání s <span class='q'>K</span><sub>sp</sub>","Rozpustnost PbI₂ podle 4s³","pH výsledného roztoku","Konstantu stability jodidokomplexu"],c:0,
  e:"Smíchání dvou roztoků iontů málo rozpustné soli je vždy úloha na Q versus K<sub>sp</sub>. Koncentrace klesnou na polovinu (0,010), takže Q = 0,010 · 0,010² = 1,0·10⁻⁶ > 9,8·10⁻⁹ a žlutý PbI₂ se vyloučí."},
 {t:"single",q:"Ve kterém z těchto případů <b>nelze</b> použít vzorec pH = ½(p<span class='q'>K</span><sub>a</sub> − log c)?",
  o:["0,10 M kyselina benzoová","0,050 M kyselina mravenčí","roztok obsahující 0,10 M CH₃COOH i 0,10 M CH₃COONa","0,20 M kyselina octová"],c:2,
  e:"Přítomnost soli téže kyseliny mění celou rovnováhu — jde o pufr a platí Hendersonova–Hasselbalchova rovnice (pH 4,76, ne 2,73). Ostatní tři jsou samotné slabé kyseliny, kde vzorec platí."},
 {t:"multi",q:"Ve kterých úlohách musíte <b>nutně</b> počítat se zředěním po smíchání roztoků?",
  o:["pH po smíchání HCl a NaOH","Q pro rozhodnutí, zda vznikne sraženina","pH pufru po přidání malého objemu koncentrované kyseliny","rozpustnost soli v čisté vodě"],c:[0,1,2],
  e:"Kdykoli se mísí dva roztoky, mění se objem a s ním všechny koncentrace. U rozpustnosti v čisté vodě žádné míchání není, takže tam se nic neředí. U pufru bývá objem přídavku zanedbatelný, ale zadání to musí říct."},
 {t:"single",q:"Zadání: „Kolik gramů AgCl se rozpustí v 250 mL vody?“ (<span class='q'>K</span><sub>sp</sub> = 1,8·10⁻¹⁰, <span class='q'>M</span> = 143,3 g·mol⁻¹). Jaké kroky uděláte a v jakém pořadí?",
  o:["s = √<span class='q'>K</span><sub>sp</sub> → × M → × 0,250","s = √<span class='q'>K</span><sub>sp</sub> → × 0,250 → dělit M","<span class='q'>K</span><sub>sp</sub> × M × 0,250","s = ∛(<span class='q'>K</span><sub>sp</sub>/4) → × M"],c:0,
  e:"Nejdřív molární rozpustnost 1,34·10⁻⁵ mol·dm⁻³, pak převod na gramy na litr (1,92·10⁻³ g·dm⁻³) a nakonec na zadaný objem: 4,8·10⁻⁴ g, tedy zhruba půl miligramu. Třetí odmocnina patří typu AB₂, ne AgCl."},
 {t:"num",q:"Jaké pH má roztok octanu amonného CH₃COONH₄? p<span class='q'>K</span><sub>a</sub>(CH₃COOH) = 4,76, p<span class='q'>K</span><sub>b</sub>(NH₃) = 4,75. (Na dvě desetinná místa.)",
  ans:7.00,tol:0.06,unit:"pH",
  e:"Sůl slabé kyseliny a slabé zásady: pH = 7 + ½(pK<sub>a</sub> − pK<sub>b</sub>) = 7 + ½(0,01) = <b>7,00</b>, a to nezávisle na koncentraci. Je to náhoda daná tím, že obě mateřské látky jsou skoro stejně silné — u NH₄CN by vyšlo 9,23."}
];
