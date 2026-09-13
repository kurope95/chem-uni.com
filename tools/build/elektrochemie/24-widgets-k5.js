/* ============================================================
   18 · SCHÉMA ELEKTROLYTICKÉHO ČLÁNKU (společné pro k5 a k6)
   o: {an, cat (texty poloreakcí), prodA, prodC, ions[], elec, title, anMat, catMat, W, H}
   ============================================================ */
function drawElecSVG(o){
  var W=o.W||560, H=o.H||330, s='';
  var b={x:70,y:112,w:W-140,h:180}, exA=b.x+b.w*0.28, exC=b.x+b.w*0.72;
  s+=rect(b.x,b.y+36,b.w,b.h-36,{fill:"var(--surface-3)",r:0,style:"fill-opacity:.55"});
  s+='<path d="M'+b.x+' '+b.y+' L'+b.x+' '+(b.y+b.h)+' L'+(b.x+b.w)+' '+(b.y+b.h)+' L'+(b.x+b.w)+' '+b.y+'" style="fill:none;stroke:var(--line-strong);stroke-width:2;stroke-linejoin:round"/>';
  /* elektrody */
  s+=rect(exA-10,72,20,190,{fill:"var(--exo)",r:3}); s+=rect(exC-10,72,20,190,{fill:"var(--endo)",r:3});
  s+=txt(exA,175,o.anMat||"anoda",{anchor:"middle",size:12,w:700,fill:"var(--accent-ink)",style:"transform:rotate(-90deg);transform-origin:"+exA+"px 175px"});
  s+=txt(exC,175,o.catMat||"katoda",{anchor:"middle",size:12,w:700,fill:"var(--accent-ink)",style:"transform:rotate(-90deg);transform-origin:"+exC+"px 175px"});
  /* zdroj */
  var yW=40, cx=W/2;
  s+=line(exA,72,exA,yW,{c:"var(--ink-2)",w:2}); s+=line(exC,72,exC,yW,{c:"var(--ink-2)",w:2});
  s+=line(exA,yW,cx-16,yW,{c:"var(--ink-2)",w:2}); s+=line(cx+16,yW,exC,yW,{c:"var(--ink-2)",w:2});
  s+=line(cx-8,yW-18,cx-8,yW+18,{c:"var(--ink)",w:3}); s+=line(cx+8,yW-9,cx+8,yW+9,{c:"var(--ink)",w:3});
  s+=txt(cx-8,yW-24,"+",{anchor:"middle",size:15,w:700,fill:"var(--endo)"});
  s+=txt(cx+8,yW-24,"−",{anchor:"middle",size:15,w:700,fill:"var(--exo)"});
  s+=txt(cx,yW+34,"stejnosměrný zdroj"+(o.U?" · "+o.U:""),{anchor:"middle",size:10.5,w:600,fill:"var(--ink-3)",style:"letter-spacing:.06em"});
  s+=hArrow(exA+30,cx-30,yW-12,"var(--accent)","e⁻",true);
  s+=hArrow(cx+30,exC-30,yW-12,"var(--accent)","e⁻",true);
  /* popisky elektrod */
  s+=txt(exA,b.y+b.h+22,"ANODA (+) · oxidace",{anchor:"middle",size:11.5,w:700,fill:"var(--exo)",style:"letter-spacing:.06em"});
  s+=txt(exC,b.y+b.h+22,"KATODA (−) · redukce",{anchor:"middle",size:11.5,w:700,fill:"var(--endo)",style:"letter-spacing:.06em"});
  s+=txt(exA,b.y+b.h+38,o.an,{anchor:"middle",size:10.5,fill:"var(--ink-2)",mono:true});
  s+=txt(exC,b.y+b.h+38,o.cat,{anchor:"middle",size:10.5,fill:"var(--ink-2)",mono:true});
  /* produkty */
  s+=txt(exA+16,b.y+56,o.prodA,{size:11.5,w:600,fill:"var(--exo)"});
  s+=txt(exC-16,b.y+56,o.prodC,{anchor:"end",size:11.5,w:600,fill:"var(--endo)"});
  /* ionty */
  var ions=o.ions||[];
  s+=txt(cx,b.y+b.h-46,ions.join("   "),{anchor:"middle",size:12,w:600,fill:"var(--ink)",mono:true});
  s+=hArrow(cx+18,exC-22,b.y+b.h-24,"var(--endo)","kationty",false);
  s+=hArrow(cx-18,exA+22,b.y+b.h-24,"var(--exo)","anionty",false);
  if(o.elec) s+=txt(b.x+b.w,b.y+b.h+38,"elektrody: "+o.elec,{anchor:"end",size:10,fill:"var(--ink-3)"});
  if(o.title) s+=txt(14,16,o.title,{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  return svg("0 0 "+W+" "+H,s,'aria-label="Schéma elektrolytického článku"');
}

/* ============================================================
   19 · GALVANICKÝ vs ELEKTROLYTICKÝ (k5)
   ============================================================ */
var geMode="cuso4-inert";
function drawGE(){
  var an=E_("Zn"), cat=E_("Cu");
  $("#geWrapG").innerHTML=drawGalvSVG({an:an,cat:cat,E:1.10,W:560,H:330,title:"GALVANICKÝ · DANIELLŮV ČLÁNEK"});
  var x=EL_(geMode);
  var mats={"cuso4-inert":["C","C"],"nacl-melt":["C","Fe"],"water":["Pt","Pt"],"cuso4-cu":["Cu","Cu"]};
  $("#geWrapE").innerHTML=drawElecSVG({an:x.an,cat:x.cat,prodA:x.prodA,prodC:x.prodC,ions:x.ions,elec:x.elec,anMat:mats[geMode][0],catMat:mats[geMode][1],W:560,H:330,title:"ELEKTROLYTICKÝ · "+x.name.toUpperCase()});
  $("#geHead").textContent="Elektrolytický: "+x.name;
  $$("#geMode button").forEach(function(b){ b.setAttribute("aria-pressed", b.dataset.v===geMode); });
  var rows=[
    ["Zdroj energie","samovolná reakce Zn + Cu²⁺ (ΔG° = −212 kJ·mol⁻¹)","vnější zdroj; reakce má ΔG > 0"],
    ["Anoda","Zn, <b style='color:var(--exo)'>záporný pól</b>: "+halfOx(an),"<b style='color:var(--endo)'>kladný pól</b>: "+x.an],
    ["Katoda","Cu, <b style='color:var(--endo)'>kladný pól</b>: "+halfRed(cat),"<b style='color:var(--exo)'>záporný pól</b>: "+x.cat],
    ["Celková reakce","Zn + Cu²⁺ → Zn²⁺ + Cu",x.total],
    ["Elektrony ve vodiči","anoda → katoda (samospádem)","anoda → zdroj → katoda (pumpuje zdroj)"],
    ["Napětí","článek dává 1,10 V","zdroj musí dodat víc než rozkladné napětí + přepětí"]
  ];
  $("#geBody").innerHTML=rows.map(function(r){ return '<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td>'+r[2]+'</td></tr>'; }).join("");
}
function initGE(){
  $$("#geMode button").forEach(function(b){ b.addEventListener("click",function(){ geMode=b.dataset.v; drawGE(); }); });
  drawGE();
}

/* ============================================================
   20 · PRAKTICKÉ ČLÁNKY (k5)
   ============================================================ */
var pcId="daniell";
function drawCells(){
  var c=C_(pcId), W=520,H=260,s='';
  /* schematická baterie: dvě elektrody v elektrolytu, spotřebič nahoře */
  var bx=60,by=90,bw=400,bh=140;
  s+=rect(bx,by,bw,bh,{fill:"var(--surface-3)",r:12,stroke:"var(--line-strong)",sw:2});
  s+=rect(bx+40,by+20,120,bh-40,{fill:"var(--exo)",r:6}); s+=rect(bx+bw-160,by+20,120,bh-40,{fill:"var(--endo)",r:6});
  s+=txt(bx+100,by+bh/2-4,c.anMat,{anchor:"middle",size:13,w:700,fill:"var(--accent-ink)"});
  s+=txt(bx+100,by+bh/2+14,"anoda (−)",{anchor:"middle",size:10.5,w:600,fill:"var(--accent-ink)"});
  s+=txt(bx+bw-100,by+bh/2-4,c.catMat,{anchor:"middle",size:13,w:700,fill:"var(--accent-ink)"});
  s+=txt(bx+bw-100,by+bh/2+14,"katoda (+)",{anchor:"middle",size:10.5,w:600,fill:"var(--accent-ink)"});
  s+=txt(bx+bw/2,by+bh/2+4,c.elyt,{anchor:"middle",size:11,w:600,fill:"var(--ink)"});
  s+=txt(bx+bw/2,by+bh/2+20,"elektrolyt",{anchor:"middle",size:10,fill:"var(--ink-3)"});
  s+=txt(bx+bw/2,by+bh+22,"kationty →   ← anionty (uvnitř), elektrony vnějším obvodem",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  /* obvod */
  s+=line(bx+100,by+20,bx+100,40,{c:"var(--ink-2)",w:2}); s+=line(bx+bw-100,by+20,bx+bw-100,40,{c:"var(--ink-2)",w:2});
  s+=line(bx+100,40,W/2-34,40,{c:"var(--ink-2)",w:2}); s+=line(W/2+34,40,bx+bw-100,40,{c:"var(--ink-2)",w:2});
  s+=rect(W/2-34,26,68,28,{fill:"var(--surface)",r:6,stroke:"var(--ink-2)",sw:2});
  s+=txt(W/2,45,"spotřebič",{anchor:"middle",size:11,w:600,fill:"var(--ink)"});
  s+=hArrow(bx+130,W/2-48,26,"var(--accent)","e⁻",true);
  s+=hArrow(W/2+48,bx+bw-130,26,"var(--accent)","e⁻",true);
  s+=txt(bx,18,c.name.toUpperCase()+" · "+c.U,{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.08em"});
  $("#pcWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Schéma praktického článku"');
  function ro(id,k,v,h){ var e=$(id); e.className="readout"; e.innerHTML='<span class="k">'+k+'</span><span class="v" style="font-size:1rem">'+v+'</span><span class="h">'+h+'</span>'; }
  ro("#pcRo1","Napětí",c.U,"na jeden článek");
  ro("#pcRo2","Typ",c.type,c.type.indexOf("sekund")>=0?"lze nabíjet — nabíjení = elektrolýza":(c.type.indexOf("paliv")>=0?"reaktanty se dodávají zvenčí":"po vybití se vyhazuje"));
  ro("#pcRo3","Elektrolyt",c.elyt,"prostředí poloreakcí");
  $("#pcAn").innerHTML='<span style="color:var(--exo)">anoda (−), oxidace:</span> <span class="chem">'+c.an+'</span>';
  $("#pcCat").innerHTML='<span style="color:var(--endo)">katoda (+), redukce:</span> <span class="chem">'+c.cat+'</span>';
  $("#pcTot").innerHTML='celkem: <b><span class="chem">'+c.total+'</span></b>';
  $("#pcNote").innerHTML=c.note;
  $("#pcBody").innerHTML=CELLS.map(function(k){
    return '<tr'+(k.id===pcId?' style="background:var(--accent-soft)"':'')+'><td><b>'+k.name+'</b></td><td>'+k.type+'</td><td class="chem">'+k.anMat+'</td><td class="chem">'+k.catMat+'</td><td>'+k.elyt+'</td><td class="n">'+k.U+'</td></tr>';
  }).join("");
}
function initCells(){
  var sel=$("#pcSel");
  sel.innerHTML=CELLS.map(function(c){ return '<option value="'+c.id+'">'+c.name+' — '+c.U+'</option>'; }).join("");
  sel.addEventListener("change",function(){ pcId=this.value; drawCells(); });
  drawCells();
}
