/* ============================================================
   T21 · BANKA OTÁZEK — kapitolové mini‑testy
   ============================================================ */

BANK.q0=[
 {t:"single",q:"Co přesně platí o rychlostech v okamžiku, kdy soustava dosáhne chemické rovnováhy?",
  o:["Obě rychlosti klesnou na nulu, reakce se zastaví","Přímá reakce je rychlejší než zpětná, jinak by nic nevzniklo","Rychlost přímé a zpětné reakce je stejná a nenulová","Zpětná reakce je rychlejší, proto se produkty přestanou hromadit"],c:2,
  e:"Rovnováha je <b>dynamická</b>: v₁ = v₂, ale obě rychlosti jsou nenulové. Kdyby platila první možnost, nešel by vysvětlit pokus se značeným <sup>131</sup>I, který se z jodu přesune do HI, aniž se změní složení."},
 {t:"single",q:"V otevřené peci s komínem se zahřívá vápenec: <span class='chem'>CaCO₃(s) ⇌ CaO(s) + CO₂(g)</span>. Ustaví se rovnováha?",
  o:["Ano, každá vratná reakce dospěje do rovnováhy","Ano, ale až po velmi dlouhé době","Ne, protože reakce je endotermická","Ne, protože CO₂ odchází — soustava není uzavřená"],c:3,
  e:"Rovnováha se ustaví jen v <b>uzavřené</b> soustavě. Odchází-li CO₂ komínem, je jeho tlak trvale pod rovnovážnou hodnotou, zpětná reakce nemá z čeho běžet a vápenec se rozloží celý. Endotermičnost s tím nesouvisí — jen určuje, že je potřeba topit."},
 {t:"multi",q:"Které podmínky musí být splněny, aby se v soustavě mohla ustavit chemická rovnováha?",
  o:["Soustava je uzavřená (nevyměňuje látku s okolím)","Teplota je stálá","Reakce je exotermická","Výchozí látky jsou ve stechiometrickém poměru","Reakce je vratná"],c:[0,1,4],
  e:"Nutné je vratnost reakce, uzavřenost soustavy a stálá teplota. Tepelné zabarvení nehraje roli a stechiometrický poměr výchozích látek také ne — rovnováha se ustaví z jakéhokoli počátečního složení, jen bude mít jiné hodnoty koncentrací."},
 {t:"single",q:"Co znamená zápis [HI] ve výrazu pro rovnovážnou konstantu?",
  o:["Počáteční koncentraci HI před začátkem reakce","Rovnovážnou koncentraci HI v mol·dm⁻³","Látkové množství HI v molech","Průměrnou koncentraci HI během reakce"],c:1,
  e:"Hranaté závorky jsou vyhrazeny <b>rovnovážným</b> koncentracím. Dosadit počáteční koncentrace (c₀) je nejčastější chyba v celém tématu — ty se do výrazu dostanou až přes ICE tabulku jako c₀ − x."},
 {t:"single",q:"Rovnovážnou směs <span class='chem'>H₂ + I₂ ⇌ 2 HI</span> lze při 448 °C připravit dvěma způsoby: z 1,00 mol·dm⁻³ H₂ a 1,00 mol·dm⁻³ I₂, nebo z 2,00 mol·dm⁻³ čistého HI. Jak dopadne srovnání?",
  o:["Obě směsi budou mít stejné rovnovážné složení","Z čistého HI vznikne méně produktu, protože reakce jde „proti proudu“","Z výchozích látek vznikne vyšší koncentrace HI","Nelze porovnat, jde o různé reakce"],c:0,
  e:"Rovnováha nezávisí na tom, ze které strany k ní dojdeme — obě směsi obsahují stejné atomy ve stejném počtu a skončí na [H₂] = [I₂] = 0,22 a [HI] = 1,56 mol·dm⁻³. Právě tohle je jeden z hlavních důkazů, že jde o rovnovážný stav, ne o „zastavenou“ reakci."},
 {t:"num",q:"Ze směsi 1,00 mol·dm⁻³ <span class='chem'>H₂</span> a 1,00 mol·dm⁻³ <span class='chem'>I₂</span> se v rovnováze ustaví [HI] = 1,20 mol·dm⁻³. Kolik procent vodíku zreagovalo? (Zadejte číslo v procentech.)",
  ans:60,tol:2,unit:"%",
  e:"Ze stechiometrie 1 : 1 : 2 platí, že na 1,20 mol·dm⁻³ HI se spotřebovalo 0,60 mol·dm⁻³ H₂. Stupeň přeměny je 0,60/1,00 = <b>60 %</b>; rovnovážné [H₂] = [I₂] = 0,40 mol·dm⁻³. Pozor na dělení dvěma — bez něj vyjde nesmyslných 120 %."}
];

