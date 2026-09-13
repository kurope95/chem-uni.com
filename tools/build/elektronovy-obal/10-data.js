/* ============================================================
   2 · DATA — tabelované hodnoty prvků
       en  … elektronegativita (Pauling)
       i1  … první ionizační energie [kJ·mol⁻¹] (CRC / NIST)
       ea  … elektronová afinita [kJ·mol⁻¹], kladná = energie se uvolní;
             null = anion není stabilní (vzácné plyny, Be, Mg, Zn…)
       r   … kovalentní poloměr [pm] (Cordero 2008)
       ox  … běžná oxidační čísla (nejběžnější tučně v textu)
       cat … kov / polokov / nekov / vzácný plyn
       val … typická vaznost
       ion … typický ion (null = netvoří jednoduché ionty)
   ============================================================ */
var ELEMENTS=[
 {Z:1, s:"H", n:"vodík",    en:2.20,i1:1312.0,ea:72.8, r:31, ox:"−I, +I",             cat:"nekov",  val:"1",        ion:"H⁺ (H⁻ v hydridech)"},
 {Z:2, s:"He",n:"helium",   en:null,i1:2372.3,ea:null, r:28, ox:"0",                   cat:"vzácný plyn",val:"0",    ion:null},
 {Z:3, s:"Li",n:"lithium",  en:0.98,i1:520.2, ea:59.6, r:128,ox:"+I",                  cat:"kov",    val:"1",        ion:"Li⁺"},
 {Z:4, s:"Be",n:"beryllium",en:1.57,i1:899.5, ea:null, r:96, ox:"+II",                 cat:"kov",    val:"2",        ion:"Be²⁺"},
 {Z:5, s:"B", n:"bor",      en:2.04,i1:800.6, ea:27.0, r:84, ox:"+III",                cat:"polokov",val:"3",        ion:null},
 {Z:6, s:"C", n:"uhlík",    en:2.55,i1:1086.5,ea:121.8,r:76, ox:"−IV, +II, +IV",       cat:"nekov",  val:"4 (2)",    ion:null},
 {Z:7, s:"N", n:"dusík",    en:3.04,i1:1402.3,ea:null, r:71, ox:"−III, +III, +V (+II, +IV)",cat:"nekov",val:"3 (4 v NH₄⁺)",ion:"N³⁻ (nitridy)"},
 {Z:8, s:"O", n:"kyslík",   en:3.44,i1:1313.9,ea:141.0,r:66, ox:"−II (−I)",            cat:"nekov",  val:"2",        ion:"O²⁻"},
 {Z:9, s:"F", n:"fluor",    en:3.98,i1:1681.0,ea:328.2,r:57, ox:"−I",                  cat:"nekov",  val:"1",        ion:"F⁻"},
 {Z:10,s:"Ne",n:"neon",     en:null,i1:2080.7,ea:null, r:58, ox:"0",                   cat:"vzácný plyn",val:"0",    ion:null},
 {Z:11,s:"Na",n:"sodík",    en:0.93,i1:495.8, ea:52.9, r:166,ox:"+I",                  cat:"kov",    val:"1",        ion:"Na⁺"},
 {Z:12,s:"Mg",n:"hořčík",   en:1.31,i1:737.7, ea:null, r:141,ox:"+II",                 cat:"kov",    val:"2",        ion:"Mg²⁺"},
 {Z:13,s:"Al",n:"hliník",   en:1.61,i1:577.5, ea:41.8, r:121,ox:"+III",                cat:"kov",    val:"3",        ion:"Al³⁺"},
 {Z:14,s:"Si",n:"křemík",   en:1.90,i1:786.5, ea:134.1,r:111,ox:"−IV, +IV",            cat:"polokov",val:"4",        ion:null},
 {Z:15,s:"P", n:"fosfor",   en:2.19,i1:1011.8,ea:72.0, r:107,ox:"−III, +III, +V",      cat:"nekov",  val:"3, 5",     ion:"P³⁻ (fosfidy)"},
 {Z:16,s:"S", n:"síra",     en:2.58,i1:999.6, ea:200.4,r:105,ox:"−II, +IV, +VI",       cat:"nekov",  val:"2, 4, 6",  ion:"S²⁻"},
 {Z:17,s:"Cl",n:"chlor",    en:3.16,i1:1251.2,ea:348.6,r:102,ox:"−I, +I, +III, +V, +VII",cat:"nekov",val:"1, 3, 5, 7",ion:"Cl⁻"},
 {Z:18,s:"Ar",n:"argon",    en:null,i1:1520.6,ea:null, r:106,ox:"0",                   cat:"vzácný plyn",val:"0",    ion:null},
 {Z:19,s:"K", n:"draslík",  en:0.82,i1:418.8, ea:48.4, r:203,ox:"+I",                  cat:"kov",    val:"1",        ion:"K⁺"},
 {Z:20,s:"Ca",n:"vápník",   en:1.00,i1:589.8, ea:2.4,  r:176,ox:"+II",                 cat:"kov",    val:"2",        ion:"Ca²⁺"},
 {Z:21,s:"Sc",n:"skandium", en:1.36,i1:633.1, ea:18.1, r:170,ox:"+III",                cat:"kov",    val:"3",        ion:"Sc³⁺"},
 {Z:22,s:"Ti",n:"titan",    en:1.54,i1:658.8, ea:7.6,  r:160,ox:"+IV (+III)",          cat:"kov",    val:"4 (3)",    ion:"Ti⁴⁺ (formálně), Ti³⁺"},
 {Z:23,s:"V", n:"vanad",    en:1.63,i1:650.9, ea:50.9, r:153,ox:"+V (+II, +III, +IV)", cat:"kov",    val:"proměnlivá",ion:"VO²⁺, VO₃⁻"},
 {Z:24,s:"Cr",n:"chrom",    en:1.66,i1:652.9, ea:65.2, r:139,ox:"+III, +VI (+II)",     cat:"kov",    val:"proměnlivá",ion:"Cr³⁺, CrO₄²⁻"},
 {Z:25,s:"Mn",n:"mangan",   en:1.55,i1:717.3, ea:null, r:139,ox:"+II, +IV, +VII (+III, +VI)",cat:"kov",val:"proměnlivá",ion:"Mn²⁺, MnO₄⁻"},
 {Z:26,s:"Fe",n:"železo",   en:1.83,i1:762.5, ea:14.8, r:132,ox:"+II, +III",           cat:"kov",    val:"proměnlivá",ion:"Fe²⁺, Fe³⁺"},
 {Z:27,s:"Co",n:"kobalt",   en:1.88,i1:760.4, ea:63.9, r:126,ox:"+II, +III",           cat:"kov",    val:"proměnlivá",ion:"Co²⁺"},
 {Z:28,s:"Ni",n:"nikl",     en:1.91,i1:737.1, ea:111.7,r:124,ox:"+II",                 cat:"kov",    val:"2",        ion:"Ni²⁺"},
 {Z:29,s:"Cu",n:"měď",      en:1.90,i1:745.5, ea:119.2,r:132,ox:"+I, +II",             cat:"kov",    val:"1, 2",     ion:"Cu²⁺, Cu⁺"},
 {Z:30,s:"Zn",n:"zinek",    en:1.65,i1:906.4, ea:null, r:122,ox:"+II",                 cat:"kov",    val:"2",        ion:"Zn²⁺"},
 {Z:31,s:"Ga",n:"gallium",  en:1.81,i1:578.8, ea:41.5, r:122,ox:"+III",                cat:"kov",    val:"3",        ion:"Ga³⁺"},
 {Z:32,s:"Ge",n:"germanium",en:2.01,i1:762.0, ea:118.9,r:120,ox:"+IV (+II)",           cat:"polokov",val:"4",        ion:null},
 {Z:33,s:"As",n:"arsen",    en:2.18,i1:947.0, ea:77.7, r:119,ox:"−III, +III, +V",      cat:"polokov",val:"3, 5",     ion:null},
 {Z:34,s:"Se",n:"selen",    en:2.55,i1:941.0, ea:195.0,r:120,ox:"−II, +IV, +VI",       cat:"nekov",  val:"2, 4, 6",  ion:"Se²⁻"},
 {Z:35,s:"Br",n:"brom",     en:2.96,i1:1139.9,ea:324.5,r:120,ox:"−I, +I, +V (+III, +VII)",cat:"nekov",val:"1, 3, 5, 7",ion:"Br⁻"},
 {Z:36,s:"Kr",n:"krypton",  en:3.00,i1:1350.8,ea:null, r:116,ox:"0 (+II)",             cat:"vzácný plyn",val:"0 (2)",ion:null},
 {Z:37,s:"Rb",n:"rubidium", en:0.82,i1:403.0, ea:46.9, r:220,ox:"+I",                  cat:"kov",    val:"1",        ion:"Rb⁺"},
 {Z:38,s:"Sr",n:"stroncium",en:0.95,i1:549.5, ea:5.0,  r:195,ox:"+II",                 cat:"kov",    val:"2",        ion:"Sr²⁺"},
 {Z:39,s:"Y", n:"yttrium",  en:1.22,i1:600.0, ea:29.6, r:190,ox:"+III",                cat:"kov",    val:"3",        ion:"Y³⁺"},
 {Z:40,s:"Zr",n:"zirkonium",en:1.33,i1:640.1, ea:41.8, r:175,ox:"+IV",                 cat:"kov",    val:"4",        ion:"Zr⁴⁺ (formálně)"},
 {Z:41,s:"Nb",n:"niob",     en:1.60,i1:652.1, ea:88.5, r:164,ox:"+V",                  cat:"kov",    val:"5",        ion:null},
 {Z:42,s:"Mo",n:"molybden", en:2.16,i1:684.3, ea:72.1, r:154,ox:"+VI (+IV)",           cat:"kov",    val:"proměnlivá",ion:"MoO₄²⁻"},
 {Z:43,s:"Tc",n:"technecium",en:1.90,i1:702.0,ea:53.0, r:147,ox:"+VII (+IV)",          cat:"kov",    val:"proměnlivá",ion:"TcO₄⁻"},
 {Z:44,s:"Ru",n:"ruthenium",en:2.20,i1:710.2, ea:101.0,r:146,ox:"+III, +IV (+VIII)",   cat:"kov",    val:"proměnlivá",ion:null},
 {Z:45,s:"Rh",n:"rhodium",  en:2.28,i1:719.7, ea:110.3,r:142,ox:"+III",                cat:"kov",    val:"proměnlivá",ion:"Rh³⁺"},
 {Z:46,s:"Pd",n:"palladium",en:2.20,i1:804.4, ea:54.2, r:139,ox:"+II (+IV)",           cat:"kov",    val:"2, 4",     ion:"Pd²⁺"},
 {Z:47,s:"Ag",n:"stříbro",  en:1.93,i1:731.0, ea:125.9,r:145,ox:"+I",                  cat:"kov",    val:"1",        ion:"Ag⁺"},
 {Z:48,s:"Cd",n:"kadmium",  en:1.69,i1:867.8, ea:null, r:144,ox:"+II",                 cat:"kov",    val:"2",        ion:"Cd²⁺"},
 {Z:49,s:"In",n:"indium",   en:1.78,i1:558.3, ea:37.0, r:142,ox:"+III (+I)",           cat:"kov",    val:"3",        ion:"In³⁺"},
 {Z:50,s:"Sn",n:"cín",      en:1.96,i1:708.6, ea:107.3,r:139,ox:"+II, +IV",            cat:"kov",    val:"2, 4",     ion:"Sn²⁺"},
 {Z:51,s:"Sb",n:"antimon",  en:2.05,i1:834.0, ea:101.1,r:139,ox:"+III, +V (−III)",     cat:"polokov",val:"3, 5",     ion:null},
 {Z:52,s:"Te",n:"tellur",   en:2.10,i1:869.3, ea:190.2,r:138,ox:"−II, +IV, +VI",       cat:"polokov",val:"2, 4, 6",  ion:"Te²⁻"},
 {Z:53,s:"I", n:"jod",      en:2.66,i1:1008.4,ea:295.2,r:139,ox:"−I, +I, +V, +VII",    cat:"nekov",  val:"1, 3, 5, 7",ion:"I⁻"},
 {Z:54,s:"Xe",n:"xenon",    en:2.60,i1:1170.4,ea:null, r:140,ox:"0 (+II, +IV, +VI)",   cat:"vzácný plyn",val:"0 (2, 4, 6)",ion:null},
 {Z:55,s:"Cs",n:"cesium",   en:0.79,i1:375.7, ea:45.5, r:244,ox:"+I",                  cat:"kov",    val:"1",        ion:"Cs⁺"},
 {Z:56,s:"Ba",n:"baryum",   en:0.89,i1:502.9, ea:14.0, r:215,ox:"+II",                 cat:"kov",    val:"2",        ion:"Ba²⁺"},
 {Z:57,s:"La",n:"lanthan",  en:1.10,i1:538.1, ea:45.4, r:207,ox:"+III",                cat:"kov",    val:"3",        ion:"La³⁺"},
 {Z:74,s:"W", n:"wolfram",  en:2.36,i1:770.0, ea:78.8, r:162,ox:"+VI (+IV)",           cat:"kov",    val:"proměnlivá",ion:"WO₄²⁻"},
 {Z:78,s:"Pt",n:"platina",  en:2.28,i1:870.0, ea:205.0,r:136,ox:"+II, +IV",            cat:"kov",    val:"2, 4",     ion:"Pt²⁺"},
 {Z:79,s:"Au",n:"zlato",    en:2.54,i1:890.1, ea:222.8,r:136,ox:"+I, +III",            cat:"kov",    val:"1, 3",     ion:"Au³⁺, Au⁺"},
 {Z:80,s:"Hg",n:"rtuť",     en:2.00,i1:1007.1,ea:null, r:132,ox:"+I, +II",             cat:"kov",    val:"1, 2",     ion:"Hg²⁺, Hg₂²⁺"},
 {Z:81,s:"Tl",n:"thallium", en:1.62,i1:589.4, ea:30.9, r:145,ox:"+I (+III)",           cat:"kov",    val:"1, 3",     ion:"Tl⁺"},
 {Z:82,s:"Pb",n:"olovo",    en:2.33,i1:715.6, ea:34.4, r:146,ox:"+II, +IV",            cat:"kov",    val:"2, 4",     ion:"Pb²⁺"},
 {Z:83,s:"Bi",n:"bismut",   en:2.02,i1:703.0, ea:90.9, r:148,ox:"+III (+V)",           cat:"kov",    val:"3, 5",     ion:"Bi³⁺"},
 {Z:86,s:"Rn",n:"radon",    en:null,i1:1037.0,ea:null, r:150,ox:"0",                   cat:"vzácný plyn",val:"0",    ion:null},
 {Z:87,s:"Fr",n:"francium", en:0.70,i1:393.0, ea:46.9, r:260,ox:"+I",                  cat:"kov",    val:"1",        ion:"Fr⁺"},
 {Z:88,s:"Ra",n:"radium",   en:0.90,i1:509.3, ea:9.6,  r:221,ox:"+II",                 cat:"kov",    val:"2",        ion:"Ra²⁺"}
];
function EL(Z){ for(var i=0;i<ELEMENTS.length;i++){ if(ELEMENTS[i].Z===Z) return ELEMENTS[i]; } return null; }
function ELS(sym){ for(var i=0;i<ELEMENTS.length;i++){ if(ELEMENTS[i].s===sym) return ELEMENTS[i]; } return null; }

