/* ============================================================
   50 · BANKA OTÁZEK — kapitolové mini-testy
   ============================================================ */
BANK.q0=[
 {t:"single",q:"V jakých jednotkách se udává rychlost chemické reakce?",
  o:["mol·dm⁻³·s⁻¹","g·dm⁻³·min⁻¹","mol·s⁻¹","dm³·mol⁻¹·s⁻¹"],c:0,
  e:"Rychlost je změna <b>koncentrace</b> (mol·dm⁻³) za čas (s), tedy mol·dm⁻³·s⁻¹. Nejlákavější chybou je dm³·mol⁻¹·s⁻¹ — to je jednotka rychlostní <em>konstanty</em> reakce druhého řádu, ne rychlosti samotné. Jednotka mol·s⁻¹ by popisovala změnu látkového množství, nikoli koncentrace."},
 {t:"single",q:"Proč se v definici rychlosti dělí změna koncentrace stechiometrickým koeficientem?",
  o:["Aby vyšlo kladné číslo","Aby měla reakce jedinou rychlost bez ohledu na to, přes kterou látku se měří","Aby se výsledek vešel do jednotky mol·dm⁻³·s⁻¹","Protože koncentrace se v čase mění nelineárně"],c:1,
  e:"U reakce <span class='chem'>2 H₂O₂ → 2 H₂O + O₂</span> ubývá peroxid dvakrát rychleji, než vzniká kyslík. Bez dělení koeficientem by jedna reakce měla dvě různé „rychlosti“. Kladné znaménko zajišťuje minus u reaktantu, nikoli dělení koeficientem."},
 {t:"single",q:"Zkumavka s reakcí byla sledována 10 minut. Čím se liší <b>okamžitá</b> rychlost v páté minutě od <b>průměrné</b> rychlosti za celý interval?",
  o:["Okamžitá je vždy větší","Jsou vždy stejné, jen se jinak počítají","Okamžitá odpovídá tečně ke křivce c(t), průměrná sečně mezi dvěma body","Průměrná se týká produktů, okamžitá reaktantů"],c:2,
  e:"Průměrná rychlost je −Δ[A]/Δt, tedy směrnice <b>sečny</b>; okamžitá je limita pro nekonečně krátký interval, tedy směrnice <b>tečny</b>. Shodovaly by se jen tehdy, kdyby byla rychlost konstantní — což platí pouze u reakcí nultého řádu."},
 {t:"num",q:"Při syntéze amoniaku <span class='chem'>N₂ + 3 H₂ → 2 NH₃</span> ubývá vodík rychlostí 0,090 mol·dm⁻³·s⁻¹. Jak rychle vzniká amoniak? (Zadejte v mol·dm⁻³·s⁻¹.)",
  ans:0.060,tol:0.003,unit:"mol·dm⁻³·s⁻¹",
  e:"Rychlost reakce je v = ⅓ · 0,090 = 0,030 mol·dm⁻³·s⁻¹. Amoniak má koeficient 2, takže vzniká rychlostí 2·v = <b>0,060 mol·dm⁻³·s⁻¹</b>. Poměr rychlostí 1 : 3 : 2 přesně odpovídá koeficientům; nejčastější chybou je odpovědět 0,090 nebo 0,030."},
 {t:"multi",q:"Která tvrzení o rychlosti reakce jsou správná?",
  o:["Rychlost reakce se během reakce obvykle zmenšuje","Rychlost reakce je konstantní, pokud se nemění teplota","Počáteční rychlost se měří proto, že jsou v čase nula známé přesné koncentrace","Rychlost vzniku produktu může být číselně jiná než rychlost úbytku reaktantu"],c:[0,2,3],
  e:"Rychlost klesá, protože ubývá reaktantů — proto se měří počáteční rychlost, kdy jsou koncentrace přesně známé. Rychlosti úbytku a přírůstku jednotlivých látek se liší podle koeficientů. Konstantní rychlost při stálé teplotě je nepravdivá: konstantní je <span class='q'>k</span>, nikoli <span class='q'>v</span>."},
 {t:"single",q:"Kterou veličinou <b>nelze</b> prakticky sledovat průběh reakce v čase?",
  o:["Objem uvolněného plynu","Vodivost roztoku","Tlak v uzavřené nádobě","Standardní slučovací enthalpie reaktantu"],c:3,
  e:"Sleduje se jakákoli veličina úměrná koncentraci: objem plynu, tlak, zbarvení, vodivost, otáčení roviny polarizovaného světla. Slučovací enthalpie je <b>tabulková konstanta látky</b> — v průběhu reakce se nijak nemění, takže o kinetice nic neřekne."}
];

