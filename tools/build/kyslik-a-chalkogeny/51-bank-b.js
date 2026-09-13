/* ============================================================
   25 · BANKA OTÁZEK — kapitolové mini-testy (k5 až k8)
   ============================================================ */
BANK.q5=[
 {t:"single",q:"Proč vře voda při 100 °C, zatímco sulfan už při −60,3 °C, ačkoli má vyšší molární hmotnost?",
  o:["Voda má silné vodíkové vazby, sulfan je prakticky nemá","Sulfan je nepolární molekula","Voda má vyšší molární hmotnost","Sulfan je lineární, voda lomená"],c:0,
  e:"Síra už není dost elektronegativní a její volné páry jsou příliš rozprostřené, aby udržely vodík sousední molekuly. Řada H₂S – H₂Se – H₂Te leží skoro na přímce podle molární hmotnosti; voda z ní vyskočí o víc než 160 °C. Obě molekuly jsou přitom lomené i polární."},
 {t:"single",q:"Které sulfidy jsou <b>ve vodě rozpustné</b>?",
  o:["Sulfidy všech dvojmocných kovů","Sulfidy alkalických kovů a amonný","Sulfidy těžkých kovů","Žádný sulfid není rozpustný"],c:1,
  e:"Rozpustné jsou pouze sulfidy alkalických kovů a amonný; sulfidy kovů alkalických zemin přecházejí do roztoku hydrolýzou. Všechny ostatní se srážejí, a protože mají charakteristické barvy, staly se základem klasického analytického dělení kationtů."},
 {t:"single",q:"Jakou barvu má sraženina <span class=\"chem\">CdS</span>?",
  o:["Bílá","Černá","Žlutá","Tělově růžová"],c:2,
  e:"Sulfid kademnatý je sytě žlutý — proto se mu jako pigmentu říká kadmiová žluť. Bílý je ZnS, tělově růžový MnS a černé jsou sulfidy olova, mědi, stříbra, rtuti, železa, niklu a kobaltu. Barva sraženiny bývala v analytice první vodítko."},
 {t:"single",q:"Proč <span class=\"chem\">SF₆</span> nehydrolyzuje, ale <span class=\"chem\">SF₄</span> ano?",
  o:["SF₆ má nižší oxidační číslo síry","Hydrolýza SF₆ by byla energeticky nevýhodná","SF₆ je nepolární, SF₄ polární","SF₆ nemá volný elektronový pár ani volné místo, kudy by voda mohla zaútočit; SF₄ jeden volný pár má"],c:3,
  e:"Hydrolýza SF₆ by energii dokonce uvolnila — je tedy termodynamicky výhodná, ale nemá cestu, po které by proběhla. Šest fluorů síru dokonale zastíní. SF₄ má tvar houpačky a jeden volný pár, který je pro molekulu vody otevřenou branou: SF₄ + 2 H₂O → SO₂ + 4 HF."},
 {t:"multi",q:"Která tvrzení o&nbsp;sulfanu jsou správná? Vyberte všechny správné možnosti.",
  o:["Je to výhradně redukční činidlo","Ve vodě je slabá dvojsytná kyselina","Nad zhruba 150 ppm ochromí čichový nerv","Je méně jedovatý než oxid uhličitý"],c:[0,1,2],
  e:"Síra má v sulfanu −II, tedy nejnižší možné číslo, a proto může jen elektrony odevzdávat. pK₁ je 7,0, což je slabá kyselina. Ochromení čichu je jeho nejzrádnější vlastnost. Toxicitou je sulfan srovnatelný s kyanovodíkem — mnohem jedovatější než oxid uhličitý."},
 {t:"single",q:"Jaké oxidační číslo má síra v&nbsp;pyritu <span class=\"chem\">FeS₂</span>?",
  o:["−II","−I","+II","+IV"],c:1,
  e:"Pyrit obsahuje disulfidový anion S₂²⁻ s vazbou S–S, takže železo má +II a každá síra −I. Kdo dosadí S = −II, dostane Fe = +IV, což u železa v pyritu neexistuje. Přítomnost vazby chalkogen–chalkogen je typickým důvodem „mezi‑čísel“."}
];