BANK.q1=[
 {t:"single",q:"Který vztah spojuje rovnovážnou konstantu se standardní reakční Gibbsovou energií?",
  o:["ΔG° = RT ln K","ΔG° = −RT ln K","ΔG° = −RT log K","ΔG° = −K/(RT)"],c:1,
  e:"Platí <b>ΔG° = −RT ln K</b>, tedy K = e<sup>−ΔG°/RT</sup>. Znaménko minus zajišťuje, že záporná ΔG° (samovolná reakce za standardních podmínek) odpovídá K > 1. Logaritmus je přirozený; s dekadickým by musel být faktor 2,303."},
 {t:"single",q:"Reakce má při 298 K hodnotu ΔG° = 0. Co z toho plyne pro K?",
  o:["K = 0","K nelze určit","K = 1","K = e"],c:2,
  e:"Z ΔG° = −RT ln K plyne ln K = 0, tedy <b>K = 1</b>. Reakce má rovnováhu „uprostřed“ — v jakém poměru přesně, závisí na stechiometrii. K = 0 by odpovídalo nekonečně kladné ΔG°."},
 {t:"single",q:"Do rovnovážné soustavy dosadíme aktuální koncentrace a vyjde nám Q = 3,0, zatímco K = 30. Co soustava udělá?",
  o:["Nic, je v rovnováze","Poběží doleva, aby se Q zvětšilo","Poběží doleva, aby se Q zmenšilo","Poběží doprava, protože produktů je zatím málo"],c:3,
  e:"Q &lt; K znamená, že produktů je vzhledem k rovnováze málo — reakce běží <b>doprava</b>, čímž Q roste, dokud nedosáhne K. Hnací síla je ΔG = RT ln(Q/K) = RT ln(0,1) &lt; 0. Doleva by soustava šla při Q &gt; K."},
 {t:"multi",q:"Které výroky o rovnovážné konstantě jsou pravdivé?",
  o:["Závisí pouze na teplotě","Je bezrozměrná, počítá-li se z relativních koncentrací","Závisí na počáteční koncentraci výchozích látek","Mění se přidáním katalyzátoru","Je určena hodnotou ΔG° dané reakce"],c:[0,1,4],
  e:"K závisí jedině na teplotě (přes ΔG° = ΔH° − TΔS°) a je bezrozměrná, protože se dosazují relativní koncentrace [A]/c°. Počáteční koncentrace ani katalyzátor ji nemění — mění jen to, kudy a jak rychle se soustava k rovnováze dostane."},
 {t:"single",q:"Proč se žádná reakce nezastaví přesně v bodě „čisté produkty“, i když je ΔG° silně záporná?",
  o:["Protože entropie míšení prohne křivku G(ξ) dolů a vytvoří minimum uvnitř intervalu","Protože katalyzátor vždy část produktů rozloží","Protože reakce nemá dost energie na dokončení","Protože zpětná reakce má vždy menší aktivační energii"],c:0,
  e:"Smísením látek vzniká entropický zisk, který Gibbsovu energii směsi snižuje nejvíc uprostřed intervalu — proto má křivka G(ξ) <b>minimum</b> a rovnováha nikdy neleží přesně v krajním bodě. Čím zápornější ΔG°, tím blíž je minimum k produktům, ale nikdy v nich."},
 {t:"num",q:"Reakce má při 298 K hodnotu ΔG° = −11,4 kJ·mol⁻¹. Jaká je její rovnovážná konstanta? (Zadejte číslo bez jednotky.)",
  ans:100,tol:10,unit:"",
  e:"K = e<sup>−ΔG°/RT</sup> = e<sup>11400/2479</sup> = e<sup>4,60</sup> ≈ <b>100</b>. Rychlejší cesta: každých 5,7 kJ·mol⁻¹ znamená jeden řád, a 11,4 = 2 × 5,7, tedy dva řády nad K = 1."}
];