BANK.q1=[
 {t:"single",q:"Na čem <b>závisí</b> rychlostní konstanta <span class='q'>k</span>?",
  o:["Na teplotě a na přítomnosti katalyzátoru","Na době, po kterou reakce probíhá","Na tom, kolik látky už zreagovalo","Na koncentraci reaktantů"],c:0,
  e:"Rychlostní konstanta se mění s <b>teplotou</b> (Arrheniova rovnice) a s <b>katalyzátorem</b>, u roztoků i s rozpouštědlem. Na koncentracích nezávisí — ty vystupují v rychlostní rovnici zvlášť. Právě proto se jí říká konstanta: při dané teplotě je pro danou reakci pevné číslo."},
 {t:"single",q:"Rychlostní konstanta má jednotku <span class='mono'>dm³·mol⁻¹·s⁻¹</span>. Jaký je celkový řád reakce?",
  o:["První","Druhý","Třetí","Nultý"],c:1,
  e:"Jednotka <span class='q'>k</span> je obecně (mol·dm⁻³)<sup>1−n</sup>·s⁻¹, takže dm³·mol⁻¹·s⁻¹ odpovídá n = 2. Pro první řád by to bylo s⁻¹, pro třetí dm⁶·mol⁻²·s⁻¹. Z jednotky konstanty poznáte řád bez jediného výpočtu."},
 {t:"single",q:"Reakce má rychlostní rovnici <span class='q'>v</span> = <span class='q'>k</span>[A]²[B]. Co se stane s rychlostí, když zdvojnásobíte koncentraci látky A a koncentraci B necháte být?",
  o:["Vzroste 8×","Nezmění se","Vzroste 4×","Vzroste 2×"],c:2,
  e:"Rychlost je úměrná [A]², takže dvojnásobná koncentrace znamená 2² = <b>4×</b> vyšší rychlost. Osminásobek by nastal při zdvojnásobení obou koncentrací (2²·2¹ = 8), dvojnásobek by odpovídal prvnímu řádu v A."},
 {t:"multi",q:"Které z uvedených situací svědčí o tom, že reakce <b>není elementární</b>?",
  o:["Parciální řád v jednom reaktantu je ½","V rychlostní rovnici chybí jeden z reaktantů celkové rovnice","Rychlostní rovnice obsahuje koncentraci produktu se záporným exponentem","Celkový řád reakce je 2 a v rovnici jsou dva reaktanty s koeficienty 1"],c:[0,1,2],
  e:"Zlomkový řád, chybějící reaktant i záporný exponent u produktu jsou jistými znaky složeného mechanismu — molekularita musí být celé kladné číslo. Poslední možnost s elementárním průběhem naopak <em>souhlasí</em>, ale nedokazuje ho: H₂ + I₂ má právě takovou rychlostní rovnici, a přesto běží přes atomy jodu."},
 {t:"num",q:"Pro reakci s rychlostní rovnicí <span class='q'>v</span> = <span class='q'>k</span>[A][B] byla při [A] = 0,20 a [B] = 0,50 mol·dm⁻³ naměřena rychlost 0,030 mol·dm⁻³·s⁻¹. Vypočítejte <span class='q'>k</span>. (Zadejte v dm³·mol⁻¹·s⁻¹.)",
  ans:0.30,tol:0.02,unit:"dm³·mol⁻¹·s⁻¹",
  e:"k = v / ([A]·[B]) = 0,030 / (0,20 · 0,50) = 0,030 / 0,10 = <b>0,30 dm³·mol⁻¹·s⁻¹</b>. Jednotka plyne z celkového řádu 2. Kontrola: dosazením zpět musí vyjít původní rychlost."},
 {t:"single",q:"Co říká Guldberg–Waageův zákon (zákon působení hmot) v kinetice?",
  o:["Součin koncentrací produktů a reaktantů je v rovnováze konstantní","Rychlost každé reakce je úměrná součinu koncentrací reaktantů umocněných na koeficienty","Rychlost je nepřímo úměrná koncentraci produktů","Rychlost elementární reakce je úměrná součinu koncentrací reaktantů umocněných na jejich stechiometrické koeficienty"],c:3,
  e:"Zásadní je slovo <b>elementární</b>. Pro složené reakce zákon v této podobě neplatí — exponenty se musí změřit. Tvrzení bez slova „elementární“ je právě ta chyba, kvůli které studenti opisují exponenty z rovnice reakce; formulace o stálém součinu koncentrací popisuje rovnovážnou konstantu, tedy jiné téma."}
];