BANK.q6=[
 {t:"single",q:"Proč se v&nbsp;kontaktním procesu pracuje při 400 až 450 °C, a&nbsp;ne při nižší teplotě?",
  o:["Při nižší teplotě by rovnováha byla nepříznivá","Nižší teplota by zničila katalyzátor","Vanadičný katalyzátor se aktivuje až kolem 400 °C a při nižší teplotě by reakce prakticky neběžela","Při nižší teplotě by SO₃ zkapalnil"],c:2,
  e:"Reakce je exotermická, takže nižší teplota by rovnováze naopak <b>prospěla</b> — to je ta past. Jenže bez dostatečné teploty katalyzátor nepracuje a reakce by trvala nesmyslně dlouho. Volí se proto nejnižší teplota, při které je rychlost ještě přijatelná. Katalyzátor se ničí až nad 600 °C."},
 {t:"single",q:"Proč se vzniklý <span class=\"chem\">SO₃</span> nepouští v&nbsp;továrně přímo do vody?",
  o:["Reakce by byla příliš pomalá","Vznikla by nezachytitelná mlha kyseliny sírové","SO₃ s vodou nereaguje","Vznikla by kyselina siřičitá místo sírové"],c:1,
  e:"Reakce SO₃ + H₂O → H₂SO₄ je tak prudká a exotermická, že vzniká jemný aerosol, který nelze zkondenzovat a odešel by komínem. Proto se SO₃ absorbuje do 98% kyseliny na oleum H₂S₂O₇ a to se teprve řízeně zředí vodou."},
 {t:"single",q:"Který zásah <b>neposune</b> rovnováhu reakce <span class=\"chem\">2 SO₂ + O₂ ⇌ 2 SO₃</span>?",
  o:["Přidání katalyzátoru V₂O₅","Zvýšení tlaku","Odebrání SO₃ z reakční směsi","Přidání přebytku vzduchu"],c:0,
  e:"Katalyzátor urychlí stejnou měrou reakci tam i zpět, takže rovnováhu neposune vůbec — jen zkrátí dobu, za kterou se ustaví. Tlak pomůže (3 mol → 2 mol), odebrání produktu a přebytek kyslíku také. Bez katalyzátoru by ale reakce při provozní teplotě neběžela."},
 {t:"single",q:"Jak působí <span class=\"chem\">SO₂</span> při bělení slámy a&nbsp;vlny?",
  o:["Oxiduje barvivo, změna je trvalá","Rozpouští barvivo","Redukuje barvivo, a proto je bělení vratné","Vytvoří na vláknu bílý povlak"],c:2,
  e:"Oxid siřičitý bělí redukcí: barvivo převede na bezbarvou redukovanou formu, kterou vzdušný kyslík časem zase zoxiduje zpět. Proto síření slámy postupně „vyprchá“. Chlor a peroxid naopak bělí oxidací a barvivo nevratně rozloží — na jemná vlákna by ale byly příliš agresivní."},
 {t:"multi",q:"Které kroky vedou k&nbsp;<b>vyšší konverzi</b> SO₂ na SO₃ a&nbsp;zároveň se v&nbsp;praxi používají? Vyberte všechny správné možnosti.",
  o:["Přebytek vzduchu v nástřiku","Dvojitá absorpce (odebrání SO₃ mezi vrstvami katalyzátoru)","Tlak 20 barů","Odvod reakčního tepla mezi vrstvami katalyzátoru"],c:[0,1,3],
  e:"Přebytek kyslíku je nejlevnější zásah, dvojitá absorpce zvedne konverzi z 98 % na 99,5 % a mezichlazení udrží každou vrstvu blízko optimální teploty. Tlak by rovnováze pomohl také, ale zisk by byl při už tak vysoké konverzi zanedbatelný a investice do tlakové aparatury by se nevrátila."},
 {t:"num",q:"Kolik tun oxidu siřičitého vznikne spálením 500 000 tun uhlí s&nbsp;obsahem síry 1,20 % hmotnostních? <span class=\"q\">M</span>(S) = 32,06, <span class=\"q\">M</span>(SO₂) = 64,06 g·mol⁻¹. (Zadejte v&nbsp;tunách, zaokrouhleno na stovky.)",
  ans:11990, tol:200, unit:"t",
  e:"m(S) = 500 000 · 0,0120 = 6 000 t; každý atom síry dá jednu molekulu SO₂, takže m(SO₂) = 6 000 · (64,06/32,06) = 11 988 t, tedy zhruba 12 000 t. Hmotnost se prakticky zdvojnásobí, protože kyslík má skoro stejnou atomovou hmotnost jako síra a jsou tam dva."}
];

