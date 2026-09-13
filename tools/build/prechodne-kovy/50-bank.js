/* ============================================================
   32 · KVÍZY KAPITOL 0 AŽ 3
   ============================================================ */
BANK.q0=[
 {t:"single",q:"Který z&nbsp;prvků <b>nesplňuje</b> definici přechodného kovu?",
  o:["chrom","zinek","měď","skandium"],c:1,
  e:"Zinek má konfiguraci <span class=\"chem\">3d¹⁰</span> v&nbsp;atomu i&nbsp;v&nbsp;jediném dostupném kationtu <span class=\"chem\">Zn²⁺</span>, takže nikdy nemá neúplně zaplněné orbitaly d. Nejlákavější špatná odpověď je měď — ta má sice v&nbsp;atomu také d¹⁰, ale její běžný kation <span class=\"chem\">Cu²⁺</span> má d⁹, a&nbsp;proto přechodným kovem je."},
 {t:"single",q:"Jaká je elektronová konfigurace valenční sféry chromu?",
  o:["3d⁴ 4s²","3d⁶","3d⁵ 4s¹","3d³ 4s²"],c:2,
  e:"Chrom má nepravidelnou konfiguraci <span class=\"chem\">3d⁵ 4s¹</span>: jeden elektron se přesune z&nbsp;4s do 3d, protože poloviční zaplnění množiny d&nbsp;je energeticky výhodné. Odpověď 3d⁴ 4s² je to, co bychom čekali podle výstavbového principu — a&nbsp;právě proto je nejlákavější."},
 {t:"single",q:"Jakou konfiguraci má kation <span class=\"chem\">Fe³⁺</span>?",
  o:["[Ar] 3d⁵","[Ar] 3d³ 4s²","[Ar] 3d⁴ 4s¹","[Ar] 3d⁶"],c:0,
  e:"Při ionizaci odcházejí <b>nejdřív oba elektrony 4s</b> a&nbsp;teprve pak jeden elektron d, takže z&nbsp;3d⁶ 4s² zbude 3d⁵. Odpověď 3d³ 4s² odpovídá běžné chybě, kdy se elektrony berou z&nbsp;orbitalů d&nbsp;dřív než z&nbsp;4s; odpověď 3d⁶ patří kationtu Fe²⁺."},
 {t:"multi",q:"Které vlastnosti přímo plynou z&nbsp;neúplného zaplnění orbitalů d?",
  o:["proměnlivá oxidační čísla","barevnost sloučenin","nízká hustota kovů","paramagnetismus","ochota tvořit komplexy"],c:[0,1,3,4],
  e:"Neúplně zaplněné orbitaly d&nbsp;způsobují čtyři věci najednou: proměnlivá oxidační čísla, barvu, paramagnetismus a&nbsp;komplexotvornost. Hustota je naopak <b>vysoká</b>, protože jsou atomy malé a&nbsp;kovová vazba silná — nízkou hustotu mají kovy bloku s."},
 {t:"single",q:"Proč mají zirkonium a&nbsp;hafnium téměř shodné vlastnosti?",
  o:["mají stejný počet valenčních elektronů s","obě jsou radioaktivní","tvoří spolu intermetalickou sloučeninu","lanthanoidová kontrakce vyrovnala rozdíl v&nbsp;poloměrech"],c:3,
  e:"Hafnium následuje po lanthanoidech, u&nbsp;nichž se poloměr postupně zmenšil ze&nbsp;103,2 na&nbsp;86,1&nbsp;pm. Kontrakce tak přesně vyrušila zvětšení, které by jinak nová vrstva přinesla — poloměry Zr⁴⁺ a&nbsp;Hf⁴⁺ jsou 72 a&nbsp;71&nbsp;pm. Stejný počet valenčních elektronů mají i&nbsp;jiné dvojice ve skupině, a&nbsp;přesto se od sebe liší mnohem víc."},
 {t:"single",q:"Které tvrzení o&nbsp;lanthanoidech je správné?",
  o:["Zaplňují se u&nbsp;nich orbitaly 5f a&nbsp;jsou všechny radioaktivní.","Mají výrazně proměnlivá oxidační čísla jako prvky bloku d.","Převažujícím oxidačním číslem je u&nbsp;všech III, protože orbitaly 4f se vazby prakticky neúčastní.","Jsou v&nbsp;zemské kůře vzácnější než zlato."],c:2,
  e:"Orbitaly 4f leží hluboko uvnitř atomu, takže o&nbsp;vazbě nerozhodují — odtud jednotné chování a&nbsp;převažující stav III. Orbitaly 5f se zaplňují u&nbsp;aktinoidů, a&nbsp;pokud jde o&nbsp;výskyt, cer je v&nbsp;kůře běžnější než měď; vzácné je jejich oddělení, ne množství."}
];

