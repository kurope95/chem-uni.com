/* ============================================================
   T15 · TABULKA β (kapitola 7)
   ============================================================ */
var cbState={q:"",f:"all"};
function drawCb(){
  var q=cbState.q.toLowerCase().trim();
  var rows=BETA.filter(function(x){
    if(cbState.f!=="all" && x.l!==cbState.f) return false;
    if(!q) return true;
    return (x.f+" "+x.m+" "+x.l+" "+x.note).toLowerCase().indexOf(q)>=0;
  });
  var h="";
  rows.forEach(function(x){
    var lb=L10(x.b), pct=clamp(lb/42*100,3,100);
    var col=lb>=20?"var(--accent)":(lb>=10?"var(--exo)":"var(--ink-3)");
    h+='<tr><td class="mono" style="font-weight:600;white-space:nowrap">'+x.f+'</td><td class="mono">'+x.m+'</td><td class="mono">'+x.n+' × '+x.l+'</td>'+
       '<td class="n">'+sci(x.b,1)+'</td>'+
       '<td class="n" style="font-weight:600"><span style="display:inline-block;vertical-align:middle;width:38px">'+fmt(lb,2)+'</span>'+
       '<span style="display:inline-block;vertical-align:middle;width:46px;height:8px;border-radius:99px;background:var(--surface-3);overflow:hidden"><span style="display:block;height:100%;width:'+pct.toFixed(0)+'%;background:'+col+'"></span></span></td>'+
       '<td class="n">'+sci(1/x.b,1)+'</td><td style="font-size:.82rem;color:var(--ink-2)">'+x.note+'</td></tr>';
  });
  if(!rows.length) h='<tr><td colspan="7" style="padding:1.1rem;color:var(--ink-3)">Nic nenalezeno. Zkuste „stříbro“, „EDTA“ nebo „kyanid“.</td></tr>';
  $("#cbBody").innerHTML=h;
}
/* ============================================================
   T16 · KALKULAČKA volného kovu [M] = c(M)/(β·[L]ⁿ)
   ============================================================ */
var cxState={i:0,lm:-2,ll:0};
function drawCx(){
  var st=cxState, x=BETA[st.i], cM=Math.pow(10,st.lm), cL=Math.pow(10,st.ll);
  var free=cM/(x.b*Math.pow(cL,x.n)), pM=-L10(free);
  $("#cxCMV").textContent=conc(cM)+" mol·dm⁻³"; $("#cxCLV").textContent=conc(cL)+" mol·dm⁻³";
  ro("#cxRo1","Volné ["+x.m+"]",sci(free,2),"mol·dm⁻³","neg");
  ro("#cxRo2","p"+x.m.replace(/[⁺²³⁻]/g,""),fmt(pM,2),"= −log ["+x.m+"]");
  ro("#cxRo3","β · log β",sci(x.b,1),"log β = "+fmt(L10(x.b),2)+" · Knest = "+sci(1/x.b,1));
  ro("#cxRo4","Podíl volného kovu",sci(free/cM*100,1)+" %","z celkového množství kovu");
  var stp=[];
  stp.push(x.m+" + "+x.n+" "+x.l+" ⇌ "+x.f+" &nbsp;&nbsp;β = ["+x.f+"] / (["+x.m+"]·["+x.l+"]"+(x.n>1?sup(x.n):"")+") = "+sci(x.b,1));
  stp.push("Při nadbytku ligandu je komplex prakticky nerozložený: ["+x.f+"] ≈ c(M) = "+conc(cM)+" mol·dm⁻³");
  stp.push("["+x.m+"] = c(M) / (β · ["+x.l+"]"+(x.n>1?sup(x.n):"")+") = "+conc(cM)+" / ("+sci(x.b,1)+" · "+conc(cL)+(x.n>1?sup(x.n):"")+") = <b>"+sci(free,3)+" mol·dm⁻³</b>");
  var kspM={"Ag⁺":["AgCl",1.8e-10,"Cl⁻"],"Cu²⁺":["Cu(OH)₂",2.2e-20,"OH⁻"],"Zn²⁺":["Zn(OH)₂",3.0e-17,"OH⁻"],"Ca²⁺":["CaCO₃",3.4e-9,"CO₃²⁻"]}[x.m];
  if(kspM){
    var need=kspM[1]/free;
    stp.push("Kdy by se ještě vysrážel "+kspM[0]+"? Bylo by potřeba ["+kspM[2]+"] > Ksp/["+x.m+"] = "+sci(kspM[1],1)+" / "+sci(free,2)+" = <b>"+sci(need,2)+" mol·dm⁻³</b>"+(need>1?" — nereálné, kov je maskovaný.":" — takové koncentrace lze dosáhnout."));
  }
  $("#cxSteps").innerHTML=eqs(stp);
  $("#cxNote").innerHTML="Zkuste snížit koncentraci ligandu desetkrát: u&nbsp;komplexu s&nbsp;<b>"+x.n+"</b> ligandy vzroste volné ["+x.m+"] "+Math.pow(10,x.n).toExponential(0).replace("e+","·10^")+"×, protože ligand je ve jmenovateli na "+x.n+". Právě proto se maskovací činidlo přidává vždy ve velkém nadbytku.";
}
/* ============================================================
   T17 · GRAF — rozpouštění sraženiny komplexací
   ============================================================ */