/* ------------------------------------------------------------
   Elektronová konfigurace — výstavbový (Madelungův) princip
   ORDER = pořadí obsazování podle rostoucího n+l (při shodě nižší n)
   EXC   = známé výjimky (Cr, Cu, Nb, Mo, Ru, Rh, Pd, Ag, La, Ce, Gd, Pt, Au…)
   ------------------------------------------------------------ */
var ORDER=[[1,0],[2,0],[2,1],[3,0],[3,1],[4,0],[3,2],[4,1],[5,0],[4,2],[5,1],[6,0],[4,3],[5,2],[6,1],[7,0],[5,3],[6,2],[7,1]];
var LSYM=["s","p","d","f"];
var SHELLS=["K","L","M","N","O","P","Q"];
var EXC={
  24:{"3d":5,"4s":1}, 29:{"3d":10,"4s":1},
  41:{"4d":4,"5s":1}, 42:{"4d":5,"5s":1}, 44:{"4d":7,"5s":1}, 45:{"4d":8,"5s":1}, 46:{"4d":10,"5s":0}, 47:{"4d":10,"5s":1},
  57:{"4f":0,"5d":1}, 58:{"4f":1,"5d":1}, 64:{"4f":7,"5d":1},
  78:{"5d":9,"6s":1}, 79:{"5d":10,"6s":1},
  89:{"5f":0,"6d":1}, 90:{"5f":0,"6d":2}, 91:{"5f":2,"6d":1}, 92:{"5f":3,"6d":1}
};
var EXC_NOTE={
  24:"Chrom: místo očekávaného 3d⁴ 4s² má <b>3d⁵ 4s¹</b>. Zpola zaplněná podslupka d (pět nepárových elektronů, každý ve vlastním orbitalu) je energeticky výhodnější než 3d⁴ 4s² — přesun jednoho elektronu z 4s se vyplatí.",
  29:"Měď: místo 3d⁹ 4s² má <b>3d¹⁰ 4s¹</b>. Zcela zaplněná podslupka d je mimořádně stabilní, proto elektron z 4s „přeskočí“ do 3d. Stejný jev je u stříbra (4d¹⁰ 5s¹) a zlata (5d¹⁰ 6s¹).",
  41:"Niob: 4d⁴ 5s¹ místo 4d³ 5s². Ve 5. periodě jsou hladiny 4d a 5s tak blízko, že výjimek přibývá (Nb, Mo, Ru, Rh, Pd, Ag).",
  42:"Molybden: 4d⁵ 5s¹ — stejná logika jako u chromu, zpola zaplněná podslupka d.",
  44:"Ruthenium: 4d⁷ 5s¹. Jedna z méně známých výjimek 5. periody; u maturity se nezkouší.",
  45:"Rhodium: 4d⁸ 5s¹. Výjimka 5. periody, u maturity se nezkouší.",
  46:"Palladium: 4d¹⁰ 5s⁰ — jediný prvek, kde jsou oba elektrony z 5s přesunuty do d. Zcela zaplněná 4d podslupka převáží nad vším.",
  47:"Stříbro: 4d¹⁰ 5s¹ — stejná logika jako u mědi, zcela zaplněná podslupka d.",
  57:"Lanthan: 5d¹ 6s² místo 4f¹ 6s². Podslupka 4f se začíná plnit až u ceru; lanthan je proto formálně d-prvek a dal jméno celé řadě lanthanoidů.",
  78:"Platina: 5d⁹ 6s¹ místo 5d⁸ 6s². Výjimka 6. periody.",
  79:"Zlato: 5d¹⁰ 6s¹ — stejný důvod jako u mědi a stříbra (zcela zaplněná podslupka d)."
};
var SUPS={"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹"};
function sup(n){ return String(n).split("").map(function(c){return SUPS[c]||c;}).join(""); }
var NOBLE=[2,10,18,36,54,86];
var NOBLE_SYM={2:"He",10:"Ne",18:"Ar",36:"Kr",54:"Xe",86:"Rn"};