BANK.q2=[
 {t:"single",q:"Poločas reakce prvního řádu je 20 minut. Kolik procent výchozí látky zbude po hodině?",
  o:["12,5 %","25 %","33 %","6,25 %"],c:0,
  e:"Za hodinu uplynou tři poločasy (60/20 = 3), takže zbývá (½)³ = 1/8 = <b>12,5 %</b>. Odpověď 25 % odpovídá dvěma poločasům a 6,25 % čtyřem. Poločas prvního řádu je stálý, nezávisí na tom, kolik látky už ubylo."},
 {t:"single",q:"Vynesli jste naměřená data a přímku dostali až u grafu <b>1/[A] proti času</b>. Jakého řádu je reakce?",
  o:["Prvního","Druhého","Nelze rozhodnout","Nultého"],c:1,
  e:"Integrovaný tvar druhého řádu je 1/[A] = 1/[A]₀ + kt, takže lineární je právě převrácená koncentrace a směrnice je +k. Přímka v grafu [A] vs t by znamenala nultý řád a přímka ln[A] vs t první řád. Tohle je standardní laboratorní postup určení řádu."},
 {t:"single",q:"Které tvrzení o poločasu je správné?",
  o:["Poločas se vždy počítá jako 0,693/k","U reakce druhého řádu se každý další poločas zkracuje","U reakce prvního řádu poločas nezávisí na počáteční koncentraci","U reakce nultého řádu je poločas nepřímo úměrný počáteční koncentraci"],c:2,
  e:"Právě nezávislost na koncentraci je poznávacím znakem prvního řádu (t½ = ln 2/k). U druhého řádu je t½ = 1/(k[A]₀), takže s ubývající koncentrací se poločas <b>prodlužuje</b>; u nultého řádu je t½ = [A]₀/2k, tedy přímo úměrný koncentraci, a s časem se zkracuje."},
 {t:"num",q:"Rozklad N₂O₅ je prvního řádu s <span class='q'>k</span> = 3,38·10⁻⁵ s⁻¹. Vypočítejte poločas reakce v hodinách.",
  ans:5.70,tol:0.15,unit:"h",
  e:"t½ = ln 2 / k = 0,693 / 3,38·10⁻⁵ = 20 500 s. Převod: 20 500 / 3600 = <b>5,70 h</b>. Pozor na to, že reakce má v rovnici koeficient 2, a přesto je <b>prvního</b> řádu — je totiž složená."},
 {t:"single",q:"Proč se odbourávání alkoholu v těle chová jako reakce <b>nultého</b> řádu?",
  o:["Protože se ethanol rozkládá samovolně bez enzymu","Protože reakce probíhá jen v játrech","Protože ethanol je velmi stabilní molekula","Protože enzym alkoholdehydrogenáza je nasycený, takže vyšší koncentrace rychlost nezvýší"],c:3,
  e:"Při nasycení enzymu pracují všechna aktivní místa naplno a další molekuly substrátu musí čekat — rychlost proto na koncentraci nezávisí. Důsledek je lineární pokles hladiny (asi 0,15 ‰ za hodinu) místo exponenciálního, a poločas se s klesající hladinou <b>zkracuje</b>."},
 {t:"multi",q:"Které děje jsou reakcemi (procesy) prvního řádu?",
  o:["Radioaktivní rozpad ¹⁴C","Rozklad N₂O₅ na NO₂ a O₂","Inverze sacharózy v silně zředěném vodném prostředí","Rozklad NH₃ na wolframovém povrchu"],c:[0,1,2],
  e:"Radioaktivní rozpad je učebnicový první řád, stejně jako rozklad N₂O₅; inverze sacharózy je pseudoprvního řádu, protože voda je v obrovském přebytku. Rozklad amoniaku na nasyceném wolframovém povrchu je naopak reakcí <b>nultého</b> řádu."}
];

