/* ============================================================
   T22 · BANKA OTÁZEK — kapitoly 0 až 4
   ============================================================ */
BANK.q0=[
 {t:"num",q:"Roztok má [H₃O⁺] = 2,0·10⁻⁴ mol·dm⁻³. Jaké je jeho pH? (Zadejte na dvě desetinná místa.)",
  ans:3.70,tol:0.05,unit:"pH",
  e:"pH = −log(2,0·10⁻⁴) = 4 − log 2 = 4 − 0,30 = <b>3,70</b>. Kontrola řádu: koncentrace leží mezi 10⁻⁴ a 10⁻³, takže pH musí být mezi 3 a 4."},
 {t:"single",q:"Proč platí vztah pH + pOH = 14 jen při teplotě 25 °C?",
  o:["Protože při jiné teplotě se mění definice pH","Protože při jiné teplotě přestává platit logaritmus","Protože se mění koncentrace vody","Protože <span class='q'>K</span><sub>w</sub> závisí na teplotě — při 37 °C je 2,4·10⁻¹⁴ a součet je 13,6"],c:3,
  e:"Čtrnáctka je p<span class='q'>K</span><sub>w</sub>, a iontový součin vody roste s teplotou (autoprotolýza je endotermická). Při tělesné teplotě je neutrální pH 6,81, ne 7,00. Definice pH se přitom nemění — mění se jen hodnota konstanty."},
 {t:"num",q:"Roztok má pH 9,40. Jaké je jeho pOH? (Zadejte na dvě desetinná místa.)",
  ans:4.60,tol:0.05,unit:"pOH",
  e:"pOH = 14 − pH = 14 − 9,40 = <b>4,60</b>. Odtud [OH⁻] = 10⁻⁴·⁶⁰ = 2,5·10⁻⁵ mol·dm⁻³, tedy roztok je zásaditý — což pH nad 7 potvrzuje."},
 {t:"num",q:"Roztok obsahuje [OH⁻] = 5,0·10⁻³ mol·dm⁻³. Jaké je jeho pH? (Na dvě desetinná místa.)",
  ans:11.70,tol:0.05,unit:"pH",
  e:"Nejdřív pOH = −log(5,0·10⁻³) = 3 − log 5 = 3 − 0,70 = 2,30. Teprve pak pH = 14 − 2,30 = <b>11,70</b>. Kdo odevzdá 2,30, spletl si pOH s pH — u zásaditého roztoku to musí být nad 7."},
 {t:"multi",q:"Která tvrzení o iontovém součinu vody a pH jsou <b>pravdivá</b>?",
  o:["V 0,1 M HCl je [OH⁻] rovna nule","Součin [H₃O⁺]·[OH⁻] je v každém vodném roztoku 10⁻¹⁴ (25 °C)","Rozdíl jedné jednotky pH znamená desetinásobný rozdíl koncentrace H₃O⁺","Operátor „p“ znamená záporný dekadický logaritmus"],c:[1,2,3],
  e:"Hydroxidových aniontů nikdy není nula — v 0,1 M HCl jich je 10⁻¹³ mol·dm⁻³, protože součin musí zůstat konstantní. Zbylá tři tvrzení jsou definiční vlastnosti logaritmické stupnice."},
 {t:"single",q:"Jaká je koncentrace H₃O⁺ v roztoku o pH 2,70? (Použijte log 2 = 0,30.)",
  o:["2,7·10⁻³ mol·dm⁻³","5,0·10⁻³ mol·dm⁻³","7,0·10⁻² mol·dm⁻³","2,0·10⁻³ mol·dm⁻³"],c:3,
  e:"10⁻²·⁷⁰ = 10⁰·³⁰·10⁻³ = 2,0·10⁻³ mol·dm⁻³, protože log 2 = 0,30. Nejlákavější chyba je opsat číslice z pH („2,7·10⁻³“) — logaritmus se ale takhle nechová."}
];

