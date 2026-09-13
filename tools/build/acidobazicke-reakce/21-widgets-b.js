/* ============================================================
   T4 · WIDGET — průzkumník tří teorií
   ============================================================ */
var thI=0;
function thRoleTag(r){
  if(r==="ne") return '<span class="tag bad">ne</span>';
  if(r.indexOf("obojí")===0) return '<span class="tag warn">'+r+'</span>';
  if(r.indexOf("kyselina")===0) return '<span class="tag" style="background:var(--exo-soft);color:var(--exo)">'+r+'</span>';
  return '<span class="tag" style="background:var(--endo-soft);color:var(--endo)">'+r+'</span>';
}
function drawTh(){
  var t=TH[thI];
  var rows=[["Arrhenius (1887)",t.arr],["Brønsted–Lowry (1923)",t.bro],["Lewis (1923)",t.lew]];
  $("#thBody").innerHTML=rows.map(function(r){
    return '<tr><td style="white-space:nowrap"><b>'+r[0]+'</b></td><td>'+thRoleTag(r[1].r)+'</td>'+
      '<td>'+(r[1].eq!=="—"?'<span class="chem" style="display:block;margin-bottom:.25rem">'+r[1].eq+'</span>':'')+
      '<span style="font-size:.9rem;color:var(--ink-2)">'+r[1].c+'</span></td></tr>';
  }).join("");
  $("#thNote").innerHTML=t.note;
  /* Vennův diagram — soustředné kruhy */
  var W=420,H=280,cx=210,cy=150;
  var s='';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="124" style="fill:var(--cat3);fill-opacity:.10;stroke:var(--cat3);stroke-width:1.6"/>';
  s+='<circle cx="'+cx+'" cy="'+(cy+22)+'" r="86" style="fill:var(--cat2);fill-opacity:.12;stroke:var(--cat2);stroke-width:1.6"/>';
  s+='<circle cx="'+cx+'" cy="'+(cy+46)+'" r="48" style="fill:var(--cat1);fill-opacity:.16;stroke:var(--cat1);stroke-width:1.6"/>';
  s+=txt(cx,cy-104,"LEWIS",{anchor:"middle",size:11.5,w:700,fill:"var(--cat3)",style:"letter-spacing:.1em"});
  s+=txt(cx,cy-90,"akceptor / donor e⁻ páru",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  s+=txt(cx,cy-40,"BRØNSTED–LOWRY",{anchor:"middle",size:11,w:700,fill:"var(--cat2)",style:"letter-spacing:.08em"});
  s+=txt(cx,cy-27,"donor / akceptor H⁺",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  s+=txt(cx,cy+18,"ARRHENIUS",{anchor:"middle",size:10.5,w:700,fill:"var(--cat1)",style:"letter-spacing:.08em"});
  s+=txt(cx,cy+31,"H⁺ / OH⁻ ve vodě",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  /* umístění látky */
  var px,py,lab;
  if(t.arr.r!=="ne"){ px=cx; py=cy+62; lab="podle všech tří teorií"; }
  else if(t.bro.r!=="ne"){ px=cx; py=cy-4; lab="Brønsted a Lewis, ne Arrhenius"; }
  else if(t.lew.r!=="ne"){ px=cx; py=cy-64; lab="jen podle Lewise"; }
  else { px=cx+150; py=cy+100; lab="mimo — není kyselina ani zásada"; }
  s+='<circle cx="'+px+'" cy="'+py+'" r="15" style="fill:var(--accent);stroke:var(--surface);stroke-width:2.5"/>';
  s+=txt(px,py+4,"●",{anchor:"middle",size:10,fill:"var(--surface)"});
  s+=txt(px,py+30,t.f,{anchor:"middle",size:13,w:700,fill:"var(--accent)"});
  s+=txt(W/2,H-6,lab,{anchor:"middle",size:10.5,w:600,fill:"var(--ink-2)"});
  s+=txt(8,14,"Lewis ⊃ Brønsted ⊃ Arrhenius",{size:10,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  $("#thWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Vennův diagram tří teorií kyselin a zásad"');
}
function initTh(){
  var sel=$("#thSel");
  sel.innerHTML=TH.map(function(t,i){ return '<option value="'+i+'">'+t.f+' — '+t.n+'</option>'; }).join("");
  sel.addEventListener("change",function(){ thI=+sel.value; drawTh(); });
  drawTh();
}

/* ============================================================
   T5 · WIDGET — rozbor protolytické reakce
   ============================================================ */
var prI=0;
function drawPr(){
  var r=PROT[prI];
  var W=740,H=250;
  var s='';
  var bx=[40,220,420,600], bw=120, by=92, bh=46;
  var labels=[["kyselina 1","var(--exo)"],["báze 2","var(--endo)"],["báze 1","var(--exo)"],["kyselina 2","var(--endo)"]];
  var parts=[r.a1,r.b2,r.b1,r.a2];
  parts.forEach(function(p,i){
    s+=rect(bx[i],by,bw,bh,{fill:"var(--surface-2)",stroke:labels[i][1],sw:2,r:10});
    s+=txt(bx[i]+bw/2,by+29,p,{anchor:"middle",size:16,w:700,fill:"var(--ink)"});
    s+=txt(bx[i]+bw/2,by+bh+18,labels[i][0].toUpperCase(),{anchor:"middle",size:10.5,w:700,fill:labels[i][1],style:"letter-spacing:.08em"});
  });
  s+=txt(bx[0]+bw+20,by+30,"+",{anchor:"middle",size:20,w:600,fill:"var(--ink-3)"});
  s+=txt(bx[2]+bw+20,by+30,"+",{anchor:"middle",size:20,w:600,fill:"var(--ink-3)"});
  s+=txt((bx[1]+bw+bx[2])/2,by+32,r.arrow,{anchor:"middle",size:26,w:600,fill:"var(--ink-2)"});
  /* přenos protonu — oblouk z kyseliny 1 na bázi 2 */
  var x1=bx[0]+bw/2, x2=bx[1]+bw/2, yt=by-14;
  s+='<path d="M'+x1+' '+yt+' C'+x1+' '+(yt-46)+' '+x2+' '+(yt-46)+' '+x2+' '+yt+'" style="fill:none;stroke:var(--accent);stroke-width:2.2;stroke-dasharray:5 3"/>';
  s+='<path d="M'+x2+' '+(yt+2)+' l-5 -9 l10 0 z" style="fill:var(--accent)"/>';
  s+=txt((x1+x2)/2,yt-40,"H⁺",{anchor:"middle",size:13,w:700,fill:"var(--accent)"});
  s+=txt((x1+x2)/2,yt-26,"přenos protonu",{anchor:"middle",size:9.5,fill:"var(--ink-3)"});
  /* spojnice párů pod boxy */
  var yp1=by+bh+40, yp2=by+bh+62;
  s+=line(bx[0]+bw/2,yp1,bx[2]+bw/2,yp1,{c:"var(--exo)",w:1.5,dash:"4 3"});
  s+=line(bx[0]+bw/2,by+bh+24,bx[0]+bw/2,yp1,{c:"var(--exo)",w:1.5,dash:"4 3"});
  s+=line(bx[2]+bw/2,by+bh+24,bx[2]+bw/2,yp1,{c:"var(--exo)",w:1.5,dash:"4 3"});
  s+=txt((bx[0]+bx[2]+bw)/2,yp1-5,"PÁR 1 · "+r.a1+" / "+r.b1,{anchor:"middle",size:10,w:700,fill:"var(--exo)",style:"letter-spacing:.06em"});
  s+=line(bx[1]+bw/2,yp2,bx[3]+bw/2,yp2,{c:"var(--endo)",w:1.5,dash:"4 3"});
  s+=line(bx[1]+bw/2,by+bh+24,bx[1]+bw/2,yp2,{c:"var(--endo)",w:1.5,dash:"4 3"});
  s+=line(bx[3]+bw/2,by+bh+24,bx[3]+bw/2,yp2,{c:"var(--endo)",w:1.5,dash:"4 3"});
  s+=txt((bx[1]+bx[3]+bw)/2,yp2+14,"PÁR 2 · "+r.a2+" / "+r.b2,{anchor:"middle",size:10,w:700,fill:"var(--endo)",style:"letter-spacing:.06em"});
  $("#prWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Rozbor protolytické reakce s označením konjugovaných párů"');
  function pk(v){ return v<=-5?"≈ "+fmt(v,0):fmt(v,2); }
  $("#prRo1").className="readout";
  $("#prRo1").innerHTML='<span class="k" style="color:var(--exo)">Pár 1</span><span class="v">'+r.a1+' / '+r.b1+'</span><span class="h">kyselina 1 → báze 1; p<span class="q">K</span><sub>a</sub>('+r.a1+') = '+pk(r.pKa1)+'</span>';
  $("#prRo2").className="readout";
  $("#prRo2").innerHTML='<span class="k" style="color:var(--endo)">Pár 2</span><span class="v">'+r.a2+' / '+r.b2+'</span><span class="h">báze 2 → kyselina 2; p<span class="q">K</span><sub>a</sub>('+r.a2+') = '+pk(r.pKa2)+'</span>';
  var lk=r.pKa2-r.pKa1;
  $("#prEq").innerHTML='<span class="q">K</span> = 10<sup>p<span class="q">K</span><sub>a</sub>(kyselina 2) − p<span class="q">K</span><sub>a</sub>(kyselina 1)</sup> = 10<sup>'+pk(r.pKa2)+' − ('+pk(r.pKa1)+')</sup> = <b>'+sci(Math.pow(10,lk),1)+'</b>'+
    ' &nbsp;<span style="color:var(--ink-3)">→ rovnováha '+(lk>3?"prakticky úplně vpravo":(lk<-3?"prakticky úplně vlevo":(lk>0?"spíš vpravo":"spíš vlevo")))+'</span>';
  $("#prNote").innerHTML=r.c;
}
function initPr(){
  var sel=$("#prSel");
  sel.innerHTML=PROT.map(function(r,i){ return '<option value="'+i+'">'+r.n+'</option>'; }).join("");
  sel.addEventListener("change",function(){ prI=+sel.value; drawPr(); });
  drawPr();
}

/* ============================================================
   T6 · TRENAŽÉR — konjugované páry
   ============================================================ */
var cjI=0, cjScore=0, cjAnswered=false;
function drawCj(){
  var it=CJ[cjI];
  $("#cjQn").textContent=cjI+1; $("#cjQtot").textContent=CJ.length; $("#cjScore").textContent=cjScore;
  $("#cjTask").innerHTML='Konjugovaná <b style="color:'+(it.ask==="baze"?"var(--endo)":"var(--exo)")+'">'+(it.ask==="baze"?"báze":"kyselina")+'</b> částice <span class="chem" style="font-size:1.25rem">'+it.g+'</span> je…';
  $("#cjOpts").innerHTML=it.o.map(function(o,i){
    return '<button class="btn" type="button" data-cj="'+i+'" style="font-family:var(--f-mono);font-size:1.02rem">'+o+'</button>';
  }).join("");
  $$("#cjOpts button").forEach(function(b){
    b.addEventListener("click",function(){
      if(cjAnswered) return;
      cjAnswered=true;
      var ok=(+b.dataset.cj)===it.c;
      if(ok) cjScore++;
      $("#cjScore").textContent=cjScore;
      var ex=$("#cjExplain");
      ex.className="explain"; ex.style.display="flex";
      ex.style.background=ok?"var(--ok-soft)":"var(--bad-soft)";
      ex.style.borderColor=ok?"var(--ok)":"var(--bad)";
      ex.innerHTML='<span class="verdict" style="color:'+(ok?"var(--ok)":"var(--bad)")+'">'+(ok?"✓ Správně":"✕ Špatně — správně je "+it.o[it.c])+'</span><span class="eyebrow">Proč</span><div>'+it.e+'</div>';
      $$("#cjOpts button").forEach(function(x){ x.disabled=true; x.style.opacity=(+x.dataset.cj)===it.c?"1":".5"; if((+x.dataset.cj)===it.c){ x.style.borderColor="var(--ok)"; x.style.color="var(--ok)"; } });
      $("#cjNext").disabled = cjI>=CJ.length-1;
      if(cjI>=CJ.length-1){
        toast("Trenažér dokončen: "+cjScore+" z "+CJ.length+" správně.");
        if(cjScore>=11) markDone("k2");
      }
    });
  });
  var ex=$("#cjExplain"); ex.style.display="none"; ex.className="explain";
  $("#cjNext").disabled=true;
  cjAnswered=false;
}
function initCj(){
  $("#cjNext").addEventListener("click",function(){ if(cjI<CJ.length-1){ cjI++; drawCj(); } });
  $("#cjReset").addEventListener("click",function(){ cjI=0; cjScore=0; drawCj(); toast("Trenažér vynulován."); });
  drawCj();
}