BANK.q3=[
 {t:"single",q:"Co je reakční mechanismus?",
  o:["Sled elementárních kroků, jejichž součet dává celkovou rovnici","Grafické znázornění závislosti koncentrace na čase","Postup, jak reakci provést v laboratoři","Zápis reakce včetně skupenství a ΔH"],c:0,
  e:"Mechanismus je posloupnost elementárních kroků; jejich sečtením se meziprodukty vykrátí a zbude celková rovnice. Zápis doplněný o skupenství a ΔH je termochemická rovnice; graf závislosti koncentrace na čase je kinetická křivka. Mechanismus lze rychlostní rovnicí vyvrátit, ale nikdy nedokázat."},
 {t:"single",q:"Při následné reakci A → B → C platí <span class='q'>k</span>₁ ≫ <span class='q'>k</span>₂. Jak se bude chovat meziprodukt B?",
  o:["Jeho koncentrace bude po celou dobu zanedbatelná","Rychle se nahromadí a pak pomalu ubývá","Poroste monotónně až do konce reakce","Vůbec nevznikne"],c:1,
  e:"Když je první krok mnohem rychlejší než druhý, meziprodukt vzniká rychleji, než stačí odcházet — nahromadí se a teprve pak pomalu klesá. Zanedbatelná koncentrace (ustálený stav) nastane v opačném případě, tedy když k₂ ≫ k₁. Monotónní růst by znamenal, že B vůbec nereaguje dál."},
 {t:"single",q:"Pro vratnou reakci A ⇌ B platí <span class='q'>k</span>₁ = 0,40 min⁻¹ a <span class='q'>k</span>₋₁ = 0,10 min⁻¹. Jaké bude rovnovážné složení?",
  o:["80 % A a 20 % B","Reakce proběhne úplně, zbude jen B","20 % A a 80 % B","50 % A a 50 % B"],c:2,
  e:"V rovnováze platí k₁[A] = k₋₁[B], tedy [B]/[A] = k₁/k₋₁ = 4 — na jednu část A připadají čtyři části B, tedy <b>20 % a 80 %</b>. Odpověď 80 : 20 má poměr obráceně. Právě tento vztah, K = k₁/k₋₁, je mostem od kinetiky k chemické rovnováze."},
 {t:"multi",q:"Které dvojice pojmů popisují <b>meziprodukt</b> (nikoli aktivovaný komplex)?",
  o:["Leží v údolí energetického profilu","Je to nestabilní stav na vrcholu bariéry","Má úplné vazby a lze jej někdy zachytit","V celkové rovnici se nevyskytuje"],c:[0,2,3],
  e:"Meziprodukt je skutečná částice se skutečnými vazbami (NO₃, atom F, radikál Br·) v <b>údolí</b> mezi dvěma vrcholy; z celkové rovnice se vykrátí. Vrchol bariéry patří aktivovanému komplexu, který žije asi 10⁻¹³ s a izolovat ho nelze."},
 {t:"single",q:"Nitrace toluenu dává současně o‑ i p‑nitrotoluen. O jaký typ reakce jde z hlediska kinetiky?",
  o:["Řetězovou","Následnou","Zpětnou","Bočnou (paralelní)"],c:3,
  e:"Z téhož reaktantu vznikají <b>současně</b> dva různé produkty, takže jde o reakci bočnou; jejich poměr je dán poměrem rychlostních konstant k₁/k₂ a v čase se nemění. U následné reakce by jeden produkt vznikal z druhého, u zpětné by se ustálila rovnováha."},
 {t:"single",q:"Která trojice správně popisuje fáze řetězové reakce?",
  o:["Iniciace – propagace – terminace","Rozpouštění – srážka – oddělení","Aktivace – rovnováha – rozklad","Adsorpce – reakce – desorpce"],c:0,
  e:"Iniciace vytvoří radikály (často působením světla), propagace je opakující se dvojice kroků, v nichž radikál reaguje a vzniká nový, a terminace řetěz ukončí spojením dvou radikálů. Adsorpce–reakce–desorpce je naopak sled kroků <b>heterogenní katalýzy</b>."}
];

