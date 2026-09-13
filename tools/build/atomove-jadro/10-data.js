/* ============================================================
   2 · DATA — prvky, stabilní nuklidy, tabulka nuklidů, řady
   ============================================================ */
var LN2 = Math.LN2;
var YEAR = 3.15576e7;           /* s */
var U_MEV = 931.494;            /* MeV na 1 u */
var NA = 6.02214e23;

var ELEM = "H,He,Li,Be,B,C,N,O,F,Ne,Na,Mg,Al,Si,P,S,Cl,Ar,K,Ca,Sc,Ti,V,Cr,Mn,Fe,Co,Ni,Cu,Zn,Ga,Ge,As,Se,Br,Kr,Rb,Sr,Y,Zr,Nb,Mo,Tc,Ru,Rh,Pd,Ag,Cd,In,Sn,Sb,Te,I,Xe,Cs,Ba,La,Ce,Pr,Nd,Pm,Sm,Eu,Gd,Tb,Dy,Ho,Er,Tm,Yb,Lu,Hf,Ta,W,Re,Os,Ir,Pt,Au,Hg,Tl,Pb,Bi,Po,At,Rn,Fr,Ra,Ac,Th,Pa,U,Np,Pu,Am,Cm,Bk,Cf,Es,Fm,Md,No,Lr".split(",");
var ENAME = "vodík,helium,lithium,beryllium,bor,uhlík,dusík,kyslík,fluor,neon,sodík,hořčík,hliník,křemík,fosfor,síra,chlor,argon,draslík,vápník,skandium,titan,vanad,chrom,mangan,železo,kobalt,nikl,měď,zinek,gallium,germanium,arsen,selen,brom,krypton,rubidium,stroncium,yttrium,zirkonium,niob,molybden,technecium,ruthenium,rhodium,palladium,stříbro,kadmium,indium,cín,antimon,tellur,jod,xenon,cesium,baryum,lanthan,cer,praseodym,neodym,promethium,samarium,europium,gadolinium,terbium,dysprosium,holmium,erbium,thulium,ytterbium,lutecium,hafnium,tantal,wolfram,rhenium,osmium,iridium,platina,zlato,rtuť,thallium,olovo,bismut,polonium,astat,radon,francium,radium,aktinium,thorium,protaktinium,uran,neptunium,plutonium,americium,curium,berkelium,kalifornium,einsteinium,fermium,mendelevium,nobelium,lawrencium".split(",");
function elSym(Z){ return ELEM[Z-1]||"?"; }
function elName(Z){ return ENAME[Z-1]||"neznámý prvek"; }

/* Stabilní nuklidy: "Z:A,A,A;Z:…" (bez dlouhodobých primordiálních radionuklidů jako ⁴⁰K, ⁸⁷Rb, ²⁰⁹Bi) */
var STABLE_SRC = "1:1,2;2:3,4;3:6,7;4:9;5:10,11;6:12,13;7:14,15;8:16,17,18;9:19;10:20,21,22;11:23;12:24,25,26;13:27;14:28,29,30;15:31;16:32,33,34,36;17:35,37;18:36,38,40;19:39,41;20:40,42,43,44,46,48;21:45;22:46,47,48,49,50;23:51;24:50,52,53,54;25:55;26:54,56,57,58;27:59;28:58,60,61,62,64;29:63,65;30:64,66,67,68,70;31:69,71;32:70,72,73,74;33:75;34:74,76,77,78,80;35:79,81;36:78,80,82,83,84,86;37:85;38:84,86,87,88;39:89;40:90,91,92,94;41:93;42:92,94,95,96,97,98;44:96,98,99,100,101,102,104;45:103;46:102,104,105,106,108,110;47:107,109;48:106,108,110,111,112,114;49:113;50:112,114,115,116,117,118,119,120,122,124;51:121,123;52:120,122,123,124,125,126;53:127;54:124,126,128,129,130,131,132,134,136;55:133;56:130,132,134,135,136,137,138;57:139;58:136,138,140,142;59:141;60:142,143,145,146,148;62:144,149,150,152,154;63:153;64:154,155,156,157,158,160;65:159;66:156,158,160,161,162,163,164;67:165;68:162,164,166,167,168,170;69:169;70:168,170,171,172,173,174,176;71:175;72:176,177,178,179,180;73:181;74:182,183,184,186;75:185;76:187,188,189,190,192;77:191,193;78:192,194,195,196,198;79:197;80:196,198,199,200,201,202,204;81:203,205;82:204,206,207,208";
var STABLE = {};     /* klíč "Z-A" → true */
var STABLE_LIST = [];/* [{Z,N,A}] pro mapu */
STABLE_SRC.split(";").forEach(function(p){
  var q=p.split(":"), Z=+q[0];
  q[1].split(",").forEach(function(a){ var A=+a; STABLE[Z+"-"+A]=true; STABLE_LIST.push({Z:Z,A:A,N:A-Z}); });
});
function isStable(Z,A){ return !!STABLE[Z+"-"+A]; }

