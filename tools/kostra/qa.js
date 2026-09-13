/* Runtime QA — spustit přes javascript_tool na otevřené stránce. Vrací objekt s nálezy. */
(function(){
  var r={errors:[],warn:[]};
  var origErr=window.onerror; var caught=[];
  window.addEventListener('error',function(e){caught.push(String(e.message));});
  function safe(fn,label){ try{ fn(); }catch(e){ r.errors.push(label+': '+(e&&e.message||e)); } }
  r.title=document.title;
  r.sections=Array.from(document.querySelectorAll('section.chapter')).map(function(s){return s.id;});
  r.railLinks=document.querySelectorAll('#railNav a').length;
  /* SVG wrappers without svg */
  var wraps=Array.from(document.querySelectorAll('.svgwrap'));
  r.svgwraps=wraps.length;
  r.emptySvgwraps=wraps.filter(function(w){return !w.querySelector('svg');}).map(function(w){return w.id||'(no id)';});
  /* exercise every range input across its span */
  var ranges=Array.from(document.querySelectorAll('input[type=range]'));
  r.ranges=ranges.length;
  ranges.forEach(function(inp){
    safe(function(){
      var v0=inp.value;
      [inp.min,inp.max,String((+inp.min+ +inp.max)/2),v0].forEach(function(v){ inp.value=v; inp.dispatchEvent(new Event('input',{bubbles:true})); inp.dispatchEvent(new Event('change',{bubbles:true})); });
    },'range #'+inp.id);
  });
  /* click every segmented button and every button inside panels (not quiz buttons) */
  var segs=Array.from(document.querySelectorAll('.segmented button'));
  r.segmentedButtons=segs.length;
  segs.forEach(function(b){ safe(function(){ b.click(); },'segmented '+(b.textContent||'').trim().slice(0,30)); });
  /* cycle every select */
  var sels=Array.from(document.querySelectorAll('select'));
  r.selects=sels.length;
  sels.forEach(function(s){ safe(function(){
    var n=s.options.length; for(var i=0;i<n;i++){ s.selectedIndex=i; s.dispatchEvent(new Event('change',{bubbles:true})); }
    s.selectedIndex=0; s.dispatchEvent(new Event('change',{bubbles:true}));
  },'select #'+s.id); });
  /* type into search inputs */
  Array.from(document.querySelectorAll('input[type=search]')).forEach(function(s){ safe(function(){ s.value='a'; s.dispatchEvent(new Event('input',{bubbles:true})); s.value=''; s.dispatchEvent(new Event('input',{bubbles:true})); },'search #'+s.id); });
  /* click panel buttons (drills) up to a limit, excluding quiz & chapter-done & reveal */
  var pbtns=Array.from(document.querySelectorAll('.panel button:not(.segmented button)')).slice(0,80);
  r.panelButtons=pbtns.length;
  pbtns.forEach(function(b){ safe(function(){ if(!b.disabled) b.click(); },'panel button '+(b.id||(b.textContent||'').trim().slice(0,30))); });
  /* open every quiz, answer everything, grade */
  var quizzes=Array.from(document.querySelectorAll('.quiz'));
  r.quizzes=quizzes.map(function(q){
    var o={key:q.dataset.quiz};
    safe(function(){
      if(!q.classList.contains('open')) q.querySelector('.quiz-toggle').click();
      var cards=q.querySelectorAll('.qcard'); o.cards=cards.length;
      cards.forEach(function(c){
        var num=c.querySelector('.numin input');
        if(num){ num.value='1'; } else { var ins=c.querySelectorAll('input'); if(ins.length) ins[0].checked=true; }
      });
      q.querySelector('[data-check]').click();
      o.score=(q.querySelector('.score')||{}).textContent;
      o.revealed=q.querySelectorAll('.qcard.revealed').length;
      var again=q.querySelector('[data-again]'); if(again) again.click();
    },'quiz '+q.dataset.quiz);
    return o;
  });
  /* reveal all worked examples */
  var reveals=Array.from(document.querySelectorAll('[data-reveal]'));
  r.worked=reveals.length;
  reveals.forEach(function(b){ safe(function(){ b.click(); },'reveal'); });
  /* theme toggle twice */
  safe(function(){ document.getElementById('themeBtn').click(); document.getElementById('themeBtn').click(); },'theme');
  /* glossary */
  r.glossary=document.querySelectorAll('#glossary details').length;
  r.cheatCards=document.querySelectorAll('.cheat-card').length;
  r.panels=document.querySelectorAll('.panel').length;
  r.syllabusRows=document.querySelectorAll('.syl-row').length;
  r.covermapLinks=document.querySelectorAll('.covermap a').length;
  /* leftover empty svgwraps after exercising */
  r.emptySvgwrapsAfter=wraps.filter(function(w){return !w.querySelector('svg');}).map(function(w){return w.id||'(no id)';});
  /* text sanity: leftover placeholders / english */
  var t=document.body.innerText;
  /* pozor na falešné poplachy: „chlorem“ obsahuje lorem, „NaNO₃“ obsahuje NaN */
  [['{{',/\{\{/g],['TODO',/TODO/g],['lorem',/lorem ipsum/gi],
   ['undefined',/undefined/g],['NaN',/(^|[^A-Za-z])NaN([^A-Za-z0-9₀-₉²³¹⁰⁴-⁾]|$)/g]
  ].forEach(function(p){ var m=t.match(p[1]); if(m) r.warn.push('body text contains "'+p[0]+'" ×'+m.length); });
  r.bodyChars=t.length;
  r.caughtWindowErrors=caught;
  return r;
})()