BANK.q7=[
 {t:"single",q:"Co vznikne reakcí <b>horké koncentrované</b> kyseliny sírové s&nbsp;mědí?",
  o:["CuSO₄ a vodík","CuS a voda","Reakce neproběhne","CuSO₄, SO₂ a voda"],c:3,
  e:"V koncentrované kyselině oxiduje síran, ne proton: S⁺ᵛᴵ klesá na S⁺ᴵⱽ. Cu + 2 H₂SO₄ → CuSO₄ + SO₂ + 2 H₂O. Vodík nevzniká nikdy — měď je ušlechtilá a proton by nezredukovala. Se zředěnou kyselinou měď prakticky nereaguje vůbec."},
 {t:"single",q:"Proč se kyselina sírová vždy lije <b>do vody</b>, a&nbsp;ne naopak?",
  o:["Aby se kyselina nezakalila","Protože rozpouštěcí teplo (asi −95 kJ·mol⁻¹) by při opačném postupu přehřálo tenkou vrstvu vody na hladině a směs by vystříkla","Protože voda má vyšší hustotu","Aby nevznikl oleum"],c:1,
  e:"Uvolní se přibližně 95 kJ na mol kyseliny. Když je kyselina lita do velkého objemu vody, teplo se rozvede. Při opačném postupu se ohřeje jen tenká vrstvička vody na hladině husté kyseliny, ta okamžitě překročí 100 °C, prudce se odpaří a vymrští kyselinu ven."},
 {t:"single",q:"Do které rodiny oxokyselin síry patří <span class=\"chem\">H₂S₂O₃</span> (kyselina thiosírová)?",
  o:["Mezi kyseliny s vazbou S–S","Mezi kyseliny sírové s kyslíkovým můstkem","Mezi peroxokyseliny","Stojí samostatně jako H₂SO₃"],c:0,
  e:"Thiosírová kyselina je síran, jemuž jeden kyslík nahradila síra — mezi oběma atomy síry je přímá vazba, takže patří k rodině s vazbou S–S. Kyslíkový můstek má H₂S₂O₇, peroxidový H₂SO₅ a H₂S₂O₈. Právě u kyselin s vazbou S–S ztrácejí oxidační čísla obsah."},
 {t:"single",q:"Co se stane se sacharózou po přidání koncentrované kyseliny sírové?",
  o:["Rozpustí se na bezbarvý roztok","Zoxiduje se na oxid uhličitý","Zuhelnatí — kyselina jí odejme vodík a kyslík v poměru vody","Zkaramelizuje"],c:2,
  e:"Koncentrovaná kyselina má tak silné dehydratační účinky, že odnímá vodu i látkám, které volnou vodu neobsahují: C₁₂H₂₂O₁₁ → 12 C + 11 H₂O. Zbude černý porézní uhlík, který unikající pára nadzvedne do „hada“. Stejným způsobem kyselina poleptá papír, dřevo i kůži."},
 {t:"multi",q:"Které vlastnosti platí pro <b>koncentrovanou</b> kyselinu sírovou, ale <b>ne</b> pro zředěnou? Vyberte všechny správné možnosti.",
  o:["Dehydratuje sacharózu na uhlík","Rozpouští měď za vzniku SO₂","Za studena pasivuje železo a hliník","Reaguje se zinkem za vývoje vodíku"],c:[0,1,2],
  e:"Dehydratace, oxidace síranem a pasivace jsou výsadou koncentrované kyseliny. Vývoj vodíku se zinkem je naopak typický pro <b>zředěnou</b> kyselinu, kde oxiduje proton; v koncentrované by místo vodíku vznikal SO₂ nebo i síra."},
 {t:"num",q:"Na titraci roztoku jodu se spotřebovalo 18,40 cm³ odměrného roztoku thiosíranu sodného o&nbsp;koncentraci 0,0500 mol·dm⁻³. Kolik milimolů jodu roztok obsahoval? Reakce: <span class=\"chem\">2 S₂O₃²⁻ + I₂ → S₄O₆²⁻ + 2 I⁻</span>. (Zadejte v&nbsp;mmol.)",
  ans:0.460, tol:0.012, unit:"mmol",
  e:"n(S₂O₃²⁻) = 0,0500 · 0,01840 = 9,20·10⁻⁴ mol = 0,920 mmol. Poměr thiosíranu k jodu je 2 : 1, takže n(I₂) = 0,460 mmol. Nejčastější chyba je zapomenout na dvojku a odpovědět 0,920 mmol."}
];