BANK.q1=[
 {t:"single",q:"Jaké je nejvyšší oxidační číslo, jakého skutečně dosahuje železo?",
  o:["VIII, protože stojí v&nbsp;osmé skupině","VI, a&nbsp;to jen v&nbsp;železanech v&nbsp;silně zásaditém prostředí","III, výš už se nedostane","IV, v&nbsp;oxidu železičitém"],c:1,
  e:"Železo se běžně zastaví u&nbsp;III; stavu VI dosáhne jen v&nbsp;železanech <span class=\"chem\">FeO₄²⁻</span>, které vznikají silnou oxidací v&nbsp;alkalickém prostředí. Odpověď VIII je nejčastější chyba — pravidlo „maximum se rovná číslu skupiny“ platí jen do manganu, protože dál jsou elektrony d&nbsp;už příliš pevně vázané."},
 {t:"single",q:"Seřaďte oxidy manganu podle <b>rostoucí</b> kyselosti.",
  o:["Mn₂O₇ &lt; MnO₂ &lt; MnO","MnO₂ &lt; MnO &lt; Mn₂O₇","MnO &lt; MnO₂ &lt; Mn₂O₇","MnO &lt; Mn₂O₇ &lt; MnO₂"],c:2,
  e:"Kyselost oxidu roste s&nbsp;oxidačním číslem kovu: MnO (II) je zásaditý, MnO₂ (IV) amfoterní a&nbsp;Mn₂O₇ (VII) silně kyselý. Čím větší náboj kov má, tím silněji přitahuje elektrony vazby O–H v&nbsp;navázané vodě a&nbsp;tím snáz se odštěpí proton."},
 {t:"single",q:"Které tvrzení o&nbsp;trendu ve skupině 6 (Cr, Mo, W) je správné?",
  o:["Oxidační schopnost stavu VI dolů skupinou <b>klesá</b> — chroman oxiduje silně, wolframan prakticky ne.","Oxidační schopnost stavu VI dolů skupinou roste.","Stav VI je dostupný jen u&nbsp;chromu.","Všechny tři prvky mají stav VI stejně silně oxidující."],c:0,
  e:"Ve skupině shora dolů je nejvyšší oxidační stav stále <b>stálejší</b>, a&nbsp;proto méně ochotný přejít na nižší — tedy méně oxidující. Je to opačný trend než v&nbsp;bloku p, kde dolů skupinou převáží nižší stav; právě záměna obou trendů je typická chyba."},
 {t:"single",q:"Proč neexistuje jodid měďnatý <span class=\"chem\">CuI₂</span>?",
  o:["Měď nikdy nedosahuje oxidačního čísla II.","Jodid je příliš velký a&nbsp;do mřížky se nevejde.","Jodidový aniont měď(II) rovnou zredukuje na měď(I) a&nbsp;sám se zoxiduje na jod.","Sloučenina je rozpustná a&nbsp;nedá se izolovat."],c:2,
  e:"Platí pravidlo, že fluor stabilizuje vysoká oxidační čísla a&nbsp;jod nízká: 2 Cu²⁺ + 4 I⁻ → 2 CuI + I₂. Měď(II) je běžná, takže první odpověď je nesmysl; velikost aniontu tu nerozhoduje, rozhoduje redoxní chování."},
 {t:"single",q:"Co se stane s&nbsp;chromanovým roztokem po přidání kyseliny?",
  o:["Chrom se zredukuje z&nbsp;VI na III.","Roztok se odbarví.","Vysráží se oxid chromitý.","Vznikne dichroman a&nbsp;roztok zoranžoví, oxidační číslo chromu se nezmění."],c:3,
  e:"Jde o&nbsp;<b>kondenzaci</b>, ne o&nbsp;redoxní děj: 2 CrO₄²⁻ + 2 H₃O⁺ → Cr₂O₇²⁻ + 3 H₂O. Chrom má v&nbsp;obou částicích VI. Redukce na zelený <span class=\"chem\">Cr³⁺</span> nastane teprve tehdy, když je v&nbsp;roztoku redukovadlo."},
 {t:"num",q:"Jaké je oxidační číslo manganu v&nbsp;aniontu <span class=\"chem\">MnO₄²⁻</span>? (Zadejte jako celé číslo, například 7.)",
  ans:6, tol:0.2, unit:"",
  e:"Kyslík má −II, součet se rovná náboji: <span class=\"q\">x</span> + 4·(−2) = −2, tedy <span class=\"q\">x</span> = VI. Jde o&nbsp;<b>manganan</b>, ne manganistan — ten má vzorec <span class=\"chem\">MnO₄⁻</span> a&nbsp;oxidační číslo VII. Rozdíl je jen v&nbsp;náboji aniontu a&nbsp;snadno se přehlédne."}
];