BANK.q4=[
 {t:"single",q:"Co udává molekularita elementární reakce?",
  o:["Počet kroků mechanismu","Počet částic, které se v daném kroku musí současně setkat","Součet exponentů v rychlostní rovnici","Počet molů produktů"],c:1,
  e:"Molekularita je počet částic tvořících aktivovaný komplex daného kroku; nabývá hodnot 1, 2 a výjimečně 3. Součet exponentů v rychlostní rovnici je <b>řád</b> — ten se měří a může být i zlomkový nebo nulový, což u molekularity nejde."},
 {t:"single",q:"Proč jsou trimolekulární elementární reakce vzácné?",
  o:["Protože tři částice mají příliš velkou celkovou energii","Protože pro ně neplatí Guldberg–Waageův zákon","Protože pravděpodobnost současné srážky tří částic ve správné orientaci je velmi malá","Protože porušují zákon zachování hmotnosti"],c:2,
  e:"Srážka tří částic naráz je zhruba tisíckrát méně pravděpodobná než srážka dvou, a srážka čtyř se prakticky nepozoruje. Proto rovnice s velkými koeficienty vždy probíhají sledem uni‑ a bimolekulárních kroků. Guldberg–Waageův zákon pro trimolekulární krok naopak platí."},
 {t:"single",q:"Reakce <span class='chem'>2 NO₂ + F₂ → 2 NO₂F</span> má experimentálně <span class='q'>v</span> = <span class='q'>k</span>[NO₂][F₂]. Co z toho plyne?",
  o:["Rychlostní rovnice byla změřena chybně","F₂ je katalyzátor","Reakce je elementární trimolekulární","Reakce je složená a rychlost určuje krok NO₂ + F₂"],c:3,
  e:"Kdyby byla reakce elementární, musela by být podle koeficientů druhého řádu v NO₂ a celkově třetího. Naměřený první řád v NO₂ ukazuje na pomalý krok <span class='chem'>NO₂ + F₂ → NO₂F + F</span>, na který navazuje rychlý krok s atomem fluoru. F₂ se spotřebovává, takže katalyzátorem být nemůže."},
 {t:"single",q:"Který elementární krok je unimolekulární?",
  o:["O₃ → O₂ + O","NO + O₃ → NO₂ + O₂","Cl· + CH₄ → HCl + CH₃·","2 NO₂ → 2 NO + O₂"],c:0,
  e:"Unimolekulární krok znamená, že se rozpadá nebo přesmykuje <b>jediná</b> částice — zde se z ozonu odštěpuje atom kyslíku. Zbylé tři možnosti jsou srážky dvou částic, tedy kroky bimolekulární; jejich rychlostní rovnice jsou druhého řádu."},
 {t:"multi",q:"Která tvrzení o vztahu řádu a molekularity jsou pravdivá?",
  o:["U elementární reakce je řád roven molekularitě","Molekularita se určuje experimentálně z naměřených rychlostí","Řád může být nulový, molekularita nikoli","Zlomkový řád vylučuje, aby byla reakce elementární"],c:[0,2,3],
  e:"Molekularita plyne z <b>mechanismu</b>, nikoli z měření — měří se řád. Zbylá tři tvrzení platí: u elementární reakce se obě čísla shodují, nulová molekularita nedává smysl a zlomkový řád (H₂ + Br₂, 1,5) je jistým důkazem složeného mechanismu."},
 {t:"single",q:"Reakce má dvoukrokový mechanismus, kde první krok má aktivační energii 110 kJ·mol⁻¹ a druhý 45 kJ·mol⁻¹. Který krok určuje rychlost?",
  o:["Druhý, protože je poslední","První, protože má vyšší aktivační energii, a je tedy nejpomalejší","Oba stejně","Nelze rozhodnout bez znalosti ΔH"],c:1,
  e:"Rychlost celé reakce určuje <b>nejpomalejší</b> krok, tedy ten s nejvyšší bariérou — analogie s frontou u pokladny. Rychlostní rovnice celé reakce je pak rychlostní rovnicí tohoto kroku, což je důvod, proč se v ní některé reaktanty vůbec neobjeví."}
];

BANK.q5=[
 {t:"multi",q:"Které podmínky musí splnit srážka, aby byla <b>účinná</b>?",
  o:["Částice se musí srazit","Srážka musí mít energii alespoň rovnou Eₐ","Částice musí být vhodně orientované","Reakce musí být exotermická"],c:[0,1,2],
  e:"Srážková teorie žádá tři podmínky: srážku, dostatečnou energii a správnou orientaci. Tepelné zabarvení reakce mezi ně nepatří — endotermické reakce probíhají také, jen je jejich zpětná bariéra nižší než přímá."},
 {t:"single",q:"Co je aktivovaný komplex?",
  o:["Meziprodukt s úplnými vazbami, který lze izolovat","Sloučenina katalyzátoru s reaktantem","Nestabilní uspořádání atomů na vrcholu energetické bariéry","Molekula s energií vyšší než průměrná"],c:2,
  e:"Aktivovaný komplex (přechodový stav) je stav na vrcholu profilu, kde staré vazby nejsou zcela rozbité a nové zcela vytvořené; existuje asi 10⁻¹³ s a rozpadá se na produkty nebo zpět na reaktanty. Izolovat lze naopak <b>meziprodukt</b>, který leží v údolí mezi dvěma vrcholy."},
 {t:"single",q:"Reakce má <span class='q'>E</span><sub>a</sub>(přímé) = 90 kJ·mol⁻¹ a Δ<span class='q'>H</span> = −50 kJ·mol⁻¹. Jaká je aktivační energie zpětné reakce?",
  o:["50 kJ·mol⁻¹","90 kJ·mol⁻¹","40 kJ·mol⁻¹","140 kJ·mol⁻¹"],c:3,
  e:"Zpětná reakce startuje z produktů, které leží o 50 kJ níž, a musí překonat tentýž vrchol: Eₐ(←) = Eₐ(→) − ΔH = 90 − (−50) = <b>140 kJ·mol⁻¹</b>. Hodnota 40 by vznikla chybným odečtením místo přičtení; u exotermické reakce je zpětná bariéra vždy vyšší."},
 {t:"single",q:"Co se stane s podílem molekul, které mají energii alespoň <span class='q'>E</span><sub>a</sub>, když zvýšíte teplotu?",
  o:["Vzroste exponenciálně podle e^(−Eₐ/RT)","Klesne, protože se rozdělení rozšíří","Vzroste přesně úměrně teplotě v kelvinech","Zůstane stejný, jen se molekuly pohybují rychleji"],c:0,
  e:"Rozhoduje Boltzmannův faktor e<sup>−Eₐ/RT</sup>: pro Eₐ = 50 kJ·mol⁻¹ vzroste podíl při ohřátí z 300 na 310 K z 2,0·10⁻⁹ na 3,8·10⁻⁹, tedy skoro dvojnásobně. Průměrná rychlost molekul přitom vzroste jen o necelá dvě procenta — rozhoduje ocas rozdělení, ne průměr."},
 {t:"single",q:"K čemu slouží sterický (orientační) faktor <span class='q'>P</span> ve srážkové teorii?",
  o:["Určuje výšku aktivační energie","Vyjadřuje podíl srážek se správnou vzájemnou orientací částic","Udává, kolikrát za sekundu se částice srazí","Popisuje vliv tlaku na rychlost"],c:1,
  e:"Faktor <span class='q'>P</span> vyjadřuje, že ani energeticky dostatečná srážka nemusí vést k reakci, pokud molekuly narazí „špatnou stranou“. U velkých molekul s jediným reaktivním místem klesá na 10⁻³ i níž — a právě jeho zvýšením (přesným natočením substrátu) jsou tak účinné enzymy."},
 {t:"single",q:"Které tvrzení o vztahu <span class='q'>E</span><sub>a</sub> a Δ<span class='q'>H</span> platí?",
  o:["Eₐ je vždy větší než |ΔH|","Silně exotermická reakce má vždy malou Eₐ","Eₐ a ΔH jsou nezávislé veličiny; Eₐ rozhoduje o rychlosti, ΔH o tepelném zabarvení","Eₐ je rovna ΔH u exotermických reakcí"],c:2,
  e:"Spalování diamantu je silně exotermické (ΔH° ≈ −395 kJ·mol⁻¹) a přesto při pokojové teplotě neběží — má obrovskou aktivační energii. U endotermické reakce musí být Eₐ(→) sice alespoň rovna ΔH, ale u exotermických žádné takové omezení není."}
];