/* Poloha řeky stability: Z pro dané A (empirický vztah) */
function zStab(A){ return A/(1.98+0.0155*Math.pow(A,2/3)); }
/* N na řece pro dané Z (numericky z A) */
function nStab(Z){
  var A=2*Z;
  for(var i=0;i<40;i++){ var f=zStab(A)-Z; A-= f/(zStab(A+0.5)-zStab(A-0.5)); }
  return A-Z;
}
var MAGIC=[2,8,20,28,50,82,126];

/* ---- tabulka nuklidů ---- */
function hlS(v,u){ return v*({s:1,min:60,h:3600,d:86400,y:YEAR})[u]; }
var NUCL = [
 {Z:1,A:1,st:1,d:"stabilní",hl:"—",hls:0,use:"nejběžnější nuklid vesmíru; jádro = 1 proton; základ MRI (rezonance protonů)",g:["med"]},
 {Z:1,A:2,st:1,d:"stabilní",hl:"—",hls:0,use:"deuterium (D); těžká voda D₂O jako moderátor v reaktorech; 0,0156 % vodíku",g:["ene"]},
 {Z:1,A:3,st:0,d:"β⁻",hl:"12,32 let",hls:hlS(12.32,"y"),use:"tritium (T); značení, svítící barvy, palivo pro fúzi D + T",g:["ene","dat"]},
 {Z:2,A:3,st:1,d:"stabilní",hl:"—",hls:0,use:"detektory neutronů, kryogenika",g:["det"]},
 {Z:2,A:4,st:1,d:"stabilní",hl:"—",hls:0,use:"jádro ⁴He = částice α; dvakrát magické (Z = 2, N = 2)",g:[]},
 {Z:4,A:7,st:0,d:"EC",hl:"53,2 dne",hls:hlS(53.2,"d"),use:"kosmogenní nuklid; stopovač v atmosféře",g:["dat"]},
 {Z:6,A:11,st:0,d:"β⁺",hl:"20,4 min",hls:hlS(20.4,"min"),use:"PET (značení organických látek)",g:["med"]},
 {Z:6,A:12,st:1,d:"stabilní",hl:"—",hls:0,use:"definice atomové hmotnostní jednotky u = 1/12 m(¹²C); 98,9 % uhlíku",g:[]},
 {Z:6,A:13,st:1,d:"stabilní",hl:"—",hls:0,use:"NMR spektroskopie, izotopové značení; 1,1 % uhlíku",g:["med"]},
 {Z:6,A:14,st:0,d:"β⁻",hl:"5730 let",hls:hlS(5730,"y"),use:"radiouhlíkové datování (do ≈ 50 000 let); vzniká v atmosféře z ¹⁴N",g:["dat","nat"]},
 {Z:7,A:13,st:0,d:"β⁺",hl:"9,97 min",hls:hlS(9.97,"min"),use:"PET (¹³NH₃ pro vyšetření srdce)",g:["med"]},
 {Z:7,A:14,st:1,d:"stabilní",hl:"—",hls:0,use:"99,6 % dusíku; terč pro vznik ¹⁴C kosmickými neutrony",g:[]},
 {Z:8,A:15,st:0,d:"β⁺",hl:"122 s",hls:122,use:"PET (průtok krve mozkem)",g:["med"]},
 {Z:8,A:16,st:1,d:"stabilní",hl:"—",hls:0,use:"99,76 % kyslíku; dvakrát magické jádro (8, 8)",g:[]},
 {Z:8,A:18,st:1,d:"stabilní",hl:"—",hls:0,use:"paleoklimatologie (poměr ¹⁸O/¹⁶O v ledovcích); terč pro výrobu ¹⁸F",g:["dat","med"]},
 {Z:9,A:18,st:0,d:"β⁺",hl:"109,8 min",hls:hlS(109.8,"min"),use:"PET — fluordeoxyglukóza (FDG) v onkologii",g:["med"]},
 {Z:11,A:22,st:0,d:"β⁺",hl:"2,60 roku",hls:hlS(2.6,"y"),use:"kalibrační zdroj pozitronů",g:["det"]},
 {Z:11,A:24,st:0,d:"β⁻",hl:"15,0 h",hls:hlS(15,"h"),use:"stopovač sodíku v organismu, měření objemu krve",g:["med"]},
 {Z:15,A:30,st:0,d:"β⁺",hl:"2,50 min",hls:hlS(2.5,"min"),use:"první uměle připravený radionuklid (Joliot-Curieovi, 1934)",g:["nat"]},
 {Z:15,A:32,st:0,d:"β⁻",hl:"14,27 dne",hls:hlS(14.27,"d"),use:"značení DNA a fosfátů; léčba polycytemie",g:["med"]},
 {Z:17,A:35,st:1,d:"stabilní",hl:"—",hls:0,use:"75,76 % chloru; s ³⁷Cl dává Ar(Cl) = 35,45",g:[]},
 {Z:17,A:37,st:1,d:"stabilní",hl:"—",hls:0,use:"24,24 % chloru",g:[]},
 {Z:19,A:40,st:0,d:"β⁻ (89 %) / EC (11 %)",hl:"1,25·10⁹ let",hls:hlS(1.248e9,"y"),use:"K–Ar datování hornin; hlavní přírodní zdroj záření v lidském těle",g:["dat","nat"]},
 {Z:26,A:55,st:0,d:"EC",hl:"2,74 roku",hls:hlS(2.74,"y"),use:"kalibrace detektorů rentgenového záření",g:["det"]},
 {Z:26,A:56,st:1,d:"stabilní",hl:"—",hls:0,use:"prakticky nejpevněji vázané jádro (8,79 MeV na nukleon) — vrchol křivky vazebné energie",g:[]},
 {Z:27,A:60,st:0,d:"β⁻ (+ γ)",hl:"5,27 roku",hls:hlS(5.27,"y"),use:"ozařování nádorů (Leksellův gama nůž), sterilizace, defektoskopie",g:["med"]},
 {Z:31,A:67,st:0,d:"EC",hl:"3,26 dne",hls:hlS(3.26,"d"),use:"scintigrafie zánětů a lymfomů",g:["med"]},
 {Z:37,A:87,st:0,d:"β⁻",hl:"4,9·10¹⁰ let",hls:hlS(4.9e10,"y"),use:"Rb–Sr datování nejstarších hornin",g:["dat","nat"]},
 {Z:38,A:90,st:0,d:"β⁻",hl:"28,8 roku",hls:hlS(28.8,"y"),use:"jaderný spad (ukládá se v kostech místo Ca); radioizotopové baterie",g:["ene","nat"]},
 {Z:42,A:99,st:0,d:"β⁻",hl:"66,0 h",hls:hlS(66,"h"),use:"mateřský nuklid v generátoru ⁹⁹Mo/⁹⁹ᵐTc",g:["med"]},
 {Z:43,A:99,m:1,st:0,d:"γ (izomerní přechod)",hl:"6,01 h",hls:hlS(6.01,"h"),use:"nejpoužívanější nuklid nukleární medicíny — scintigrafie (kosti, srdce, ledviny)",g:["med"]},
 {Z:53,A:123,st:0,d:"EC",hl:"13,2 h",hls:hlS(13.2,"h"),use:"SPECT štítné žlázy",g:["med"]},
 {Z:53,A:125,st:0,d:"EC",hl:"59,4 dne",hls:hlS(59.4,"d"),use:"brachyterapie prostaty, radioimunoanalýza",g:["med"]},
 {Z:53,A:131,st:0,d:"β⁻ (+ γ)",hl:"8,02 dne",hls:hlS(8.02,"d"),use:"léčba a diagnostika štítné žlázy; nebezpečná složka spadu (jodové tablety)",g:["med","nat"]},
 {Z:55,A:137,st:0,d:"β⁻",hl:"30,08 roku",hls:hlS(30.08,"y"),use:"hlavní dlouhodobá kontaminace po Černobylu; průmyslové ozařovače",g:["ene","nat"]},
 {Z:77,A:192,st:0,d:"β⁻",hl:"73,8 dne",hls:hlS(73.8,"d"),use:"brachyterapie, defektoskopie svarů",g:["med"]},
 {Z:81,A:201,st:0,d:"EC",hl:"73,1 h",hls:hlS(73.1,"h"),use:"zátěžové vyšetření srdce",g:["med"]},
 {Z:84,A:210,st:0,d:"α",hl:"138,4 dne",hls:hlS(138.4,"d"),use:"extrémně toxický α-zářič (vnitřní ozáření); člen řady ²³⁸U",g:["nat"]},
 {Z:86,A:222,st:0,d:"α",hl:"3,82 dne",hls:hlS(3.8235,"d"),use:"radon v domech — největší přírodní dávka pro obyvatele ČR",g:["nat"]},
 {Z:88,A:226,st:0,d:"α",hl:"1600 let",hls:hlS(1600,"y"),use:"objevili Curieovi (1898); 1 g má aktivitu 1 Ci = 3,7·10¹⁰ Bq",g:["nat"]},
 {Z:90,A:232,st:0,d:"α",hl:"1,41·10¹⁰ let",hls:hlS(1.405e10,"y"),use:"začátek thoriové řady (→ ²⁰⁸Pb); možné palivo množivých reaktorů",g:["ene","nat"]},
 {Z:92,A:235,st:0,d:"α",hl:"7,04·10⁸ let",hls:hlS(7.04e8,"y"),use:"štěpitelný nuklid — palivo reaktorů (obohacení 3–5 %); řada → ²⁰⁷Pb",g:["ene","nat"]},
 {Z:92,A:238,st:0,d:"α",hl:"4,47·10⁹ let",hls:hlS(4.468e9,"y"),use:"99,3 % přírodního uranu; U–Pb datování; začátek uranové řady (→ ²⁰⁶Pb)",g:["dat","ene","nat"]},
 {Z:94,A:239,st:0,d:"α",hl:"2,41·10⁴ let",hls:hlS(2.41e4,"y"),use:"vzniká v reaktoru z ²³⁸U; palivo, jaderné zbraně",g:["ene"]},
 {Z:95,A:241,st:0,d:"α (+ γ)",hl:"432,2 roku",hls:hlS(432.2,"y"),use:"ionizační detektory kouře (≈ 0,3 μg v hlásiči)",g:["det"]},
 {Z:98,A:252,st:0,d:"α / spontánní štěpení",hl:"2,645 roku",hls:hlS(2.645,"y"),use:"přenosný zdroj neutronů (spouštění reaktorů, analýza)",g:["det","ene"]}
];
/* rychlé vyhledání skutečného nuklidu */
function findNucl(Z,A){ for(var i=0;i<NUCL.length;i++){ if(NUCL[i].Z===Z&&NUCL[i].A===A&&!NUCL[i].m) return NUCL[i]; } return null; }