BANK.q2=[
 {t:"single",q:"Pro elementární vratnou reakci platí pro rovnovážnou konstantu vztah:",
  o:["K = k₁ / k₋₁","K = k₋₁ / k₁","K = k₁ · k₋₁","K = k₁ − k₋₁"],c:0,
  e:"V rovnováze je v₁ = v₂, tedy k₁[A]<sup>a</sup>[B]<sup>b</sup> = k₋₁[C]<sup>c</sup>[D]<sup>d</sup>. Přeskupením konstant na jednu stranu a koncentrací na druhou vyjde <b>K = k₁/k₋₁</b>. Obrácený podíl by byl konstantou zpětné reakce."},
 {t:"single",q:"Katalyzátor zvýší rychlostní konstantu přímé reakce stokrát. Co se stane s rovnovážnou konstantou?",
  o:["Vzroste stokrát","Klesne stokrát","Nezmění se, protože k₋₁ vzroste také stokrát","Nezmění se, protože katalyzátor na k₋₁ vůbec nepůsobí"],c:2,
  e:"Katalyzátor snižuje aktivační energii, ale <b>oběma směrům stejně</b> — přímá i zpětná reakce jdou přes tentýž aktivovaný komplex. Vzroste tedy i k₋₁ stokrát a podíl K = k₁/k₋₁ zůstane. Poslední možnost má správný závěr, ale špatné zdůvodnění."},
 {t:"single",q:"Pro kterou reakci smíme použít vztah K = k₁/k₋₁ přímo v tomto tvaru?",
  o:["Pro každou vratnou reakci bez výjimky","Pro reakci probíhající jediným elementárním krokem","Pro každou reakci, která má katalyzátor","Pro reakce, u nichž je Δn(g) = 0"],c:1,
  e:"Rychlostní rovnice s exponenty rovnými stechiometrickým koeficientům platí jen pro <b>elementární</b> krok. Výraz pro K se stejnými exponenty ale platí vždy — to nezávisle zaručuje termodynamika. Δn s tím nesouvisí."},
 {t:"multi",q:"Které výroky o zákonu působení hmot jsou pravdivé?",
  o:["Formulovali jej Guldberg a Waage roku 1864","Výraz „působící hmota“ znamená koncentraci","Odvozuje se z rovnosti rychlostí obou směrů v rovnováze","Platí jen pro plynné soustavy"],c:[0,1,2],
  e:"Guldberg a Waage jej publikovali roku 1864 v Kristianii (Oslu); „aktivní/působící hmota“ je starší výraz pro koncentraci a jejich odvození vychází z rovnosti v₁ = v₂. Zákon platí pro plyny i roztoky — omezení na plyny neplatí."},
 {t:"single",q:"Izomerace <span class='chem'>A ⇌ B</span> má k₁ = 6,0·10⁻² s⁻¹ a k₋₁ = 2,0·10⁻² s⁻¹. Kolik procent látky A se přemění, začneme‑li z čisté látky A?",
  o:["50 %","67 %","33 %","75 %"],c:3,
  e:"K = 6,0/2,0 = 3,0 a pro reakci A ⇌ B platí α = K/(1 + K) = 3/4 = <b>75 %</b>. Odpověď 67 % odpovídá K = 2, odpověď 50 % konstantě K = 1. Poměr [B]/[A] je v rovnováze roven právě K, tedy 3 : 1."},
 {t:"num",q:"Elementární reakce má K = 8,0 a rychlostní konstantu přímé reakce k₁ = 4,0·10⁻³ s⁻¹. Jaká je rychlostní konstanta zpětné reakce? (Zadejte v s⁻¹, například 0,0005.)",
  ans:0.0005,tol:0.00005,unit:"s⁻¹",
  e:"Z K = k₁/k₋₁ plyne k₋₁ = k₁/K = 4,0·10⁻³ / 8,0 = <b>5,0·10⁻⁴ s⁻¹</b>. Zpětná reakce je tedy osmkrát pomalejší, což je přesně důvod, proč rovnováha leží na straně produktů."}
];

