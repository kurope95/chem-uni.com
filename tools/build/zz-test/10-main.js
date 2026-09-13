var tState={v:5};
function drawT(){
  var s=rect(10,10,tState.v*40,40,{fill:"var(--accent)",r:6})+txt(10,80,"hodnota "+fmt(tState.v,0),{mono:true});
  $("#tWrap").innerHTML=svg("0 0 440 100",s,'aria-label="test"');
  $("#tV").textContent=fmt(tState.v,0);
}
var GLOSS=[["Pojem","jednotka","Definice pojmu."]];
function redrawAll(){ try{ drawT(); }catch(e){} }
window.redrawAll=redrawAll;
function bind(){ $("#tSl").addEventListener("input",function(){ tState.v=+this.value; drawT(); }); }
function initAll(){ drawT(); }
BANK.q0=[{t:"single",q:"Otázka?",o:["a","b","c","d"],c:2,e:"Vysvětlení."},{t:"num",q:"Kolik je 2+2?",ans:4,tol:0.1,unit:"",e:"Čtyři."}];
BANK.rychlo=[{t:"multi",q:"Vyberte sudá.",o:["1","2","3","4"],c:[1,3],e:"Sudá jsou 2 a 4."}];