BANK.q1=[
 {t:"num",q:"Jaké je pH roztoku HNO₃ o koncentraci 0,020 mol·dm⁻³? (Na dvě desetinná místa.)",
  ans:1.70,tol:0.05,unit:"pH",
  e:"Kyselina dusičná je silná, tedy [H₃O⁺] = c = 0,020. pH = −log(2,0·10⁻²) = 2 − 0,30 = <b>1,70</b>. Žádná odmocnina ani disociační konstanta se tu nepoužívá."},
 {t:"num",q:"Jaké je pH roztoku Ca(OH)₂ o koncentraci 0,0050 mol·dm⁻³? (Na dvě desetinná místa.)",
  ans:12.00,tol:0.05,unit:"pH",
  e:"Hydroxid vápenatý dává <b>dva</b> OH⁻: [OH⁻] = 2 · 0,0050 = 0,010 mol·dm⁻³ → pOH = 2,00 → pH = <b>12,00</b>. Bez dvojky by vyšlo 11,70 — rozdíl je přesně log 2."},
 {t:"single",q:"Jaké pH má roztok HCl o koncentraci 1,0·10⁻⁸ mol·dm⁻³?",
  o:["8,00 — dosadíme do pH = −log c","7,00 — kyselina je tak zředěná, že se neprojeví","6,98 — je nutné započítat H₃O⁺ z autoprotolýzy vody","6,00 — kyselina posune pH o dvě jednotky"],c:2,
  e:"Naivní výpočet dá pH 8, což by znamenalo zásaditý roztok kyseliny — nesmysl. Voda sama dodává 10⁻⁷ mol·dm⁻³ H₃O⁺, takže se řeší x² − c·x − K<sub>w</sub> = 0 a vyjde [H₃O⁺] = 1,05·10⁻⁷, tedy pH <b>6,98</b>. Přesně sedm to není — kyselina tam přece jen je."},
 {t:"num",q:"Smícháme 30,0 mL HCl (0,100 mol·dm⁻³) a 20,0 mL NaOH (0,100 mol·dm⁻³). Jaké je pH výsledného roztoku? (Na dvě desetinná místa.)",
  ans:1.70,tol:0.05,unit:"pH",
  e:"n(H₃O⁺) = 3,00 mmol, n(OH⁻) = 2,00 mmol, nadbytek 1,00 mmol kyseliny. Objem je <b>50,0 mL</b>, takže [H₃O⁺] = 1,00/50,0 = 0,0200 mol·dm⁻³ a pH = <b>1,70</b>. Dělení jen 30 mL by dalo chybných 1,48."},
 {t:"single",q:"Proč má 0,010 M roztok H₂SO₄ pH 1,84, a ne 1,70 ani 2,00?",
  o:["Protože kyselina sírová není silná","Protože první stupeň je úplný, ale druhý (Ka₂ = 1,2·10⁻²) proběhne jen částečně","Protože se projeví autoprotolýza vody","Protože síranové anionty hydrolyzují"],c:1,
  e:"pH 1,70 by odpovídalo úplné disociaci obou stupňů ([H₃O⁺] = 2c), pH 2,00 jen prvnímu. Skutečnost leží mezi: druhý stupeň proběhne asi ze 45 %, takže [H₃O⁺] = 0,0145 a pH = 1,84. Sírany v tak kyselém prostředí nehydrolyzují."},
 {t:"multi",q:"Které z uvedených látek jsou <b>silné</b> elektrolyty (v prvním disociačním stupni)?",
  o:["HClO₄","CH₃COOH","Ba(OH)₂","NH₃","HI"],c:[0,2,4],
  e:"Silné kyseliny jsou HCl, HBr, HI, HNO₃, HClO₄ a H₂SO₄ (1. stupeň); silné zásady hydroxidy alkalických kovů a kovů alkalických zemin. Kyselina octová (Ka = 1,75·10⁻⁵) a amoniak (Kb = 1,78·10⁻⁵) jsou naopak učebnicové slabé elektrolyty."}
];