/* vrátí pole podslupek v pořadí obsazování: {n,l,e,cap,key} — cap = kapacita, key = "3d" */
function cfgRaw(Z){
  var left=Z, subs=[];
  ORDER.forEach(function(o){
    var n=o[0], l=o[1], cap=2*(2*l+1), e=Math.min(left,cap);
    if(e>0){ subs.push({n:n,l:l,e:e,cap:cap,key:n+LSYM[l]}); left-=e; }
  });
  return subs;
}
function cfg(Z){
  var subs=cfgRaw(Z), ex=EXC[Z];
  if(ex){
    Object.keys(ex).forEach(function(k){
      var found=null;
      subs.forEach(function(s){ if(s.key===k) found=s; });
      if(found){ found.e=ex[k]; }
      else {
        var n=+k[0], l=LSYM.indexOf(k[1]);
        var idx=-1; ORDER.forEach(function(o,i){ if(o[0]===n&&o[1]===l) idx=i; });
        var ins=subs.length;
        for(var i=0;i<subs.length;i++){ var oi=-1; ORDER.forEach(function(o,j){ if(o[0]===subs[i].n&&o[1]===subs[i].l) oi=j; }); if(oi>idx){ ins=i; break; } }
        subs.splice(ins,0,{n:n,l:l,e:ex[k],cap:2*(2*l+1),key:k});
      }
    });
    subs=subs.filter(function(s){return s.e>0;});
  }
  return subs;
}
function subsStr(subs){ return subs.map(function(s){ return s.key+sup(s.e); }).join(" "); }
function shellOrder(subs){ return subs.slice().sort(function(a,b){ return a.n-b.n || a.l-b.l; }); }
function coreZ(Z){ var c=0; NOBLE.forEach(function(g){ if(g<Z) c=g; }); return c; }
/* plná konfigurace (v pořadí slupek) */
function cfgFull(Z){ return subsStr(shellOrder(cfg(Z))); }
/* plná konfigurace v pořadí obsazování */
function cfgFill(Z){ return subsStr(cfg(Z)); }
/* zkrácená konfigurace se vzácným plynem, valenční část v pořadí slupek */
function cfgShort(Z){
  var c=coreZ(Z); if(!c) return cfgFull(Z);
  var core=cfg(c), all=cfg(Z);
  var rest=all.filter(function(s){
    var same=false; core.forEach(function(k){ if(k.key===s.key && k.e===s.e) same=true; });
    return !same;
  });
  return "["+NOBLE_SYM[c]+"] "+subsStr(shellOrder(rest));
}
function cfgValence(Z){
  var c=coreZ(Z), core=c?cfg(c):[], all=cfg(Z);
  return all.filter(function(s){ var same=false; core.forEach(function(k){ if(k.key===s.key && k.e===s.e) same=true; }); return !same; });
}
function period(Z){ var m=1; cfgRaw(Z).forEach(function(s){ if(s.n>m) m=s.n; }); return m; }
function block(Z){
  if(Z===57||Z===89) return "d";
  var raw=cfgRaw(Z); return LSYM[raw[raw.length-1].l];
}
function group(Z){
  if(Z===2) return 18;
  var b=block(Z), p=period(Z), subs=cfg(Z), ns=0, np=0, nd=0;
  subs.forEach(function(s){ if(s.n===p&&s.l===0) ns=s.e; if(s.n===p&&s.l===1) np=s.e; if(s.n===p-1&&s.l===2) nd=s.e; });
  if(b==="s") return ns;
  if(b==="p") return 10+ns+np;
  if(b==="d") return ns+nd;
  return null;
}
function valenceCount(Z){
  var p=period(Z), b=block(Z), v=0;
  cfg(Z).forEach(function(s){ if(s.n===p) v+=s.e; if(b==="d"&&s.n===p-1&&s.l===2) v+=s.e; });
  return v;
}
function unpaired(Z){
  var u=0; cfg(Z).forEach(function(s){ var m=2*s.l+1; u+= s.e<=m ? s.e : 2*m-s.e; }); return u;
}
/* konfigurace iontu: u kationtů se odebírají nejdřív elektrony s nejvyšším n (np, pak ns), teprve pak (n−1)d */
function cfgIon(Z,charge){
  var subs=shellOrder(cfg(Z)).map(function(s){ return {n:s.n,l:s.l,e:s.e,cap:s.cap,key:s.key}; });
  if(charge<0){
    var add=-charge;
    /* anionty: doplní se nejvyšší p (nebo s) podslupka */
    for(var i=subs.length-1;i>=0&&add>0;i--){ var room=subs[i].cap-subs[i].e; var t=Math.min(room,add); subs[i].e+=t; add-=t; }
    if(add>0){ var last=subs[subs.length-1]; subs.push({n:last.n,l:last.l+1,e:add,cap:2*(2*(last.l+1)+1),key:last.n+LSYM[last.l+1]}); }
  } else {
    var rem=charge;
    /* seřadit kandidáty: nejvyšší n první, v rámci n nejvyšší l první (np před ns), pak nižší n */
    var order=subs.slice().sort(function(a,b){ return b.n-a.n || b.l-a.l; });
    order.forEach(function(s){ if(rem>0){ var t=Math.min(s.e,rem); s.e-=t; rem-=t; } });
    subs=subs.filter(function(s){return s.e>0;});
  }
  return subs;
}
function cfgIonShort(Z,charge){
  var subs=cfgIon(Z,charge), N=Z-charge;
  var c=0; NOBLE.forEach(function(g){ if(g<=N) c=g; });
  if(!c) return subsStr(subs);
  var core=cfg(c);
  var rest=subs.filter(function(s){ var same=false; core.forEach(function(k){ if(k.key===s.key&&k.e===s.e) same=true; }); return !same; });
  if(!rest.length) return "["+NOBLE_SYM[c]+"]";
  return "["+NOBLE_SYM[c]+"] "+subsStr(rest);
}