var DS_SALTS=["AgCl","AgBr","AgI"];
var DS_LIG=[{n:"NH₃",b:1.6e7,cx:"[Ag(NH₃)₂]⁺"},{n:"S₂O₃²⁻",b:2.9e13,cx:"[Ag(S₂O₃)₂]³⁻"},{n:"CN⁻",b:1.0e21,cx:"[Ag(CN)₂]⁻"}];
var dsState={i:0,lig:0,lc:0};
function dsSol(Ksp,beta,cL){ var K=Ksp*beta, r=Math.sqrt(K); return {K:K,r:r,s:r*cL/(1+2*r)}; }
function drawDs(){
  var st=dsState, x=kspFind(DS_SALTS[st.i]), lg=DS_LIG[st.lig], cL=Math.pow(10,st.lc);
  var R=dsSol(x.K,lg.b,cL), s0=solub(x);
  var W=760,H=320;
  var fr=frame({L:66,R:720,T:24,B:262,x0:-2,x1:0.78,y0:-6,y1:1,xt:0.5,yt:1,
    xf:function(v){return fmt(Math.pow(10,v),2);},yf:function(v){return "10"+sup(v);},
    xl:"koncentrace činidla [mol·dm⁻³]",yl:"rozpuštěno s [mol·dm⁻³]"});
  var s=fr.s;
  s+=line(fr.X(-2),fr.Y(L10(s0)),fr.X(0.78),fr.Y(L10(s0)),{c:"var(--ink-3)",w:1.5,dash:"5 4"});
  s+=txt(fr.X(-1.95),fr.Y(L10(s0))-7,"v čisté vodě: "+sci(s0,2),{size:11,w:600,fill:"var(--ink-3)",mono:true});
  var cols=["var(--cat3)","var(--cat2)","var(--cat1)"];
  DS_LIG.forEach(function(l,i){
    var pts=[];
    for(var e=-2;e<=0.781;e+=0.02){ var c=Math.pow(10,e), v=dsSol(x.K,l.b,c).s; var lv=L10(v); if(lv>=-6&&lv<=1) pts.push(fr.X(e).toFixed(1)+","+fr.Y(lv).toFixed(1)); }
    if(pts.length>1) s+=poly(pts,i===st.lig?"var(--accent)":cols[i],i===st.lig?3:1.6,i===st.lig?null:"5 4");
  });
  s+=dot(fr.X(st.lc),fr.Y(clamp(L10(R.s),-6,1)),"var(--accent)",6);
  s+=txt(fr.X(st.lc)+(st.lc>0.3?-9:9),fr.Y(clamp(L10(R.s),-6,1))-9,sci(R.s,2)+" M",{anchor:st.lc>0.3?"end":"start",size:11.5,w:600,fill:"var(--accent)",mono:true});
  $("#dsWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rozpuštěné množství sraženiny v závislosti na koncentraci komplexotvorného činidla"');
  $("#dsLegend").innerHTML=DS_LIG.map(function(l,i){ return '<span class="li"><span class="sw" style="background:'+(i===st.lig?"var(--accent)":cols[i])+'"></span>'+l.n+' (β = '+sci(l.b,1)+')</span>'; }).join("")+
    '<span class="li"><span class="sw" style="background:var(--ink-3)"></span>rozpustnost v čisté vodě</span>';
  $("#dsCV").textContent=conc(cL)+" mol·dm⁻³";
  ro("#dsRo1","K = Ksp · β",sci(R.K,2),"Ksp = "+sci(x.K,1)+" · β = "+sci(lg.b,1));
  ro("#dsRo2","Rozpustí se s",sci(R.s,3),"mol·dm⁻³ v "+conc(cL)+" M "+lg.n,R.s>1e-3?"pos":"neg");
  ro("#dsRo3","V gramech",fmt(R.s*x.M,3)+" g·dm⁻³","M("+x.f+") = "+fmt(x.M,2));
  ro("#dsRo4","Zvýšení proti vodě",sci(R.s/s0,1)+"×","voda: "+sci(s0,2)+" mol·dm⁻³");
  var stp=[];
  stp.push(x.f+"(s) + "+2+" "+lg.n+" ⇌ "+lg.cx+" + "+x.an+" &nbsp;&nbsp;K = Ksp · β = "+sci(x.K,1)+" · "+sci(lg.b,1)+" = <b>"+sci(R.K,2)+"</b>");
  stp.push("ICE: rozpustí-li se s, je ["+lg.cx+"] = ["+x.an+"] = s a ["+lg.n+"] = "+conc(cL)+" − 2s &nbsp;⇒&nbsp; K = s² / ("+conc(cL)+" − 2s)²");
  stp.push("odmocníme: s / ("+conc(cL)+" − 2s) = √K = "+sci(R.r,3)+" &nbsp;⇒&nbsp; s = √K·c / (1 + 2√K) = <b>"+sci(R.s,3)+" mol·dm⁻³</b> = "+fmt(R.s*x.M,3)+" g·dm⁻³");
  $("#dsSteps").innerHTML=eqs(stp);
  $("#dsNote").innerHTML = R.K>1
    ? "K &gt; 1 — rovnováha leží zcela vpravo, sraženina se rozpouští prakticky kvantitativně (omezuje ji jen zásoba ligandu: dva ligandy na jeden iont, takže maximum je c/2)."
    : (R.s>1e-2 ? "K je sice malé, ale nadbytek ligandu rovnováhu přetáhne: v&nbsp;"+conc(cL)+" M "+lg.n+" se rozpustí "+fmt(R.s*x.M,2)+" g na litr. Zkuste přepnout sraženinu na AgBr a&nbsp;AgI — se stejným činidlem to dopadne úplně jinak."
    : "Rozpuštěné množství je zanedbatelné — β tohoto činidla nestačí přebít malé Ksp. Přepněte na thiosíran nebo kyanid a&nbsp;sledujte, jak křivka vyskočí o&nbsp;několik řádů.");
}
function initCplx(){
  $("#cbSearch").addEventListener("input",function(){ cbState.q=this.value; drawCb(); });
  segBind("cbFilter",function(v){ cbState.f=v; drawCb(); });
  var sel=$("#cxSel");
  sel.innerHTML=BETA.map(function(x,i){ return '<option value="'+i+'">'+x.f+' — '+x.n+' × '+x.l+' (log β '+fmt(L10(x.b),2)+')</option>'; }).join("");
  selBind("cxSel",function(v){ cxState.i=+v; drawCx(); });
  rngBind("cxCM",function(v){ cxState.lm=v; drawCx(); });
  rngBind("cxCL",function(v){ cxState.ll=v; drawCx(); });
  var ds=$("#dsSalt");
  ds.innerHTML=DS_SALTS.map(function(f,i){ var x=kspFind(f); return '<option value="'+i+'">'+f+' (Ksp '+sci(x.K,1)+')</option>'; }).join("");
  selBind("dsSalt",function(v){ dsState.i=+v; drawDs(); });
  segBind("dsLig",function(v){ dsState.lig=+v; drawDs(); });
  rngBind("dsC",function(v){ dsState.lc=v; drawDs(); });
  drawCb(); drawCx(); drawDs();
}