BANK.q6=[
 {t:"single",q:"Který zápis Arrheniovy rovnice je správný?",
  o:["k = A·Eₐ/(RT)","k = A − Eₐ/(RT)","k = A·e^(Eₐ/RT)","k = A·e^(−Eₐ/RT)"],c:3,
  e:"Exponent musí být <b>záporný</b>: čím vyšší bariéra, tím menší k. Kladný exponent by znamenal, že reakce s velkou aktivační energií jsou nejrychlejší, což je nesmysl. Tvar s pouhým odčítáním bez exponenciály je zaměněn s logaritmickým zápisem ln k = ln A − Eₐ/(RT)."},
 {t:"single",q:"V Arrheniově grafu (ln <span class='q'>k</span> proti 1/<span class='q'>T</span>) vyjde přímka. Co udává její směrnice?",
  o:["−Eₐ/R","Eₐ·R","−R/Eₐ","ln A"],c:0,
  e:"Ze vztahu ln k = ln A − (Eₐ/R)·(1/T) je zřejmé, že směrnice je <b>−Eₐ/R</b> a úsek na svislé ose ln A. Pro Eₐ = 50 kJ·mol⁻¹ vyjde směrnice −6014 K; čím strmější přímka, tím vyšší aktivační energie."},
 {t:"num",q:"Rychlostní konstanta vzroste při ohřátí z 25 °C na 50 °C osmkrát. Vypočítejte aktivační energii. (Zadejte v kJ·mol⁻¹.)",
  ans:66.6,tol:2,unit:"kJ·mol⁻¹",
  e:"Eₐ = R·ln(k₂/k₁)/(1/T₁ − 1/T₂) = 8,314 · ln 8 / (1/298,15 − 1/323,15) = 8,314 · 2,079 / 2,594·10⁻⁴ = 66 600 J·mol⁻¹ = <b>66,6 kJ·mol⁻¹</b>. Nejčastější chyby: teploty ve °C nebo zapomenutý převod výsledku z J na kJ."},
 {t:"single",q:"Van 't Hoffovo pravidlo „+10 °C ≈ 2×“ platí přesně pro reakce s aktivační energií kolem…",
  o:["5 kJ·mol⁻¹","53 kJ·mol⁻¹","150 kJ·mol⁻¹","300 kJ·mol⁻¹"],c:1,
  e:"Dosazením do dvoubodového tvaru pro 298 a 308 K a poměr 2 vyjde Eₐ ≈ 53 kJ·mol⁻¹ — typická hodnota organických reakcí, proto pravidlo tak často sedí. Trojnásobku odpovídá zhruba 84 a čtyřnásobku 106 kJ·mol⁻¹; reakce s Eₐ = 150 by zrychlila asi sedmkrát."},
 {t:"multi",q:"Které chyby vedou k nesprávnému výsledku při použití Arrheniovy rovnice?",
  o:["Dosazení Eₐ v kJ·mol⁻¹ při R = 8,314 J·K⁻¹·mol⁻¹","Dosazení teploty ve stupních Celsia","Použití dekadického logaritmu místo přirozeného bez opravy","Dosazení teplot v kelvinech"],c:[0,1,2],
  e:"Jednotky Eₐ musí být J·mol⁻¹, aby se vykrátily s R, teplota musí být v kelvinech a logaritmus přirozený (s log je nutné dělit 2,303·R). Dosazení v kelvinech je naopak jediný správný postup ze všech uvedených."},
 {t:"single",q:"Proč potraviny v lednici (5 °C) vydrží mnohem déle než na stole (25 °C)?",
  o:["V chladu se mění mechanismus reakcí","Chlad zastaví reakce úplně, protože klesne Eₐ pod nulu","Nižší teplota sníží podíl molekul s energií ≥ Eₐ, takže rychlostní konstanta klesne asi čtyřikrát","Nižší teplota sníží koncentraci reaktantů"],c:2,
  e:"Ochlazení o 20 °C znamená u typické Eₐ zpomalení zhruba 2² = 4×. Aktivační energie se teplotou nemění — mění se jen podíl dostatečně energetických srážek. Koncentrace ani mechanismus s teplotou nesouvisejí; u enzymatických dějů se navíc uplatní i pokles aktivity enzymů."}
];