/* ------------------------------------------------------------
   Postupné ionizační energie [kJ·mol⁻¹] (CRC) — pro trenažér
   ------------------------------------------------------------ */
var IE_SERIES=[
 {s:"Li",g:1, ie:[520,7298,11815]},
 {s:"Be",g:2, ie:[900,1757,14849,21007]},
 {s:"B", g:13,ie:[801,2427,3660,25026,32827]},
 {s:"C", g:14,ie:[1087,2353,4621,6223,37831,47277]},
 {s:"N", g:15,ie:[1402,2856,4578,7475,9445,53267,64360]},
 {s:"Na",g:1, ie:[496,4562,6910,9543,13354,16613]},
 {s:"Mg",g:2, ie:[738,1451,7733,10543,13630,18020]},
 {s:"Al",g:13,ie:[578,1817,2745,11577,14842,18379]},
 {s:"Si",g:14,ie:[787,1577,3232,4356,16091,19805]},
 {s:"P", g:15,ie:[1012,1907,2914,4964,6274,21267,25431]},
 {s:"S", g:16,ie:[1000,2252,3357,4556,7004,8496,27107,31719]},
 {s:"Cl",g:17,ie:[1251,2298,3822,5159,6542,9362,11018,33604]},
 {s:"K", g:1, ie:[419,3052,4420,5877,7975]},
 {s:"Ca",g:2, ie:[590,1145,4912,6491,8153]}
];