/* ---- vazebná energie na nukleon [MeV] ---- */
var BE = [
 {Z:1,A:2,b:1.112},{Z:1,A:3,b:2.827},{Z:2,A:3,b:2.573},{Z:2,A:4,b:7.074},{Z:3,A:6,b:5.332},{Z:3,A:7,b:5.606},
 {Z:4,A:9,b:6.463},{Z:5,A:11,b:6.928},{Z:6,A:12,b:7.680},{Z:7,A:14,b:7.476},{Z:8,A:16,b:7.976},{Z:10,A:20,b:8.032},
 {Z:12,A:24,b:8.261},{Z:14,A:28,b:8.448},{Z:16,A:32,b:8.493},{Z:20,A:40,b:8.551},{Z:26,A:56,b:8.790},{Z:28,A:62,b:8.795},
 {Z:30,A:64,b:8.736},{Z:36,A:84,b:8.717},{Z:47,A:107,b:8.554},{Z:50,A:120,b:8.505},{Z:58,A:140,b:8.376},
 {Z:79,A:197,b:7.916},{Z:82,A:208,b:7.867},{Z:88,A:226,b:7.662},{Z:92,A:235,b:7.591},{Z:92,A:238,b:7.570}
];

/* ---- izotopové složení pro výpočet Ar (dva izotopy) ---- */
var ISO = [
 {Z:17,n:"chlor",   a:[35,34.96885,75.76],b:[37,36.96590,24.24],Ar:35.45},
 {Z:29,n:"měď",     a:[63,62.92960,69.15],b:[65,64.92779,30.85],Ar:63.55},
 {Z:5, n:"bor",     a:[10,10.01294,19.90],b:[11,11.00931,80.10],Ar:10.81},
 {Z:35,n:"brom",    a:[79,78.91834,50.69],b:[81,80.91629,49.31],Ar:79.90},
 {Z:3, n:"lithium", a:[6,6.01512,7.59],   b:[7,7.01600,92.41],  Ar:6.94},
 {Z:47,n:"stříbro", a:[107,106.90509,51.84],b:[109,108.90476,48.16],Ar:107.87},
 {Z:31,n:"gallium", a:[69,68.92558,60.11],b:[71,70.92470,39.89],Ar:69.72}
];