BANK.q2=[
 {t:"num",q:"Jaké je pH roztoku kyseliny octové o koncentraci 0,050 mol·dm⁻³? p<span class='q'>K</span><sub>a</sub> = 4,76. (Na dvě desetinná místa.)",
  ans:3.03,tol:0.05,unit:"pH",
  e:"pH = ½(p<span class='q'>K</span><sub>a</sub> − log c) = ½(4,76 + 1,30) = <b>3,03</b>. Přes odmocninu: √(1,75·10⁻⁵ · 0,050) = 9,35·10⁻⁴ → pH 3,03. Kdo dosadí [H₃O⁺] = c, dostane 1,30 — o 1,7 jednotky vedle."},
 {t:"num",q:"Jaké je pH roztoku kyseliny mravenčí o koncentraci 0,10 mol·dm⁻³? <span class='q'>K</span><sub>a</sub> = 1,8·10⁻⁴. (Na dvě desetinná místa, stačí aproximace.)",
  ans:2.37,tol:0.06,unit:"pH",
  e:"[H₃O⁺] = √(1,8·10⁻⁴ · 0,10) = 4,24·10⁻³ → pH = <b>2,37</b>. Přesné řešení kvadratické rovnice dá 2,38, protože x/c je 4,2 % — těsně pod hranicí, takže aproximace ještě platí."},
 {t:"single",q:"Odkud se bere vzorec [H₃O⁺] = √(<span class='q'>K</span><sub>a</sub>·<span class='q'>c</span>)?",
  o:["Z definice pH","Z Ostwaldova zákona pro α = 1","Z rovnice <span class='q'>K</span><sub>a</sub> = x²/(c − x) po zanedbání x proti c","Z iontového součinu vody"],c:2,
  e:"ICE tabulka dá <span class='q'>K</span><sub>a</sub> = x²/(c − x). Je-li disociace malá, je c − x ≈ c a odtud x = √(K<sub>a</sub>c). Zanedbání ovšem platí jen tehdy, když je x/c pod 5 % — jinak se musí řešit kvadratická rovnice."},
 {t:"num",q:"Jaký je stupeň disociace kyseliny octové (<span class='q'>K</span><sub>a</sub> = 1,75·10⁻⁵) v roztoku o koncentraci 0,10 mol·dm⁻³? (Zadejte v procentech.)",
  ans:1.3,tol:0.2,unit:"%",
  e:"α = √(K<sub>a</sub>/c) = √(1,75·10⁻⁴) = 0,0132, tedy <b>1,3 %</b>. Disociováno je jen zhruba každé sedmdesáté molekulové uskupení — proto je aproximace v pořádku a proto má ocet pH skoro 3, ne 1."},
 {t:"single",q:"U kterého roztoku 5% pravidlo <b>selže</b> a je nutné řešit kvadratickou rovnici?",
  o:["0,10 M CH₃COOH (<span class='q'>K</span><sub>a</sub> = 1,75·10⁻⁵)","0,010 M HF (<span class='q'>K</span><sub>a</sub> = 6,3·10⁻⁴)","0,10 M HCN (<span class='q'>K</span><sub>a</sub> = 6,2·10⁻¹⁰)","1,0 M CH₃COOH"],c:1,
  e:"Rozhoduje poměr c/K<sub>a</sub>: musí být větší než 400. U HF je 0,010/6,3·10⁻⁴ = 16, takže disociace dosahuje 22 % a aproximace selhává (pH 2,66 místo 2,60). U ostatních je poměr v řádu tisíců až miliard."},
 {t:"num",q:"Jaké je pH roztoku amoniaku o koncentraci 0,050 mol·dm⁻³? <span class='q'>K</span><sub>b</sub> = 1,78·10⁻⁵. (Na dvě desetinná místa.)",
  ans:10.97,tol:0.06,unit:"pH",
  e:"[OH⁻] = √(1,78·10⁻⁵ · 0,050) = 9,43·10⁻⁴ → pOH = 3,03 → pH = 14 − 3,03 = <b>10,97</b>. Nejčastější chyba je odevzdat 3,03; amoniak je zásada a jeho pH musí být nad 7."}
];