/* ------------------------------------------------------------
   Iontové poloměry (Shannon, koordinační číslo 6) [pm]
   ------------------------------------------------------------ */
var ISO_SERIES={
  Ne:{core:"Ne",n:10,items:[{ion:"N³⁻",Z:7,r:146},{ion:"O²⁻",Z:8,r:140},{ion:"F⁻",Z:9,r:133},{ion:"Na⁺",Z:11,r:102},{ion:"Mg²⁺",Z:12,r:72},{ion:"Al³⁺",Z:13,r:54}]},
  Ar:{core:"Ar",n:18,items:[{ion:"P³⁻",Z:15,r:212},{ion:"S²⁻",Z:16,r:184},{ion:"Cl⁻",Z:17,r:181},{ion:"K⁺",Z:19,r:138},{ion:"Ca²⁺",Z:20,r:100},{ion:"Sc³⁺",Z:21,r:75},{ion:"Ti⁴⁺",Z:22,r:61}]}
};
var ATOM_VS_ION=[
 {a:"Li",ra:128,ion:"Li⁺",ri:76},{a:"Na",ra:166,ion:"Na⁺",ri:102},{a:"K",ra:203,ion:"K⁺",ri:138},
 {a:"Mg",ra:141,ion:"Mg²⁺",ri:72},{a:"Al",ra:121,ion:"Al³⁺",ri:54},{a:"Fe",ra:132,ion:"Fe²⁺ / Fe³⁺",ri:78},
 {a:"F",ra:57,ion:"F⁻",ri:133},{a:"Cl",ra:102,ion:"Cl⁻",ri:181},{a:"O",ra:66,ion:"O²⁻",ri:140},{a:"S",ra:105,ion:"S²⁻",ri:184}
];