/* ---- rozpadové řady: kroky [Z, A, typ, poločas] ---- */
var CHAINS = [
 {name:"Uranová řada ²³⁸U → ²⁰⁶Pb (4n + 2)", key:"u238",
  steps:[[92,238,"α","4,47·10⁹ let"],[90,234,"β⁻","24,1 d"],[91,234,"β⁻","1,17 min"],[92,234,"α","2,46·10⁵ let"],[90,230,"α","7,54·10⁴ let"],
         [88,226,"α","1600 let"],[86,222,"α","3,82 d"],[84,218,"α","3,10 min"],[82,214,"β⁻","26,8 min"],[83,214,"β⁻","19,9 min"],
         [84,214,"α","164 μs"],[82,210,"β⁻","22,3 let"],[83,210,"β⁻","5,01 d"],[84,210,"α","138,4 d"],[82,206,"stabilní","—"]]},
 {name:"Aktiniová řada ²³⁵U → ²⁰⁷Pb (4n + 3)", key:"u235",
  steps:[[92,235,"α","7,04·10⁸ let"],[90,231,"β⁻","25,5 h"],[91,231,"α","3,28·10⁴ let"],[89,227,"β⁻","21,8 let"],[90,227,"α","18,7 d"],
         [88,223,"α","11,4 d"],[86,219,"α","3,96 s"],[84,215,"α","1,78 ms"],[82,211,"β⁻","36,1 min"],[83,211,"α","2,14 min"],
         [81,207,"β⁻","4,77 min"],[82,207,"stabilní","—"]]},
 {name:"Thoriová řada ²³²Th → ²⁰⁸Pb (4n)", key:"th232",
  steps:[[90,232,"α","1,41·10¹⁰ let"],[88,228,"β⁻","5,75 let"],[89,228,"β⁻","6,15 h"],[90,228,"α","1,91 let"],[88,224,"α","3,66 d"],
         [86,220,"α","55,6 s"],[84,216,"α","0,145 s"],[82,212,"β⁻","10,6 h"],[83,212,"β⁻","60,6 min"],[84,212,"α","0,30 μs"],[82,208,"stabilní","—"]]}
];