BANK.q2=[
 {t:"single",q:"Roztok pohlcuje světlo o&nbsp;vlnové délce zhruba 500&nbsp;nm. Jakou barvu uvidíme?",
  o:["zelenou","žlutou","purpurovou až fialovou","modrou"],c:2,
  e:"Vlnová délka 500&nbsp;nm patří zelené oblasti spektra a&nbsp;doplňkovou barvou k&nbsp;zelené je purpurová. Odpověď „zelenou“ je nejčastější chyba — zaměňuje pohlcenou barvu s&nbsp;pozorovanou. Právě takhle se chová titanitý akvakomplex s&nbsp;pásem při 493&nbsp;nm."},
 {t:"single",q:"Proč je manganistanový aniont sytě fialový, přestože má mangan konfiguraci d⁰?",
  o:["Protože barva pochází z&nbsp;přenosu náboje z&nbsp;kyslíku na kov, ne z&nbsp;přechodu d–d.","Protože d⁰ znamená pět nepárových elektronů.","Protože kyslík je sám o&nbsp;sobě barevný.","Protože mangan má vysokou elektronegativitu."],c:0,
  e:"Přechod d–d potřebuje elektron, který by skočil — a&nbsp;u&nbsp;d⁰ žádný není. Barvu způsobuje přeskok elektronu z&nbsp;orbitalu kyslíku na prázdný orbital kovu, tedy <b>přenos náboje</b>. Ten je řádově intenzivnější, proto stačí nepatrné množství manganistanu na výrazné zbarvení."},
 {t:"single",q:"Kolik nepárových elektronů má vysokospinový kation <span class=\"chem\">Fe²⁺</span> a&nbsp;jaký z&nbsp;toho plyne spinový moment?",
  o:["5 nepárových, 5,92 μB","6 nepárových, 6,93 μB","4 nepárové, 4,90 μB","2 nepárové, 2,83 μB"],c:2,
  e:"Fe²⁺ má <span class=\"chem\">3d⁶</span>: pět orbitalů se nejdřív obsadí po jednom a&nbsp;šestý elektron se musí spárovat, takže nepárové jsou čtyři a&nbsp;<span class=\"q\">μ</span> = √(4·6) = 4,90&nbsp;μB. Hodnota 5,92 patří konfiguraci d⁵, tedy kationtům Fe³⁺ a&nbsp;Mn²⁺."},
 {t:"multi",q:"Které z&nbsp;uvedených iontů jsou <b>bezbarvé</b>?",
  o:["Sc³⁺","Cu²⁺","Zn²⁺","Ti⁴⁺","Ni²⁺"],c:[0,2,3],
  e:"Bezbarvé jsou ionty s&nbsp;konfigurací d⁰ (Sc³⁺, Ti⁴⁺ — proto je TiO₂ bílý) a&nbsp;d¹⁰ (Zn²⁺). Cu²⁺ má d⁹ a&nbsp;je modrý, Ni²⁺ má d⁸ a&nbsp;je zelený — u&nbsp;obou je přechod d–d možný."},
 {t:"single",q:"Co se stane s&nbsp;železným hřebíkem zahřátým nad 770 °C, který visí u&nbsp;magnetu?",
  o:["Roztaví se.","Odpadne, protože nad Curieovou teplotou feromagnetismus zaniká.","Přitáhne se ještě silněji.","Nic — magnetismus na teplotě nezávisí."],c:1,
  e:"Nad Curieovou teplotou (u&nbsp;železa 770 °C) tepelný pohyb rozbije uspořádání magnetických momentů v&nbsp;doménách a&nbsp;látka se stane obyčejně paramagnetickou. Roztavit by se hřebík musel až při 1538 °C, takže odpadne dávno předtím."},
 {t:"num",q:"Hlavní absorpční pás komplexu leží při vlnočtu 20&nbsp;000&nbsp;cm⁻¹. Jaká je vlnová délka pohlceného světla? (Zadejte v&nbsp;nanometrech.)",
  ans:500, tol:10, unit:"nm",
  e:"Platí <span class=\"q\">λ</span> = 10⁷ / <span class=\"q\">ν̃</span> = 10⁷ / 20 000 = 500&nbsp;nm. To je zelená oblast spektra, takže roztok bude vypadat purpurově. Energie přechodu vyjde 0,011963 · 20 000 = 239&nbsp;kJ·mol⁻¹."}
];