/* ------------------------------------------------------------
   Trenažér konfigurací iontů
   ------------------------------------------------------------ */
var IONS=[
 {Z:11,ch:1, lab:"Na⁺"},
 {Z:12,ch:2, lab:"Mg²⁺"},
 {Z:13,ch:3, lab:"Al³⁺"},
 {Z:17,ch:-1,lab:"Cl⁻"},
 {Z:8, ch:-2,lab:"O²⁻"},
 {Z:16,ch:-2,lab:"S²⁻"},
 {Z:26,ch:2, lab:"Fe²⁺"},
 {Z:26,ch:3, lab:"Fe³⁺"},
 {Z:29,ch:1, lab:"Cu⁺"},
 {Z:29,ch:2, lab:"Cu²⁺"},
 {Z:30,ch:2, lab:"Zn²⁺"},
 {Z:22,ch:4, lab:"Ti⁴⁺"},
 {Z:47,ch:1, lab:"Ag⁺"},
 {Z:82,ch:2, lab:"Pb²⁺"}
];

/* ------------------------------------------------------------
   Modely atomu — časová osa
   ------------------------------------------------------------ */
var MODELS=[
 {k:"dalton",   who:"John Dalton", year:"1803–1808", t:"Kulový (nedělitelný) atom",
  ok:["zákon stálých a násobných poměrů slučovacích","hmotnost se zachovává — atomy se jen přeskupují","každý prvek má svůj druh atomů s určitou hmotností"],
  bad:["atom není nedělitelný — nevysvětlí elektřinu, katodové záření ani radioaktivitu","nic neříká o vnitřní stavbě"],
  exp:"Atom je malá, plná, nedělitelná kulička; atomy téhož prvku jsou stejné. Byl to chemický, ne fyzikální model — Dalton potřeboval vysvětlit, proč se prvky slučují v celočíselných poměrech."},
 {k:"thomson",  who:"Joseph John Thomson", year:"1897 elektron · 1904 model", t:"Pudinkový model",
  ok:["objev elektronu (1897, katodové paprsky) — atom je dělitelný","atom je navenek neutrální: záporné elektrony v kladné „hmotě“","poměr náboje a hmotnosti elektronu"],
  bad:["neexistuje jádro — kladný náboj je rozptýlený v celém objemu","nevysvětlí rozptyl α-částic (Rutherford 1909–1911)"],
  exp:"Kladně nabitá koule o průměru asi 10⁻¹⁰ m, v níž jsou jako rozinky v pudinku (nebo „hrozinky v těstě“) zapíchnuté záporné elektrony. Poprvé měl atom vnitřní strukturu."},
 {k:"rutherford",who:"Ernest Rutherford", year:"1909–1911", t:"Planetární (jaderný) model",
  ok:["pokus s rozptylem α-částic na zlaté fólii (Geiger, Marsden): většina prošla, 1 z 8000 se odrazila","kladný náboj a téměř celá hmotnost jsou v maličkém jádru (≈10⁻¹⁵ m)","elektrony obíhají kolem jádra jako planety; atom je z 99,99 % prázdný"],
  bad:["obíhající elektron by podle Maxwella vyzařoval a za ≈10⁻¹⁰ s spadl do jádra","nevysvětlí čárové spektrum atomů (spektrum by bylo spojité)"],
  exp:"Jádro s kladným nábojem uprostřed, elektrony obíhají po libovolných drahách. Model správně popsal jádro, ale byl v rozporu s klasickou elektrodynamikou: obíhající náboj vyzařuje energii."},
 {k:"bohr",     who:"Niels Bohr", year:"1913", t:"Kvantovaný planetární model",
  ok:["elektron smí obíhat jen po dovolených drahách s energií E_n = −13,6 eV / n² — bez vyzařování","foton se vyzáří / pohltí jen při přeskoku mezi hladinami: ΔE = h·f","přesně vysvětlil čárové spektrum vodíku (Balmerova série) a Rydbergův vzorec"],
  bad:["funguje jen pro atom vodíku a ionty s jedním elektronem (He⁺, Li²⁺)","nevysvětlí intenzity čar, jemnou strukturu ani chemickou vazbu","postuláty jsou „ad hoc“ — proč zrovna tyhle dráhy?"],
  exp:"Rutherfordův atom doplněný o postuláty: dovolené jsou jen dráhy s momentem hybnosti n·h/2π, na nich elektron nezáří, foton vzniká jen přeskokem. Na dvacet let to byl nejlepší model — a dodnes se kreslí v učebnicích."},
 {k:"qm",       who:"de Broglie · Heisenberg · Schrödinger", year:"1924 · 1926 · 1927", t:"Kvantově-mechanický model",
  ok:["elektron má vlnové vlastnosti (de Broglie 1924: λ = h/mv)","Schrödingerova rovnice (1926) → vlnová funkce ψ a energie; kvantová čísla vyplynou samy","Heisenbergův princip neurčitosti (1927): dráhu nelze znát, jen pravděpodobnost → orbital","funguje pro všechny atomy, molekuly, vazbu i periodickou tabulku"],
  bad:["přesně řešitelný jen pro vodík — u ostatních atomů se počítá přibližně (numericky)","je neintuitivní: elektron není kulička ani vlna, ale obojí"],
  exp:"Elektron popisuje vlnová funkce ψ; její druhá mocnina |ψ|² udává hustotu pravděpodobnosti výskytu. Místo dráhy máme orbital — oblast, kde je elektron s pravděpodobností ≥ 90 %. Tvar a energii orbitalu určují tři kvantová čísla, čtvrté (spin) popisuje elektron sám."}
];