BANK.q3=[
 {t:"single",q:"Jak zní správný výraz pro <span class='chem'>2 SO₂(g) + O₂(g) ⇌ 2 SO₃(g)</span>?",
  o:["K = 2[SO₃] / (2[SO₂]·[O₂])","K = [SO₃]² / ([SO₂]²·[O₂])","K = ([SO₂]² + [O₂]) / [SO₃]²","K = [SO₃] / ([SO₂]·[O₂])"],c:1,
  e:"Produkty patří do čitatele a stechiometrické koeficienty do <b>exponentů</b>, ne před závorku. Zápis „2[SO₃]“ je nejčastější chyba; sčítání koncentrací je chyba druhá. Kdo vynechá exponenty úplně, dostane jiné číslo o několik řádů."},
 {t:"single",q:"Jak vypadá rovnovážná konstanta pro <span class='chem'>CaCO₃(s) ⇌ CaO(s) + CO₂(g)</span>?",
  o:["K = [CaO]·[CO₂] / [CaCO₃]","K = [CO₂] / [CaCO₃]","K = [CO₂]","K = [CaO]·[CO₂]"],c:2,
  e:"Čisté pevné látky mají konstantní aktivitu rovnou jedné, takže se do výrazu nepíší. Zbývá jediný člen — rovnovážná koncentrace (resp. tlak) CO₂. Proto rovnovážný tlak CO₂ nad vápencem nezávisí na tom, kolik vápence v peci je."},
 {t:"single",q:"Reakce <span class='chem'>N₂ + 3 H₂ ⇌ 2 NH₃</span> má K = 5,6·10⁵. Jaká je konstanta reakce <span class='chem'>2 NH₃ ⇌ N₂ + 3 H₂</span>?",
  o:["1,8·10⁻⁶","−5,6·10⁵","3,1·10¹¹","7,5·10²"],c:0,
  e:"Obrácení reakce dává převrácenou hodnotu: 1/(5,6·10⁵) = <b>1,8·10⁻⁶</b>. Hodnota 3,1·10¹¹ je K², tedy rovnice vynásobená dvěma, a 7,5·10² je √K, tedy rovnice vydělená dvěma. Záporná konstanta neexistuje."},
 {t:"multi",q:"Které látky se <b>nepíší</b> do výrazu pro rovnovážnou konstantu?",
  o:["Pevný CaCO₃ v reakci CaCO₃(s) ⇌ CaO(s) + CO₂(g)","Voda jako rozpouštědlo v reakci NH₃(aq) + H₂O(l) ⇌ NH₄⁺ + OH⁻","Vodní pára v reakci CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)","Sraženina AgCl v reakci AgCl(s) ⇌ Ag⁺ + Cl⁻","Voda vznikající při esterifikaci v bezvodé směsi"],c:[0,1,3],
  e:"Vynechávají se čisté pevné látky a rozpouštědlo, jejichž „koncentrace“ se během reakce nemění. Vodní <b>pára</b> je reagující plyn a voda při esterifikaci vzniká jako produkt v bezvodé směsi — obě se do výrazu píší. Právě záměna těchto dvou případů je klasická past."},
 {t:"single",q:"Pro kterou z reakcí platí K<sub>p</sub> = K<sub>c</sub>?",
  o:["N₂ + 3 H₂ ⇌ 2 NH₃","N₂O₄ ⇌ 2 NO₂","CaCO₃(s) ⇌ CaO(s) + CO₂(g)","CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)"],c:3,
  e:"Obě konstanty se rovnají, právě když Δn(g) = 0. U shift reakce jsou vlevo 2 moly plynu a vpravo také 2. Ostatní tři mají Δn = −2, +1 a +1, takže se liší faktorem (c°RT/p°)<sup>Δn</sup>."},
 {t:"num",q:"Pro <span class='chem'>N₂O₄(g) ⇌ 2 NO₂(g)</span> je při 298 K K<sub>c</sub> = 6,0·10⁻³. Vypočítejte K<sub>p</sub>. (Faktor c°RT/p° = 24,8; zadejte bezrozměrné číslo.)",
  ans:0.149,tol:0.015,unit:"",
  e:"Δn(g) = 2 − 1 = +1, takže K<sub>p</sub> = K<sub>c</sub> · 24,8 = 6,0·10⁻³ · 24,8 = <b>0,149</b>. Kdyby bylo Δn = −1, dělili bychom; při Δn = 0 by se konstanty rovnaly."}
];