BANK.q7=[
 {t:"single",q:"Jak katalyzátor zrychluje reakci?",
  o:["Posouvá rovnováhu ve prospěch produktů","Dodává reagujícím částicím energii","Zvyšuje počet srážek za sekundu","Umožňuje reakci jinou cestou s nižší aktivační energií"],c:3,
  e:"Katalyzátor otevře nový mechanismus s nižší bariérou — typicky přes meziprodukt, který se v dalším kroku rozpadne a katalyzátor uvolní. Energii nedodává a rovnováhu nemění; urychlí přímou i zpětnou reakci stejným násobkem, takže K zůstává."},
 {t:"multi",q:"Co katalyzátor <b>nemění</b>?",
  o:["Reakční enthalpii ΔH","Rovnovážnou konstantu K","Aktivační energii","Rovnovážný výtěžek produktu"],c:[0,1,3],
  e:"Katalyzátor mění jedinou z uvedených veličin — <b>aktivační energii</b> (a s ní rychlostní konstantu). Hladiny reaktantů a produktů, a tedy ΔH i ΔG, zůstávají; proto se nemění ani K a rovnovážný výtěžek. Železo v Haberově procesu dá amoniak rychleji, nikoli víc."},
 {t:"single",q:"Rozklad H₂O₂ katalyzovaný jodidem probíhá kroky <span class='chem'>H₂O₂ + I⁻ → H₂O + IO⁻</span> a <span class='chem'>IO⁻ + H₂O₂ → H₂O + O₂ + I⁻</span>. O jaký typ katalýzy jde a jakou roli má IO⁻?",
  o:["Homogenní katalýza; IO⁻ je meziprodukt","Heterogenní katalýza; IO⁻ je katalyzátor","Enzymová katalýza; IO⁻ je aktivované centrum","Autokatalýza; IO⁻ je produkt reakce"],c:0,
  e:"Jodid je rozpuštěný ve stejné fázi jako peroxid, jde tedy o katalýzu <b>homogenní</b>. Katalyzátorem je I⁻ (spotřebuje se v prvním kroku a v druhém se regeneruje), zatímco IO⁻ je meziprodukt. Autokatalýza by znamenala, že katalyzátorem je produkt reakce, tedy voda nebo kyslík."},
 {t:"single",q:"Ve kterém pořadí probíhají kroky heterogenní katalýzy?",
  o:["Iniciace – propagace – terminace","Adsorpce – reakce na povrchu – desorpce","Desorpce – reakce – adsorpce","Reakce – adsorpce – desorpce"],c:1,
  e:"Reaktanty se nejprve naváží na aktivní centra (vodík se přitom na niklu štěpí na atomy), pak proběhne reakce na povrchu a nakonec se produkt uvolní, čímž se centra uvolní pro další molekuly. Iniciace–propagace–terminace jsou naopak fáze řetězové reakce."},
 {t:"single",q:"Proč je manganometrická titrace oxalátu příkladem <b>autokatalýzy</b>?",
  o:["Protože reakce probíhá v kyselém prostředí","Protože se musí titrovat za tepla","Protože vznikající ionty Mn²⁺ reakci katalyzují, takže se postupně zrychluje","Protože manganistan je zároveň oxidační činidlo i indikátor"],c:2,
  e:"První kapky manganistanu se odbarvují pomalu, ale jakmile vzniknou ionty Mn²⁺, další kapky mizí okamžitě — katalyzátorem je <b>produkt</b> reakce. Zahřívání i kyselé prostředí reakci sice také pomáhají, ale autokatalýzou nejsou; roli indikátoru má vlastní zbarvení MnO₄⁻."},
 {t:"single",q:"Čím se inhibitor liší od katalyzátoru?",
  o:["Zvyšuje ΔH reakce, takže je reakce méně výhodná","Posouvá rovnováhu k reaktantům","Snižuje teplotu reakční směsi","Snižuje rychlost reakce; blokuje aktivní centra nebo zachytává radikály"],c:3,
  e:"Inhibitor (negativní katalýza) blokuje aktivní centra katalyzátoru — katalytické jedy Pb, S, CO — nebo zachytává reaktivní radikály a přerušuje řetěz, jako antioxidanty v potravinách. ΔH ani polohu rovnováhy neovlivňuje; na rozdíl od katalyzátoru se často spotřebovává."}
];