BANK.q3=[
 {t:"num",q:"Jaké je pH roztoku octanu sodného o koncentraci 0,10 mol·dm⁻³? <span class='q'>K</span><sub>a</sub>(CH₃COOH) = 1,75·10⁻⁵. (Na dvě desetinná místa.)",
  ans:8.88,tol:0.06,unit:"pH",
  e:"Hydrolyzuje anion: K<sub>b</sub> = K<sub>w</sub>/K<sub>a</sub> = 5,71·10⁻¹⁰, [OH⁻] = √(5,71·10⁻¹⁰ · 0,10) = 7,56·10⁻⁶, pOH 5,12, pH = <b>8,88</b>. Zkratkou: 7 + ½(4,76 − 1) = 8,88."},
 {t:"num",q:"Jaké je pH roztoku chloridu amonného o koncentraci 0,10 mol·dm⁻³? <span class='q'>K</span><sub>b</sub>(NH₃) = 1,78·10⁻⁵. (Na dvě desetinná místa.)",
  ans:5.13,tol:0.06,unit:"pH",
  e:"Hydrolyzuje kation: K<sub>a</sub> = K<sub>w</sub>/K<sub>b</sub> = 5,62·10⁻¹⁰, [H₃O⁺] = √(5,62·10⁻¹⁰ · 0,10) = 7,50·10⁻⁶, pH = <b>5,13</b>. Je to zrcadlo octanu sodného kolem sedmičky, protože obě mateřské látky mají skoro stejné pK."},
 {t:"single",q:"Který z uvedených roztoků má pH prakticky rovno 7,00?",
  o:["0,1 M KNO₃","0,1 M NaF","0,1 M NH₄Cl","0,1 M Na₂CO₃"],c:0,
  e:"Dusičnan draselný vznikl ze silné kyseliny i silné zásady, takže žádný z jeho iontů s vodou nereaguje. Fluorid a uhličitan reagují zásaditě (8,10 a 11,66), chlorid amonný kysele (5,13)."},
 {t:"num",q:"Jaké je pH roztoku kyanidu sodného o koncentraci 0,050 mol·dm⁻³? <span class='q'>K</span><sub>a</sub>(HCN) = 6,2·10⁻¹⁰. (Na dvě desetinná místa.)",
  ans:10.95,tol:0.06,unit:"pH",
  e:"K<sub>b</sub> = 10⁻¹⁴/6,2·10⁻¹⁰ = 1,61·10⁻⁵, [OH⁻] = √(1,61·10⁻⁵ · 0,050) = 8,98·10⁻⁴, pOH 3,05, pH = <b>10,95</b>. Kyanovodík je velmi slabá kyselina, takže jeho sůl je poměrně silná zásada — proto se s kyanidy nesmí pracovat v kyselém prostředí."},
 {t:"single",q:"Pro výpočet pH roztoku Na₂CO₃ potřebujete konstantu:",
  o:["<span class='q'>K</span><sub>a1</sub> kyseliny uhličité (4,5·10⁻⁷)","součin obou konstant","<span class='q'>K</span><sub>a2</sub>, tedy konstantu hydrogenuhličitanu (4,7·10⁻¹¹)","žádnou, sůl nehydrolyzuje"],c:2,
  e:"Uhličitanový anion je konjugovaná zásada <b>hydrogen</b>uhličitanu, ne kyseliny uhličité. Platí tedy K<sub>b</sub> = K<sub>w</sub>/K<sub>a2</sub> = 2,1·10⁻⁴ a 0,1 M roztok má pH 11,66. S K<sub>a1</sub> by vyšlo chybných 9,68."},
 {t:"multi",q:"Které roztoky solí reagují <b>kysele</b>?",
  o:["NH₄NO₃","CH₃COONa","AlCl₃","CH₃NH₃Cl","NaCl"],c:[0,2,3],
  e:"Kysele reagují soli slabých zásad se silnými kyselinami: amonné a methylamonné soli i hydratované kationty s vysokým nábojem (Al³⁺, Fe³⁺). Octan sodný je zásaditý (8,88) a chlorid sodný neutrální."}
];

