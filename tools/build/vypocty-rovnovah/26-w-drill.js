/* ============================================================
   T18 · TRENAŽÉR „který vzorec použít“ (kapitola 8)
   ============================================================ */
var FORM=[
 {t:"Vypočítejte pH roztoku HNO₃ o koncentraci 0,020 mol·dm⁻³.",
  o:["pH = −log c","pH = ½(pKa − log c)","pH = pKa + log([A⁻]/[HA])","pH = 7 + ½(pKa + log c)"],c:0,
  e:"Kyselina dusičná je jedna ze šesti silných kyselin — disociuje úplně, takže [H₃O⁺] = c a pH = −log 0,020 = 1,70. Odmocnina z Ka·c by platila jen pro slabou kyselinu, u které zadání musí Ka uvést."},
 {t:"Vypočítejte pH roztoku kyseliny mravenčí (Ka = 1,8·10⁻⁴) o koncentraci 0,10 mol·dm⁻³.",
  o:["pH = −log c","[H₃O⁺] = √(Ka·c), pak pH = −log[H₃O⁺]","pOH = √(Kb·c)","Ka = Kw/Kb, pak √(Ka·c)"],c:1,
  e:"Zadané Ka je poznávací znak slabé kyseliny: √(1,8·10⁻⁴ · 0,10) = 4,2·10⁻³ → pH 2,37. Kdyby šlo o sůl (mravenčan), museli bychom nejdřív spočítat Kb = Kw/Ka — tady ale máme kyselinu samotnou."},
 {t:"Vypočítejte pH roztoku Ba(OH)₂ o koncentraci 0,0050 mol·dm⁻³.",
  o:["pH = −log(2c)","pH = 14 − ½(pKb − log c)","pOH = −log(2c), pH = 14 − pOH","pH = 7 − ½(pKb + log c)"],c:2,
  e:"Hydroxid barnatý je silná dvojsytná zásada: [OH⁻] = 2c = 0,010 → pOH 2,00 → pH 12,00. Nejčastější chyby jsou zapomenutá dvojka a odevzdání pOH místo pH."},
 {t:"Vypočítejte pH roztoku octanu sodného o koncentraci 0,10 mol·dm⁻³ (Ka kyseliny octové = 1,75·10⁻⁵).",
  o:["pH = ½(pKa − log c)","pH = pKa","Kb = Kw/Ka, [OH⁻] = √(Kb·c), pH = 14 − pOH","pH = −log c"],c:2,
  e:"Sůl slabé kyseliny a silné zásady: hydrolyzuje anion a roztok je zásaditý (pH 8,88). Dosadit rovnou Ka kyseliny octové by dalo kyselé pH — to je nejlákavější chyba, protože Ka je v zadání."},
 {t:"Roztok obsahuje 0,10 mol·dm⁻³ NH₃ a zároveň 0,10 mol·dm⁻³ NH₄Cl. Jaké je pH?",
  o:["pH = pKa(NH₄⁺) + log([NH₃]/[NH₄⁺])","pH = 14 − ½(pKb − log c)","pH = 7 − ½(pKb + log c)","pH = −log(0,20)"],c:0,
  e:"Dvě látky tvořící konjugovaný pár = pufr, tedy Hendersonova–Hasselbalchova rovnice: pH = 9,25 + log 1 = 9,25. Vzorec pro samotnou slabou zásadu by dal 11,13 a platil by jen bez přidané amonné soli."},
 {t:"Smícháme 40 mL HCl (0,10 mol·dm⁻³) a 60 mL NaOH (0,10 mol·dm⁻³). Jaké bude pH?",
  o:["pH = 7, jde o neutralizaci","Spočítat nadbytek v mmol, vydělit celkovým objemem, pak pOH → pH","pH = pKa + log(nOH/nH)","Použít Ksp"],c:1,
  e:"Dvě silné látky v nestejném množství: 4,0 mmol H₃O⁺ proti 6,0 mmol OH⁻, nadbytek 2,0 mmol OH⁻ ve 100 mL → 0,020 mol·dm⁻³ → pOH 1,70 → pH 12,30. pH 7 by platilo jen při přesné ekvivalenci."},
 {t:"Jaká je rozpustnost Mg(OH)₂ v čisté vodě, je-li Ksp = 5,6·10⁻¹²?",
  o:["s = √Ksp","s = ∛(Ksp/4)","s = Ksp/[OH⁻]²","s = ⁴√(Ksp/27)"],c:1,
  e:"Typ AB₂: rozpustí-li se s molů, je [Mg²⁺] = s a [OH⁻] = 2s, tedy Ksp = 4s³ a s = 1,12·10⁻⁴ mol·dm⁻³. Odmocnina by platila jen pro typ AB (AgCl, BaSO₄), čtvrtá odmocnina pro Fe(OH)₃."},
 {t:"Smícháme 50 mL AgNO₃ (1,0·10⁻⁴ mol·dm⁻³) a 50 mL KBr (1,0·10⁻⁴ mol·dm⁻³). Vznikne sraženina AgBr?",
  o:["Porovnat c(AgNO₃) s Ksp","Spočítat s = √Ksp a porovnat s koncentracemi","Spočítat koncentrace po zředění, Q = [Ag⁺][Br⁻], porovnat s Ksp","Spočítat K = Ksp·β"],c:2,
  e:"Otázka „vznikne sraženina“ vždy znamená reakční kvocient: po smíchání je každá koncentrace 5,0·10⁻⁵, takže Q = 2,5·10⁻⁹ > Ksp = 5,4·10⁻¹³ → sráží se. Bez zředění na polovinu by vyšlo Q čtyřikrát větší."},
 {t:"Jaká je rozpustnost AgCl v roztoku NaCl o koncentraci 0,050 mol·dm⁻³?",
  o:["s = √Ksp","s = Ksp / [Cl⁻]","s = Ksp · [Cl⁻]","s = ∛(Ksp/4)"],c:1,
  e:"Efekt společného iontu: chlorid už v roztoku je, takže [Ag⁺] = s = Ksp/[Cl⁻] = 1,8·10⁻¹⁰/0,050 = 3,6·10⁻⁹ mol·dm⁻³ — 3700× méně než ve vodě. √Ksp platí jen pro čistou vodu."},
 {t:"Roztok obsahuje 0,010 mol·dm⁻³ [Cu(NH₃)₄]²⁺ a 1,0 mol·dm⁻³ volného NH₃ (β = 1,1·10¹³). Jaká je koncentrace volných Cu²⁺?",
  o:["[Cu²⁺] = c(M)·β·[NH₃]⁴","[Cu²⁺] = c(M) / (β·[NH₃])","[Cu²⁺] = c(M) / (β·[NH₃]⁴)","[Cu²⁺] = √(c(M)/β)"],c:2,
  e:"Z definice β = [ML₄]/([M][L]⁴) plyne [M] = c(M)/(β·[L]⁴) = 9,1·10⁻¹⁶ mol·dm⁻³. Ligand je ve jmenovateli umocněný na počet ligandů — vynechaná mocnina je nejčastější chyba u komplexů."},
 {t:"Kolik AgCl se rozpustí v 1,0 mol·dm⁻³ amoniaku (Ksp = 1,8·10⁻¹⁰, β = 1,6·10⁷)?",
  o:["Sečíst Ksp a β","K = Ksp · β, pak ICE pro AgCl + 2 NH₃ ⇌ [Ag(NH₃)₂]⁺ + Cl⁻","s = √Ksp","[Ag⁺] = c/(β·[NH₃]²)"],c:1,
  e:"Sečtením obou rovnováh se konstanty násobí: K = 2,9·10⁻³, odtud s/(c − 2s) = √K a s = 0,048 mol·dm⁻³. Vzorec pro volné [Ag⁺] odpovídá na jinou otázku — kolik kovu zbývá nezkomplexovaného, ne kolik se rozpustilo."},
 {t:"Titrujeme 25 mL CH₃COOH (0,10 mol·dm⁻³) hydroxidem sodným (0,10 mol·dm⁻³). Jaké je pH po přidání 12,5 mL?",
  o:["pH = 7,00","pH = pKa = 4,76 (polovina titrace, pufr 1 : 1)","pH = ½(pKa − log c)","pH = 7 + ½(pKa + log c)"],c:1,
  e:"V polovině titrace je právě polovina kyseliny přeměněna na octan, takže [HA] = [A⁻] a logaritmus poměru je nula: pH = pKa. Poslední možnost (8,73) platí až v bodě ekvivalence při 25,0 mL."},
 {t:"Jaké pH má roztok chloridu amonného o koncentraci 0,20 mol·dm⁻³ (Kb amoniaku = 1,78·10⁻⁵)?",
  o:["pH = 7 − ½(pKb + log c)","pH = 14 − ½(pKb − log c)","pH = pKb","pH = 7 + ½(pKa + log c)"],c:0,
  e:"Amonná sůl silné kyseliny: hydrolyzuje kation, roztok je kyselý, pH = 7 − ½(4,75 − 0,70) = 4,97. Druhá možnost je vzorec pro samotný amoniak a dala by zásadité pH 11,28."},
 {t:"Při jakém pH se začne z roztoku Fe³⁺ o koncentraci 0,010 mol·dm⁻³ srážet Fe(OH)₃ (Ksp = 2,8·10⁻³⁹)?",
  o:["[OH⁻] = Ksp/c, pak pOH → pH","[OH⁻] = ∛(Ksp/c), pak pOH → pH","[OH⁻] = √(Ksp·c)","pH = ½(pKsp − log c)"],c:1,
  e:"Ksp = [Fe³⁺][OH⁻]³, takže [OH⁻] = ∛(Ksp/c) = 6,5·10⁻¹³ → pOH 12,18 → pH 1,82. Železité soli tedy hydrolyzují a sráží se už v kyselém prostředí — proto jsou jejich roztoky vždy okyselené."},
 {t:"Nasycený roztok BaSO₄ obsahuje 2,4 mg soli v 1 dm³ (M = 233,4 g·mol⁻¹). Jaký je Ksp?",
  o:["Ksp = c/M","Ksp = 2s","Převést na mol·dm⁻³, pak Ksp = s²","Ksp = 4s³"],c:2,
  e:"Nejdřív gramy na moly: s = 2,4·10⁻³/233,4 = 1,03·10⁻⁵ mol·dm⁻³. BaSO₄ je typ AB, takže Ksp = s² = 1,1·10⁻¹⁰. Vzorec 4s³ patří typům AB₂ a A₂B."}
];
var fmI=0, fmScore=0, fmAnswered=false;
function drawForm(){
  var it=FORM[fmI];
  $("#fmI").textContent=fmI+1; $("#fmTot").textContent=FORM.length; $("#fmScore").textContent=fmScore;
  $("#fmTask").innerHTML=it.t;
  $("#fmOpts").innerHTML=it.o.map(function(o,i){
    return '<button class="btn" type="button" data-fm="'+i+'" style="text-align:left;justify-content:flex-start;height:auto;min-height:44px;padding:.6rem .8rem;line-height:1.4">'+o+'</button>';
  }).join("");
  $$("#fmOpts button").forEach(function(b){ b.addEventListener("click",function(){ fmAnswer(+b.dataset.fm); }); });
  var ex=$("#fmExplain"); ex.style.display="none"; ex.className="explain";
  $("#fmNext").disabled=true;
  fmAnswered=false;
}
function fmAnswer(i){
  if(fmAnswered) return;
  fmAnswered=true;
  var it=FORM[fmI], ok=(i===it.c);
  if(ok) fmScore++;
  $("#fmScore").textContent=fmScore;
  $$("#fmOpts button").forEach(function(b,bi){
    b.disabled=true;
    if(bi===it.c){ b.style.borderColor="var(--ok)"; b.style.background="var(--ok-soft)"; b.style.color="var(--ink)"; }
    else if(bi===i){ b.style.borderColor="var(--bad)"; b.style.background="var(--bad-soft)"; b.style.color="var(--ink)"; }
    else b.style.opacity=".55";
  });
  var ex=$("#fmExplain");
  ex.style.display="flex"; ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)"; ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
  ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je možnost "+(it.c+1))+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
  $("#fmNext").disabled = fmI>=FORM.length-1;
  if(fmI>=FORM.length-1){
    toast("Trenažér dokončen: "+fmScore+" z "+FORM.length+" správně.");
    if(fmScore>=10) markDone("k8");
  }
}
function initForm(){
  $("#fmNext").addEventListener("click",function(){ if(fmI<FORM.length-1){ fmI++; drawForm(); } });
  $("#fmReset").addEventListener("click",function(){ fmI=0; fmScore=0; drawForm(); toast("Trenažér vynulován."); });
  drawForm();
}