BANK.q3=[
 {t:"single",q:"Kolik elektronů přijme manganistanový aniont v&nbsp;<b>silně zásaditém</b> prostředí?",
  o:["pět, vzniká Mn²⁺","tři, vzniká MnO₂","jeden, vzniká zelený manganan MnO₄²⁻","sedm, vzniká kovový mangan"],c:2,
  e:"V&nbsp;silně zásaditém prostředí přijme manganistan jediný elektron a&nbsp;přejde na zelený manganan <span class=\"chem\">MnO₄²⁻</span>. Pět elektronů přijímá v&nbsp;kyselém prostředí (na Mn²⁺) a&nbsp;tři v&nbsp;neutrálním až slabě zásaditém (na MnO₂) — záměna těchhle tří případů je nejčastější chyba u&nbsp;titračních výpočtů."},
 {t:"single",q:"Proč se manganometrická titrace provádí v&nbsp;prostředí kyseliny sírové, a&nbsp;ne chlorovodíkové?",
  o:["Kyselina sírová je levnější.","Kyselina chlorovodíková by se manganistanem zoxidovala na chlor a&nbsp;spotřebovala by ho navíc.","Kyselina chlorovodíková by se rozložila.","Kyselina sírová zbarví roztok, což usnadní odečet."],c:1,
  e:"Manganistan je natolik silné oxidovadlo, že chloridové ionty zoxiduje na chlor — spotřeba by pak neodpovídala množství stanovované látky. Kyselina dusičná by zase oxidovala sama; zbývá kyselina sírová, která je vůči manganistanu netečná."},
 {t:"single",q:"Co vznikne, když se zelený roztok mangananu okyselí?",
  o:["Kovový mangan a&nbsp;kyslík.","Jen bezbarvý roztok manganatých solí.","Nic se nestane, manganan je stálý v&nbsp;celém rozsahu pH.","Fialový manganistan a&nbsp;hnědá sraženina MnO₂ — manganan disproporcionuje."],c:3,
  e:"Rovnice zní 3 MnO₄²⁻ + 4 H₃O⁺ → 2 MnO₄⁻ + MnO₂ + 6 H₂O. Mangan(VI) se rozdělí na mangan(VII) a&nbsp;mangan(IV) — to je typická <b>disproporcionace</b>. Manganan je proto stálý jedině v&nbsp;silně zásaditém prostředí."},
 {t:"single",q:"Čím se hydroxid chromitý liší od hydroxidu železitého?",
  o:["Cr(OH)₃ je amfoterní a&nbsp;rozpustí se i&nbsp;v&nbsp;hydroxidu, Fe(OH)₃ nikoli.","Cr(OH)₃ je rozpustný ve vodě.","Fe(OH)₃ je zelený, Cr(OH)₃ hnědý.","Cr(OH)₃ nereaguje s&nbsp;kyselinami."],c:0,
  e:"Hydroxid chromitý reaguje s&nbsp;kyselinami na chromité soli i&nbsp;se zásadami na hydroxidochromitany <span class=\"chem\">[Cr(OH)₄]⁻</span>, kdežto hydroxid železitý je jen zásaditý. Barvy jsou přesně opačné, než uvádí třetí možnost: Cr(OH)₃ je šedozelený, Fe(OH)₃ červenohnědý."},
 {t:"single",q:"Proč je oxid titaničitý bílý, kdežto oxid železitý červenohnědý?",
  o:["Titan je lehčí prvek.","Ti⁴⁺ má konfiguraci d⁰, takže přechod d–d není možný; Fe³⁺ má d⁵ a&nbsp;přechod možný je.","Oxid titaničitý má jinou krystalovou mřížku.","Železo je feromagnetické."],c:1,
  e:"Bílý pigment nesmí pohlcovat žádnou vlnovou délku viditelného světla — to zajistí konfigurace d⁰ nebo d¹⁰. Titan(IV) má d⁰, kdežto železo(III) má d⁵, takže přechody d–d probíhají a&nbsp;hematit je barevný. Mřížka ani hmotnost prvku o&nbsp;barvě nerozhodují."},
 {t:"num",q:"Kolik molů železnatých iontů zoxiduje 1&nbsp;mol manganistanu draselného v&nbsp;kyselém prostředí?",
  ans:5, tol:0.2, unit:"mol",
  e:"Manganistan přijme v&nbsp;kyselém prostředí pět elektronů a&nbsp;železnatý ion odevzdá jeden, takže poměr je 1&nbsp;:&nbsp;5 podle rovnice MnO₄⁻ + 5 Fe²⁺ + 8 H₃O⁺ → Mn²⁺ + 5 Fe³⁺ + 12 H₂O. V&nbsp;zásaditém prostředí by poměr byl 1&nbsp;:&nbsp;3."}
];