BANK.q8=[
 {t:"single",q:"Reakce probíhá ve vodném roztoku. Co udělá zdvojnásobení vnějšího tlaku?",
  o:["Rychlost se prakticky nezmění","Reakci zastaví","Zdvojnásobí rychlost","Zčtyřnásobí rychlost"],c:0,
  e:"Kapaliny jsou prakticky nestlačitelné, takže se koncentrace nezmění a rychlost zůstává stejná. Tlak je faktorem <b>jen u reakcí s plyny</b>, kde je vlastně jinak vyjádřenou koncentrací (p = c·R·T). Tohle je oblíbený chyták u maturity."},
 {t:"single",q:"Do nádoby se směsí plynných reaktantů přidáte za <b>stálého objemu</b> argon. Co se stane s rychlostí reakce?",
  o:["Vzroste, protože vzroste celkový tlak","Nezmění se, protože koncentrace reaktantů zůstaly stejné","Klesne, protože argon reaktanty naředí","Vzroste, protože argon zvýší počet srážek"],c:1,
  e:"Rozhoduje koncentrace <b>reaktantů</b> v mol·dm⁻³ — objem i počet jejich molekul zůstaly stejné, takže se nic nezměnilo. Argon se sice srážek účastní, ale nereaguje. Kdyby se naopak přidal argon za stálého <em>tlaku</em>, objem by vzrostl, koncentrace klesly a reakce by se zpomalila."},
 {t:"num",q:"Krychli o hraně 1 cm rozřežeme na krychličky o hraně 1 mm. Jaký bude celkový povrch všech krychliček? (Zadejte v cm².)",
  ans:60,tol:2,unit:"cm²",
  e:"Na hranu se vejde 10 krychliček, celkem tedy 10³ = 1000 kusů; každá má povrch 6 · (0,1)² = 0,06 cm², dohromady 1000 · 0,06 = <b>60 cm²</b>. Původní krychle měla 6 cm², povrch tedy vzrostl desetkrát, zatímco objem zůstal 1 cm³."},
 {t:"single",q:"Plynná reakce má rychlostní rovnici <span class='q'>v</span> = <span class='q'>k</span>[NO]²[O₂]. Směs stlačíte na poloviční objem. Kolikrát vzroste rychlost?",
  o:["2×","4×","8×","16×"],c:2,
  e:"Poloviční objem znamená dvojnásobnou koncentraci všech plynů: v′/v = 2² · 2¹ = <b>8×</b>. Odpověď 4× by platila pro celkový řád 2 a 16× pro řád 4. Obecně je nárůst 2<sup>celkový řád</sup>."},
 {t:"multi",q:"Které zásahy rychlost reakce <b>zvýší</b>?",
  o:["Rozemletí pevného reaktantu na prášek","Zahřátí směsi o 20 °C","Přidání antioxidantu do reakce probíhající přes radikály","Přidání katalyzátoru"],c:[0,1,3],
  e:"Rozemletí zvětší povrch u heterogenní reakce, zahřátí zvýší podíl molekul s E ≥ Eₐ a katalyzátor sníží aktivační energii. Antioxidant je naopak <b>inhibitor</b>: zachytí radikál a přeruší řetězovou reakci — proto brání žluknutí tuků."},
 {t:"single",q:"Proč je moučný nebo uhelný prach ve mlýnech a dolech výbušný, zatímco pytel mouky nebo kus uhlí hoří pomalu?",
  o:["Prach obsahuje více kyslíku","Prach má jiné chemické složení","Prach má nižší aktivační energii hoření","Prach má nesrovnatelně větší povrch, takže reakce s kyslíkem probíhá na obrovské ploše naráz"],c:3,
  e:"Rozmělněním na částice o velikosti mikrometru vzroste povrch jedné krychle o hraně 1 cm ze 6 cm² na 60 000 cm², tedy 6 m². Chemické složení ani aktivační energie se přitom nemění — mění se jen plocha rozhraní, na které reakce probíhá."}
];