/* ------------------------------------------------------------
   Bohrův model — konstanty
   ------------------------------------------------------------ */
var RYD=1.097e7;      /* m⁻¹ */
var E1=13.6;          /* eV */
var HC=1240;          /* eV·nm */
var SERIES={1:"Lymanova",2:"Balmerova",3:"Paschenova",4:"Brackettova",5:"Pfundova"};
function bohrE(n){ return -E1/(n*n); }
function bohrLambda(n1,n2){ return 1/(RYD*(1/(n1*n1)-1/(n2*n2)))*1e9; }
function lambdaColor(nm){
  if(nm<380) return {name:"ultrafialová",css:"var(--cat2)"};
  if(nm<450) return {name:"fialová",css:"var(--cat2)"};
  if(nm<495) return {name:"modrá (azurová)",css:"var(--endo)"};
  if(nm<570) return {name:"zelená",css:"var(--cat1)"};
  if(nm<590) return {name:"žlutá",css:"var(--cat3)"};
  if(nm<620) return {name:"oranžová",css:"var(--exo)"};
  if(nm<=750) return {name:"červená",css:"var(--accent)"};
  return {name:"infračervená",css:"var(--ink-3)"};
}

/* ------------------------------------------------------------
   Excitace a vaznost — rámečkové diagramy
   ------------------------------------------------------------ */