BANK.q4=[
 {t:"single",q:"Reakce <span class='chem'>A ⇌ B</span> má K = 100. Jaký je stupeň přeměny látky A?",
  o:["50 %","91 %","99,9 %","99 %"],c:3,
  e:"Pro A ⇌ B platí α = K/(1 + K) = 100/101 = <b>99 %</b>. Hodnota 99,9 % odpovídá K = 1000, hodnota 91 % konstantě K = 10. Pozor: tenhle jednoduchý vztah platí jen tam, kde se nemění počet částic."},
 {t:"single",q:"Přeměna diamantu na grafit má při 25 °C K > 1. Proč diamantové prsteny nezčernají?",
  o:["Protože rovnovážná konstanta neříká nic o rychlosti reakce","Protože K > 1 znamená, že reakce neprobíhá","Protože diamant je termodynamicky stabilnější","Protože rovnováha se ustaví až nad 1000 °C"],c:0,
  e:"K popisuje jen <b>polohu</b> rovnováhy, ne rychlost. Přeměna je termodynamicky výhodná, ale aktivační energie přeskupení celé krystalové mříže je obrovská, takže rychlost je při pokojové teplotě prakticky nulová. Diamant je proto metastabilní, nikoli stabilnější."},
 {t:"single",q:"Chlorid fosforečný disociuje podle <span class='chem'>PCl₅ ⇌ PCl₃ + Cl₂</span>. Jak se změní stupeň disociace, když plyn desetkrát zředíme (K se nemění)?",
  o:["Klesne, protože je méně molekul","Nezmění se, protože K je konstantní","Vzroste, protože Δn(g) je kladné","Nelze rozhodnout bez znalosti teploty"],c:2,
  e:"V čitateli výrazu pro K jsou <b>dvě</b> koncentrace, ve jmenovateli jedna, takže zředění srazí čitatel víc a Q klesne pod K — soustava to dorovná dalším rozkladem. Konkrétně z 18,5 % (1,00 mol·dm⁻³) na 47 % (0,100 mol·dm⁻³). K se přitom opravdu nemění."},
 {t:"multi",q:"Které výroky o výtěžku a stupni přeměny jsou pravdivé?",
  o:["Výtěžek se vztahuje k látce, která je v nedostatku","Stupeň přeměny se vztahuje ke konkrétní výchozí látce","Nadbytek jedné výchozí látky zvyšuje výtěžek počítaný z té druhé","Nadbytek jedné výchozí látky zvyšuje hodnotu K"],c:[0,1,2],
  e:"Nadbytek levnější složky je klasický průmyslový trik: rovnovážná konstanta zůstává stejná, ale vzácnější látka se přemění z větší části. Při esterifikaci s trojnásobkem alkoholu stoupne výtěžek z 66,7 % na 90,3 %, zatímco K je pořád 4."},
 {t:"single",q:"Při řešení ICE tabulky vyjdou z kvadratické rovnice kořeny x₁ = 4,43 a x₂ = 0,903, přičemž počáteční množství limitující látky byl 1,00 mol. Který kořen je správný?",
  o:["Oba, jde o dvě různé rovnováhy","x₂ = 0,903, protože x₁ by dal zápornou koncentraci","x₁ = 4,43, protože je to větší výtěžek","Průměr obou kořenů"],c:1,
  e:"Fyzikální smysl má jen ten kořen, u kterého nevyjde žádná koncentrace záporná. Při x = 4,43 by se spotřebovalo víc než 1,00 mol látky, která tam vůbec nebyla. Kontrola dosazením do K je poslední pojistka."},
 {t:"num",q:"Esterifikace <span class='chem'>CH₃COOH + C₂H₅OH ⇌ ester + H₂O</span> má K = 4,0. Jaký je rovnovážný výtěžek esteru ze směsi 1,00 mol kyseliny a 1,00 mol alkoholu? (Zadejte v procentech.)",
  ans:66.7,tol:2,unit:"%",
  e:"x²/(1 − x)² = 4 je dokonalý čtverec, takže odmocníme: x/(1 − x) = 2, tedy x = 2/3 = 0,667 mol. Výtěžek je <b>66,7 %</b>. S trojnásobkem alkoholu by vyšlo 90,3 %, ale K by zůstalo 4."}
];