/* ---- dávky pro srovnání [mSv] (orientační hodnoty) ---- */
var DOSES = [
 {n:"rentgen zubů",v:0.005,k:"med"},
 {n:"let Praha – New York",v:0.05,k:"nat"},
 {n:"rentgen hrudníku",v:0.1,k:"med"},
 {n:"kosmické záření za rok (ČR)",v:0.3,k:"nat"},
 {n:"mamografie",v:0.4,k:"med"},
 {n:"roční limit pro obyvatele (umělé zdroje)",v:1,k:"lim"},
 {n:"radon v bytě za rok (průměr ČR)",v:2,k:"nat"},
 {n:"celkové přírodní pozadí za rok (ČR)",v:3.3,k:"nat"},
 {n:"CT hrudníku",v:7,k:"med"},
 {n:"roční limit pro radiační pracovníky",v:20,k:"lim"},
 {n:"nejnižší dávka s prokázaným rizikem rakoviny",v:100,k:"eff"},
 {n:"jednorázově: nemoc z ozáření",v:1000,k:"eff"},
 {n:"jednorázově: smrtelná pro polovinu ozářených (bez léčby)",v:4500,k:"eff"}
];

/* ---- radiační váhové faktory ---- */
var WR = {alpha:20, beta:1, gamma:1, neutron:10};