BANK.q8=[
 {t:"single",q:"Které tvrzení o&nbsp;<b>šedém selenu</b> je správné?",
  o:["Je to nejstálejší modifikace, tvoří ji spirálové řetězce a je fotovodivý","Je to modifikace z kruhů Se₈, stálá jen za nízkých teplot","Je to amorfní forma vzniklá prudkým ochlazením taveniny","Je elektricky nevodivý za všech podmínek"],c:0,
  e:"U síry je nejstálejší kruhová modifikace, u selenu naopak polymerní šedá se spirálovými řetězci — řetězení dolů skupinou sílí. Šedý selen je polovodič, jehož odpor při osvětlení prudce klesá, a právě to založilo xerografii. Kruhy Se₈ má červený selen, amorfní je sklovitý."},
 {t:"single",q:"Čím se strukturně liší <span class=\"chem\">H₆TeO₆</span> od <span class=\"chem\">H₂SO₄</span>?",
  o:["Tellur v ní má oxidační číslo +IV","Je oktaedrická, zatímco kyselina sírová je tetraedrická","Obsahuje peroxidový můstek","Je to silnější kyselina"],c:1,
  e:"Kolem většího atomu telluru se vejde šest skupin OH, takže kyselina hexahydrogentellurová je oktaedrická; síra i selen tvoří ve stavu +VI tetraedrické kyseliny. Oxidační číslo je přitom u všech tří +VI. A na rozdíl od kyseliny sírové je H₆TeO₆ velmi <b>slabá</b>."},
 {t:"single",q:"Proč je kyselina selenová silnějším oxidačním činidlem než kyselina sírová?",
  o:["Selen je elektronegativnější než síra","Selenanový anion má jinou geometrii","Selen je radioaktivní","Stálost nejvyššího oxidačního stavu klesá dolů skupinou, takže se selen stavu +VI snáz zbaví"],c:3,
  e:"Ochota vzdát se oxidačního stavu je totéž co oxidační síla. Stav +VI je u selenu méně stabilní než u síry, takže H₂SeO₄ elektrony přijme ochotněji — směs s HCl dokonce rozpouští zlato a platinu. Selen je přitom o něco méně elektronegativní než síra (2,55 proti 2,58)."},
 {t:"single",q:"Jak se pozná, že je polonium kov, a&nbsp;ne polokov?",
  o:["Podle stříbřitého lesku","Podle radioaktivity","Podle toho, že jeho elektrická vodivost s rostoucí teplotou klesá","Podle toho, že reaguje s kyselinami"],c:2,
  e:"Nejspolehlivější kritérium je závislost vodivosti na teplotě: u kovu klesá (elektrony se sráží s kmitajícími ionty), u polovodiče roste (teplo uvolňuje další nosiče náboje). Lesk mají i polokovy, radioaktivita s kovovostí nesouvisí a s kyselinami reagují i nekovy."},
 {t:"multi",q:"Která tvrzení o&nbsp;<b>selenu jako stopovém prvku</b> jsou správná? Vyberte všechny správné možnosti.",
  o:["Je součástí enzymu glutathionperoxidasy","Doporučená denní dávka je řádově desítky mikrogramů","Rozmezí mezi potřebnou a toxickou dávkou je velmi úzké","Nadbytek selenu se v těle projeví česnekovým dechem"],c:[0,1,2,3],
  e:"Všechna čtyři tvrzení platí. Selen je součástí selenocysteinu a glutathionperoxidasy, doporučená dávka je asi 55 µg denně a nad zhruba 400 µg denně nastupuje selenóza s lámavými nehty, vypadáváním vlasů a česnekovým dechem z dimethylselenidu."},
 {t:"num",q:"Jaký tepelný výkon uvolňuje 0,500 g <span class=\"chem\"><sup>210</sup>Po</span>, je-li aktivita 1,00 g rovna 1,66·10¹⁴ Bq a&nbsp;energie částice α je 5,30 MeV? (1 eV = 1,602·10⁻¹⁹ J. Zadejte ve wattech.)",
  ans:70.5, tol:2.0, unit:"W",
  e:"Aktivita 0,500 g je 8,30·10¹³ Bq. Energie jednoho rozpadu: 5,30·10⁶ · 1,602·10⁻¹⁹ = 8,49·10⁻¹³ J. Výkon = 8,30·10¹³ · 8,49·10⁻¹³ = 70,5 W. Půl gramu polonia tedy topí jako menší žárovka — proto sloužilo jako tepelný zdroj v kosmické technice."}
];