BANK.q5=[
 {t:"single",q:"Syntéza amoniaku je exotermická. Jak se změní její rovnovážná konstanta při zvýšení teploty ze 300 na 400 °C?",
  o:["Vzroste, protože rychlost reakce roste","Klesne — u exotermických reakcí K s teplotou klesá","Nezmění se, K závisí jen na tlaku","Vzroste, protože se zvýší srážková frekvence"],c:1,
  e:"Z ln K = −ΔH°/(RT) + ΔS°/R plyne, že u exotermické reakce (ΔH° &lt; 0) K s rostoucí teplotou <b>klesá</b>. Rychlost přitom roste — a právě tenhle rozpor je jádrem Haberova kompromisu. K nezávisí na tlaku vůbec."},
 {t:"single",q:"Rovnovážnou směs <span class='chem'>H₂ + I₂ ⇌ 2 HI</span> stlačíme na poloviční objem. Co se stane?",
  o:["Rovnováha se posune doprava","Rovnováha se posune doleva","K vzroste dvakrát","Rovnováha se neposune, Δn(g) = 0"],c:3,
  e:"Vlevo jsou 2 moly plynu a vpravo také 2, takže Δn(g) = 0. Stlačení zvýší všechny koncentrace stejně, čitatel i jmenovatel Q se změní stejným faktorem a Q zůstane rovno K. A K se tlakem nemění nikdy."},
 {t:"single",q:"Který faktor jako jediný mění hodnotu rovnovážné konstanty?",
  o:["Teplota","Tlak","Katalyzátor","Počáteční koncentrace"],c:0,
  e:"K je určena vztahem ΔG° = −RT ln K, a ΔG° i člen RT závisí na <b>teplotě</b>. Tlak, katalyzátor ani počáteční složení hodnotu K nemění — mohou změnit jen rovnovážné složení (a katalyzátor ani to)."},
 {t:"single",q:"Do reaktoru se směsí <span class='chem'>2 SO₂ + O₂ ⇌ 2 SO₃</span> přidáme argon, přičemž <b>objem zůstane stálý</b>. Co se stane s rovnováhou?",
  o:["Posune se doprava, protože stoupl celkový tlak","Posune se doleva, protože se plyny zředily","Neposune se — parciální tlaky reagujících plynů se nezměnily","Nelze rozhodnout bez znalosti množství argonu"],c:2,
  e:"Za stálého objemu se koncentrace ani parciální tlaky SO₂, O₂ a SO₃ nezmění, takže Q zůstane rovno K. Celkový tlak sice stoupne, ale ten ve výrazu pro K nevystupuje. Za <b>stálého tlaku</b> by to bylo jinak: objem by musel vzrůst a rovnováha by se posunula doleva."},
 {t:"multi",q:"Které zásahy do rovnovážné soustavy <b>nemění</b> hodnotu K?",
  o:["Zvýšení tlaku stlačením","Přidání katalyzátoru","Zvýšení teploty","Přidání dalšího reaktantu","Přidání inertního plynu"],c:[0,1,3,4],
  e:"Hodnotu K mění jedině <b>teplota</b>. Tlak, katalyzátor, přídavek látky i inertní plyn mohou (nebo nemusejí) změnit rovnovážné složení, ale samotnou konstantu nikoli — soustava se vždy vrátí na stejnou hodnotu podílu."},
 {t:"num",q:"Pro <span class='chem'>N₂O₄ ⇌ 2 NO₂</span> je K<sub>p</sub> = 0,148 při 298 K a ΔH° = +57,2 kJ·mol⁻¹. Vypočítejte K<sub>p</sub> při 350 K. (Zadejte bezrozměrné číslo.)",
  ans:4.5,tol:0.5,unit:"",
  e:"ln(K₂/K₁) = −(57 200/8,314)·(1/350 − 1/298) = −6880·(−0,000498) = +3,42, takže K₂ = 0,148·e<sup>3,42</sup> = 0,148·30,6 = <b>4,5</b>. Endotermická reakce, zahřátí → K roste třicetkrát a plyn viditelně zhnědne."}
];

