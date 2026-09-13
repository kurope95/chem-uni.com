const fs=require("fs"),path=require("path"),vm=require("vm");
const parts=fs.readdirSync(__dirname).filter(f=>/^\d\d-.*\.js$/.test(f)).sort();
let src=parts.map(f=>fs.readFileSync(path.join(__dirname,f),"utf8")).join("\n");
const store={};
function El(id){this.id=id;this._html="";this.value="";this.textContent="";this.className="";this.style={};this.dataset={};this.options=[];}
Object.defineProperty(El.prototype,"innerHTML",{get(){return this._html;},set(v){this._html=v;if(this.id)store[this.id]=v;}});
El.prototype.addEventListener=function(){};El.prototype.setAttribute=function(){};El.prototype.click=function(){};
const els={}; const get=s=>{const id=String(s).replace(/^#/,"");return els[id]||(els[id]=new El(id));};
const ctx={console,BANK:{},$:get,$$:()=>[],fmt:(n,d)=>String(n),sgn:(n,d)=>String(n),toast(){},markDone(){},
 svg:()=>"",txt:()=>"",line:()=>"",rect:()=>"",vArrow:()=>"",window:{},document:{querySelector:get,querySelectorAll:()=>[]},
 Math,String,Number,Array,Object,JSON,parseInt,parseFloat,isNaN,Date};
vm.createContext(ctx); vm.runInContext(src,ctx);
const B=ctx.BANK; let bad=0,n=0;
for(const k of Object.keys(B)){
  B[k].forEach((q,i)=>{
    n++;
    const tag=k+"["+(i+1)+"]";
    if(!q.q||!q.e) { console.log("✗",tag,"chybí text nebo vysvětlení"); bad++; }
    if(q.e && q.e.length<80){ console.log("✗",tag,"vysvětlení příliš krátké ("+q.e.length+" znaků)"); bad++; }
    if(q.t==="single"){
      if(!Array.isArray(q.o)||q.o.length!==4){ console.log("✗",tag,"single nemá 4 možnosti"); bad++; }
      if(typeof q.c!=="number"||q.c<0||q.c>3){ console.log("✗",tag,"špatné c"); bad++; }
      if(new Set(q.o).size!==q.o.length){ console.log("✗",tag,"duplicitní možnosti"); bad++; }
    } else if(q.t==="multi"){
      if(!Array.isArray(q.o)||q.o.length<4||q.o.length>5){ console.log("✗",tag,"multi nemá 4–5 možností"); bad++; }
      if(!Array.isArray(q.c)||q.c.length<2){ console.log("✗",tag,"multi nemá 2+ správné"); bad++; }
      if(q.c.some(x=>x<0||x>=q.o.length)){ console.log("✗",tag,"c mimo rozsah"); bad++; }
      if(q.c.length>=q.o.length){ console.log("✗",tag,"všechny možnosti správné"); bad++; }
    } else if(q.t==="num"){
      if(typeof q.ans!=="number"||isNaN(q.ans)){ console.log("✗",tag,"chybí ans"); bad++; }
      if(typeof q.tol!=="number"||q.tol<=0){ console.log("✗",tag,"chybí tol"); bad++; }
      if(!q.unit){ console.log("✗",tag,"chybí jednotka"); bad++; }
      if(!/Zadejte/.test(q.q)){ console.log("✗",tag,"otázka neříká formát odpovědi"); bad++; }
    } else { console.log("✗",tag,"neznámý typ",q.t); bad++; }
  });
}
console.log("otázek:",n,"| vad:",bad);
/* typy */
const typ={};
for(const k of Object.keys(B)) B[k].forEach(q=>typ[q.t]=(typ[q.t]||0)+1);
console.log("podle typu:",typ);
