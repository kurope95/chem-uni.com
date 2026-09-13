/* ============================================================
   24 · RYCHLOPRŮCHOD — tři mini-grafy
   ============================================================ */

/* (A) Beketovova řada ve zkratce */
function drawMiniBek(){
  var W=760,H=150,x0=26,cw=(W-52)/BEK.length,y0=52,bh=44,s='';
  s+=txt(x0,20,"BEKETOVOVA ŘADA — VLEVO VYTĚSNÍ VPRAVO",{size:11,w:600,fill:"var(--ink-3)",style:"letter-spacing:.1em"});
  s+=txt(W-26,20,"E° [V] vůči SHE",{anchor:"end",size:10.5,fill:"var(--ink-3)"});
  BEK.forEach(function(b,i){
    var x=x0+i*cw, isH=b.s==="H";
    var col=isH?"var(--accent)":(b.E<0?"var(--endo)":"var(--exo)");
    var op=isH?1:Math.min(1,0.22+Math.abs(b.E)/3.2);
    s+='<rect x="'+(x+2)+'" y="'+y0+'" width="'+(cw-4)+'" height="'+bh+'" rx="6" style="fill:'+col+';fill-opacity:'+op.toFixed(2)+'"/>';
    s+=txt(x+cw/2,y0+bh/2+5,b.s,{anchor:"middle",size:isH?15:13.5,w:700,fill:(op>0.55||isH)?"var(--accent-ink)":"var(--ink)"});
    s+=txt(x+cw/2,y0+bh+15,fmt(b.E,2),{anchor:"middle",size:9.5,fill:"var(--ink-3)",mono:true});
  });
  var hi=BEK.indexOf(B_("H")), xh=x0+hi*cw+cw/2;
  s+=line(xh,y0-8,xh,y0+bh+22,{c:"var(--accent)",w:2,dash:"4 3"});
  s+=txt(x0+2,y0-8,"NEUŠLECHTILÉ · vodík z kyselin vytěsní",{size:10.5,w:600,fill:"var(--endo)"});
  s+=txt(W-26,y0-8,"UŠLECHTILÉ · nevytěsní",{anchor:"end",size:10.5,w:600,fill:"var(--exo)"});
  s+=txt(W/2,H-6,"vlevo = silnější redukční činidlo, snadněji se oxiduje · vpravo = silnější oxidační činidlo (jeho kation)",{anchor:"middle",size:10.5,fill:"var(--ink-3)"});
  $("#miniBekWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Beketovova řada kovů ve zkratce"');
}

/* (B) Daniellův článek — obrázek, který si musíte pamatovat */
function drawMiniDaniell(){
  $("#miniDanWrap").innerHTML=drawGalvSVG({an:E_("Zn"),cat:E_("Cu"),E:1.10,W:760,H:340,
    title:"DANIELLŮV ČLÁNEK · Zn | Zn²⁺ ‖ Cu²⁺ | Cu · E° = 1,10 V"});
}

/* (C) Porovnání znamének: galvanický vs elektrolytický */
function drawMiniSigns(){
  var W=760,H=230,s='';
  function box(ox,title,sub,anSign,catSign,note,col){
    var t='', bw=350, by=44, bh=150;
    t+=rect(ox,by,bw,bh,{fill:"var(--surface-2)",r:10,stroke:col,sw:1.5});
    t+=txt(ox+16,by-10,title,{size:11.5,w:700,fill:col,style:"letter-spacing:.08em"});
    t+=txt(ox+16,by+22,sub,{size:11,fill:"var(--ink-3)"});
    /* anoda */
    t+=rect(ox+22,by+38,140,48,{fill:"var(--exo)",r:7,style:"fill-opacity:.16"});
    t+=txt(ox+92,by+58,"ANODA",{anchor:"middle",size:12,w:700,fill:"var(--exo)"});
    t+=txt(ox+92,by+76,"oxidace &nbsp; "+anSign,{anchor:"middle",size:12.5,w:700,fill:"var(--exo)"});
    /* katoda */
    t+=rect(ox+188,by+38,140,48,{fill:"var(--endo)",r:7,style:"fill-opacity:.16"});
    t+=txt(ox+258,by+58,"KATODA",{anchor:"middle",size:12,w:700,fill:"var(--endo)"});
    t+=txt(ox+258,by+76,"redukce &nbsp; "+catSign,{anchor:"middle",size:12.5,w:700,fill:"var(--endo)"});
    /* šipka elektronů */
    t+=hArrow(ox+92,ox+258,by+104,"var(--accent)","elektrony vodičem",false);
    t+=txt(ox+bw/2,by+bh-8,note,{anchor:"middle",size:10.5,w:600,fill:"var(--ink-2)"});
    return t;
  }
  s+=box(20,"GALVANICKÝ ČLÁNEK","samovolná reakce · ΔG < 0 · chemická → elektrická","(−)","(+)","baterie, Daniell, vybíjení akumulátoru","var(--exo)");
  s+=box(392,"ELEKTROLYTICKÝ ČLÁNEK","vnucená reakce · ΔG > 0 · elektrická → chemická","(+)","(−)","elektrolýza, pokovování, nabíjení","var(--endo)");
  s+=txt(W/2,H-8,"MĚNÍ SE JEN ZNAMÉNKA — ANODA JE VŽDY OXIDACE, KATODA VŽDY REDUKCE, KATIONTY VŽDY KE KATODĚ",
      {anchor:"middle",size:11,w:700,fill:"var(--accent)",style:"letter-spacing:.05em"});
  $("#miniSignWrap").innerHTML=svg("0 0 "+W+" "+H,s,'aria-label="Porovnání znamének galvanického a elektrolytického článku"');
}