/* ---- trenažér přeměn: mateřské nuklidy ---- */
var TRAIN = [
 {Z:92,A:238,t:"α"},{Z:88,A:226,t:"α"},{Z:86,A:222,t:"α"},{Z:84,A:210,t:"α"},{Z:94,A:239,t:"α"},{Z:95,A:241,t:"α"},{Z:90,A:232,t:"α"},{Z:84,A:214,t:"α"},{Z:92,A:235,t:"α"},
 {Z:6,A:14,t:"β⁻"},{Z:1,A:3,t:"β⁻"},{Z:27,A:60,t:"β⁻"},{Z:38,A:90,t:"β⁻"},{Z:53,A:131,t:"β⁻"},{Z:55,A:137,t:"β⁻"},{Z:15,A:32,t:"β⁻"},{Z:90,A:234,t:"β⁻"},{Z:82,A:214,t:"β⁻"},{Z:19,A:40,t:"β⁻"},
 {Z:9,A:18,t:"β⁺"},{Z:11,A:22,t:"β⁺"},{Z:6,A:11,t:"β⁺"},{Z:8,A:15,t:"β⁺"},{Z:15,A:30,t:"β⁺"},{Z:7,A:13,t:"β⁺"},
 {Z:4,A:7,t:"EC"},{Z:53,A:125,t:"EC"},{Z:26,A:55,t:"EC"},{Z:81,A:201,t:"EC"},{Z:31,A:67,t:"EC"},{Z:19,A:40,t:"EC"},
 {Z:43,A:99,t:"γ",m:1},{Z:49,A:113,t:"γ",m:1},{Z:27,A:60,t:"γ",m:1},
 {Z:2,A:5,t:"n"},{Z:36,A:87,t:"n",x:1},{Z:8,A:17,t:"n",x:1}
];
var SHIFT = { "α":[-2,-4], "β⁻":[1,0], "β⁺":[-1,0], "EC":[-1,0], "γ":[0,0], "n":[0,-1] };
var SHIFT_WRONG = {
 "α":[[-2,-2],[2,-4],[-1,-4]],
 "β⁻":[[-1,0],[1,-1],[1,1]],
 "β⁺":[[1,0],[-1,-1],[0,-1]],
 "EC":[[1,0],[-1,-1],[-2,-4]],
 "γ":[[-1,0],[1,0],[0,-1]],
 "n":[[-1,-1],[1,-1],[0,1]]
};
var DECAY_NAMES = { "α":"přeměna α", "β⁻":"přeměna β⁻", "β⁺":"přeměna β⁺", "EC":"elektronový záchyt", "γ":"emise γ (deexcitace)", "n":"emise neutronu" };
var DECAY_PART = { "α":"⁴₂He (jádro helia)", "β⁻":"e⁻ + ν̄ (elektron a antineutrino)", "β⁺":"e⁺ + ν (pozitron a neutrino)", "EC":"— (jádro pohltí elektron z obalu, vyletí neutrino)", "γ":"foton γ", "n":"neutron ¹₀n" };

/* HTML zápis nuklidu ᴬ_ZX */
function nucHTML(Z,A,m){
  return '<span class="chem"><sup>'+A+(m?"m":"")+'</sup><sub>'+Z+'</sub>'+elSym(Z)+'</span>';
}
/* prostý text (pro SVG a option) */
var SUP="⁰¹²³⁴⁵⁶⁷⁸⁹", SUB="₀₁₂₃₄₅₆₇₈₉";
function supN(n){ return String(n).split("").map(function(c){return SUP[+c];}).join(""); }
function subN(n){ return String(n).split("").map(function(c){return SUB[+c];}).join(""); }
function nucTxt(Z,A,m){ return supN(A)+(m?"ᵐ":"")+elSym(Z); }
function nucTxtZ(Z,A,m){ return supN(A)+(m?"ᵐ":"")+subN(Z)+elSym(Z); }

/* formát poločasu ze sekund do nejvhodnější jednotky */
function fmtHL(s){
  if(s>=YEAR*1e6) return fmt(s/YEAR/1e6,2)+"·10⁶ let";
  if(s>=YEAR*2) return fmt(s/YEAR,1)+" let";
  if(s>=YEAR) return fmt(s/YEAR,2)+" roku";
  if(s>=86400*2) return fmt(s/86400,1)+" dní";
  if(s>=3600*2) return fmt(s/3600,1)+" h";
  if(s>=120) return fmt(s/60,1)+" min";
  if(s>=1) return fmt(s,1)+" s";
  if(s>=1e-3) return fmt(s*1e3,1)+" ms";
  return fmt(s*1e6,1)+" μs";
}
/* vědecký zápis s českou čárkou: 3,66·10¹⁰ */
function sci(x,d){
  if(x===0) return "0";
  var e=Math.floor(Math.log10(Math.abs(x))), m=x/Math.pow(10,e);
  if(Math.abs(m)>=9.995){ m/=10; e++; }
  var es = (e<0?"⁻":"")+supN(Math.abs(e));
  return fmt(m,d===undefined?2:d)+"·10"+es;
}