BANK.q6=[
 {t:"single",q:"Jak zní Le Chatelierův princip?",
  o:["Rovnováha se vždy posune doprava, dokud se nespotřebují výchozí látky","Každý zásah do rovnováhy zvýší hodnotu K","Poruší‑li se rovnováha vnějším zásahem, proběhne děj, který účinek zásahu zmenšuje","Soustava v rovnováze na vnější zásahy nereaguje"],c:2,
  e:"Klíčové slovo je <b>zmenšuje</b>, ne „ruší“: po přidání látky jí v nové rovnováze zůstane víc než před zásahem. Princip formuloval Henri Le Chatelier roku 1884 a někdy se mu říká princip akce a reakce."},
 {t:"single",q:"Do pece s rovnováhou <span class='chem'>CaCO₃(s) ⇌ CaO(s) + CO₂(g)</span> přisypeme další vápenec. Co se stane?",
  o:["Nic — pevná látka ve výrazu pro K není","Rovnováha se posune doprava, vznikne víc CO₂","Rovnováha se posune doleva","Vzroste K a s ním i tlak CO₂"],c:0,
  e:"Aktivita čisté pevné látky je rovna jedné bez ohledu na množství, takže Q se nezmění a rovnováha zůstane. Rovnovážný tlak CO₂ nad vápencem závisí <b>jen na teplotě</b>. Přisypáním se změní jen zásoba suroviny."},
 {t:"single",q:"Krev doteče do pracujícího svalu, kde je nízký parciální tlak kyslíku. Kam se posune rovnováha <span class='chem'>Hb + 4 O₂ ⇌ Hb(O₂)₄</span>?",
  o:["Doprava, hemoglobin naváže víc kyslíku","Doleva, kyslík se z hemoglobinu uvolní","Nikam, vazba kyslíku je nevratná","Doprava, protože ve svalu je vyšší teplota"],c:1,
  e:"Nízký p(O₂) znamená úbytek reaktantu, tedy Q &gt; K a posun <b>doleva</b> — kyslík se uvolní tkáním. V plicích je to naopak. Vyšší teplota a nižší pH ve svalu uvolňování ještě podporují (Bohrův efekt)."},
 {t:"multi",q:"Které zásahy zvýší rovnovážný výtěžek amoniaku v reakci <span class='chem'>N₂ + 3 H₂ ⇌ 2 NH₃</span> (ΔH = −92 kJ)?",
  o:["Zvýšení tlaku","Snížení teploty","Průběžný odvod zkapalněného NH₃","Přidání železného katalyzátoru","Přidání argonu za stálého objemu"],c:[0,1,2],
  e:"Δn(g) = −2, takže tlak pomáhá; reakce je exotermická, takže nižší teplota zvyšuje K; odvod produktu drží Q pod K. Katalyzátor mění jen rychlost a inert za stálého objemu nemění vůbec nic — obojí je klasický distraktor."},
 {t:"single",q:"Do rovnovážné směsi přidáme katalyzátor. Které tvrzení je správné?",
  o:["Rovnováha se posune doprava","Vzroste rovnovážný výtěžek","Zvýší se K, protože klesne aktivační energie","Složení se nezmění, rovnováha se jen ustaví rychleji"],c:3,
  e:"Katalyzátor zrychlí přímou i zpětnou reakci stejným násobkem, takže K = k₁/k₋₁ i rovnovážné složení zůstanou. V průmyslu je přesto klíčový: umožňuje pracovat při nižší teplotě, kde je K výhodnější."},
 {t:"num",q:"V rovnováze <span class='chem'>2 SO₂ + O₂ ⇌ 2 SO₃</span> je [SO₂] = 0,20; [O₂] = 0,10; [SO₃] = 0,80 mol·dm⁻³. Skokem zvýšíme [O₂] na 0,20 mol·dm⁻³. Jaká je hodnota Q těsně po zásahu? (Zadejte bezrozměrné číslo.)",
  ans:80,tol:3,unit:"",
  e:"Q = [SO₃]²/([SO₂]²·[O₂]) = 0,64/(0,040·0,20) = <b>80</b>, zatímco K = 0,64/(0,040·0,10) = 160. Q &lt; K, takže se rovnováha posune doprava a přidaný kyslík se zčásti spotřebuje — přesně jak předpovídá Le Chatelierův princip."}
];