var EXCIT={
  C:{name:"uhlík",core:"[He]",states:[
     {lab:"základní",boxes:[["2s",2],["2p",1,1,0]],val:2,note:"Dva nepárové elektrony v 2p → vaznost 2. Takový uhlík existuje jen v karbenech; v běžných sloučeninách je čtyřvazný."},
     {lab:"excitovaný",boxes:[["2s",1],["2p",1,1,1]],val:4,note:"Jeden elektron z 2s přeskočil do prázdného 2p. Excitace stojí asi 400 kJ·mol⁻¹, ale dvě vazby navíc vrátí zhruba 800 kJ·mol⁻¹ — vyplatí se. Proto je uhlík v CH₄, CO₂ i diamantu čtyřvazný."}]},
  N:{name:"dusík",core:"[He]",states:[
     {lab:"základní",boxes:[["2s",2],["2p",1,1,1]],val:3,note:"Tři nepárové elektrony → vaznost 3 (NH₃, N₂). Čtvrtou vazbu (NH₄⁺) dusík tvoří jen donorově — poskytne celý volný pár z 2s. Excitovat nemá kam: 2. slupka nemá orbitaly d, a proto neexistuje pětivazný dusík."}]},
  P:{name:"fosfor",core:"[Ne]",states:[
     {lab:"základní",boxes:[["3s",2],["3p",1,1,1],["3d",0,0,0,0,0]],val:3,note:"Tři nepárové elektrony → vaznost 3 (PH₃, PCl₃)."},
     {lab:"excitovaný",boxes:[["3s",1],["3p",1,1,1],["3d",1,0,0,0,0]],val:5,note:"Elektron z 3s přeskočí do prázdného 3d → pět nepárových elektronů → vaznost 5 (PCl₅, H₃PO₄). Rozdíl proti dusíku: 3. slupka má volné orbitaly d."}]},
  S:{name:"síra",core:"[Ne]",states:[
     {lab:"základní",boxes:[["3s",2],["3p",2,1,1],["3d",0,0,0,0,0]],val:2,note:"Dva nepárové elektrony → vaznost 2 (H₂S, S₈)."},
     {lab:"excitovaný 1",boxes:[["3s",2],["3p",1,1,1],["3d",1,0,0,0,0]],val:4,note:"Jeden elektron z 3p přeskočí do 3d → čtyři nepárové → vaznost 4 (SO₂, SF₄)."},
     {lab:"excitovaný 2",boxes:[["3s",1],["3p",1,1,1],["3d",1,1,0,0,0]],val:6,note:"Ještě elektron z 3s → šest nepárových → vaznost 6 (SF₆, H₂SO₄, SO₃)."}]},
  Cl:{name:"chlor",core:"[Ne]",states:[
     {lab:"základní",boxes:[["3s",2],["3p",2,2,1],["3d",0,0,0,0,0]],val:1,note:"Jeden nepárový elektron → vaznost 1 (HCl, Cl₂, NaCl)."},
     {lab:"excitovaný 1",boxes:[["3s",2],["3p",2,1,1],["3d",1,0,0,0,0]],val:3,note:"Tři nepárové → vaznost 3 (ClF₃, HClO₂)."},
     {lab:"excitovaný 2",boxes:[["3s",2],["3p",1,1,1],["3d",1,1,0,0,0]],val:5,note:"Pět nepárových → vaznost 5 (ClF₅, HClO₃)."},
     {lab:"excitovaný 3",boxes:[["3s",1],["3p",1,1,1],["3d",1,1,1,0,0]],val:7,note:"Sedm nepárových → vaznost 7 (HClO₄, Cl₂O₇). Vaznost halogenů roste po dvou: 1, 3, 5, 7."}]},
  F:{name:"fluor",core:"[He]",states:[
     {lab:"základní",boxes:[["2s",2],["2p",2,2,1]],val:1,note:"Jeden nepárový elektron → vaznost 1. Fluor je ve 2. periodě — nemá orbitaly d, kam by excitoval. Proto je <b>vždy jednovazný</b> a má jediné oxidační číslo −I. Na tenhle rozdíl mezi F a Cl se ptají přijímačky."}]}
};

/* ------------------------------------------------------------
   Rozložení periodické tabulky (sloupec, řádek) pro čtečku a heat mapu
   ------------------------------------------------------------ */
function ptPos(Z){
  var p=period(Z), g=group(Z);
  if(g===null) return null;
  return {col:g,row:p};
}