BANK.q4=[
 {t:"num",q:"Vypočítejte pH pufru, který obsahuje 0,10 mol·dm⁻³ CH₃COOH a 0,20 mol·dm⁻³ CH₃COONa. p<span class='q'>K</span><sub>a</sub> = 4,76. (Na dvě desetinná místa.)",
  ans:5.06,tol:0.05,unit:"pH",
  e:"pH = pK<sub>a</sub> + log([A⁻]/[HA]) = 4,76 + log 2 = 4,76 + 0,30 = <b>5,06</b>. Víc zásadité složky znamená vyšší pH; prohozený zlomek by dal 4,46."},
 {t:"num",q:"Vypočítejte pH pufru s 0,20 mol·dm⁻³ NH₄Cl a 0,10 mol·dm⁻³ NH₃. p<span class='q'>K</span><sub>a</sub>(NH₄⁺) = 9,25. (Na dvě desetinná místa.)",
  ans:8.95,tol:0.05,unit:"pH",
  e:"Zásaditá složka je NH₃, kyselá NH₄⁺: pH = 9,25 + log(0,10/0,20) = 9,25 − 0,30 = <b>8,95</b>. Pozor, do čitatele patří vždy zásada — obrácený poměr by dal 9,55."},
 {t:"single",q:"Co se stane s pH a s kapacitou pufru, když ho zředíme vodou na dvojnásobný objem?",
  o:["pH i kapacita klesnou na polovinu","pH klesne o 0,30, kapacita zůstane","pH i kapacita zůstanou stejné","pH se nezmění, kapacita klesne"],c:3,
  e:"V HH rovnici vystupuje <b>poměr</b> složek, a ten se zředěním nemění — pH tedy zůstává. Klesne však absolutní zásoba obou složek, takže pufr snese menší dávku kyseliny nebo zásady: kapacita se zmenší na polovinu."},
 {t:"num",q:"K 1,0 dm³ pufru s 0,10 mol CH₃COOH a 0,10 mol CH₃COONa přidáme 0,010 mol HCl. Jaké bude nové pH? p<span class='q'>K</span><sub>a</sub> = 4,76. (Na dvě desetinná místa.)",
  ans:4.67,tol:0.05,unit:"pH",
  e:"Přidaný H₃O⁺ přemění octan na kyselinu: n(A⁻) = 0,090, n(HA) = 0,110. pH = 4,76 + log(0,090/0,110) = 4,76 − 0,09 = <b>4,67</b>. V čisté vodě by stejné množství HCl dalo pH 2,00 — pufr změnu stlačil z pěti jednotek na devět setin."},
 {t:"single",q:"Který pufr byste zvolili pro udržení pH 7,4 v laboratorním experimentu?",
  o:["mravenčanový (p<span class='q'>K</span><sub>a</sub> 3,75)","acetátový (4,76)","amoniakální (9,25)","fosfátový H₂PO₄⁻/HPO₄²⁻ (7,20)"],c:3,
  e:"Pufr pracuje spolehlivě v rozsahu pK<sub>a</sub> ± 1, takže pro pH 7,4 je jediný vhodný fosfátový (7,20; poměr 1,6 : 1). Hydrogenuhličitanový pufr krve má sice pK<sub>a</sub> jen 6,1, ale funguje díky tomu, že tělo trvale udržuje poměr 20 : 1 dýcháním."},
 {t:"num",q:"Jaký poměr [A⁻]/[HA] musí mít acetátový pufr (p<span class='q'>K</span><sub>a</sub> = 4,76), aby měl pH 5,00? (Zadejte samotné číslo poměru.)",
  ans:1.74,tol:0.1,unit:"[A⁻]/[HA]",
  e:"log([A⁻]/[HA]) = pH − pK<sub>a</sub> = 0,24, tedy poměr = 10⁰·²⁴ = <b>1,74</b>. Z 0,10 mol kyseliny by se na takový pufr spotřebovalo 0,0635 mol NaOH, tedy 2,54 g."}
];
