var fs=require("fs"); var src=fs.readFileSync(__dirname+"/elektronovy-obal/10-data.js","utf8");
var fmt=function(n,d){return String(n);};
eval(src+`
var out=[];
[1,2,6,7,8,11,17,18,19,24,26,29,30,31,36,46,47,55,56,57,78,79,80,82,86,88].forEach(function(Z){
  var e=EL(Z); out.push(Z+" "+e.s+" | "+cfgFull(Z)+" | "+cfgShort(Z)+" | fill: "+cfgFill(Z)+" | per "+period(Z)+" grp "+group(Z)+" blk "+block(Z)+" val "+valenceCount(Z)+" unp "+unpaired(Z));
});
IONS.forEach(function(i){ out.push(i.lab+" -> "+cfgIonShort(i.Z,i.ch)+"  full: "+subsStr(cfgIon(i.Z,i.ch))); });
out.push("N3-: "+cfgIonShort(7,-3)+"  H-: "+cfgIonShort(1,-1)+"  Li+: "+cfgIonShort(3,1)+" Sn2+: "+cfgIonShort(50,2)+" Ti3+: "+cfgIonShort(22,3)+" Mn2+: "+cfgIonShort(25,2)+" Cr3+: "+cfgIonShort(24,3)+" Ni2+: "+cfgIonShort(28,2)+" Co2+: "+cfgIonShort(27,2)+" Hg2+: "+cfgIonShort(80,2)+" Br-: "+cfgIonShort(35,-1)+" Sc3+: "+cfgIonShort(21,3)+" K+: "+cfgIonShort(19,1)+" Ca2+: "+cfgIonShort(20,2)+" Ga3+: "+cfgIonShort(31,3)+" Pb4+: "+cfgIonShort(82,4)+" Au+: "+cfgIonShort(79,1)+" Au3+: "+cfgIonShort(79,3)+" Sn4+: "+cfgIonShort(50,4));
out.push(bohrLambda(2,3).toFixed(1)+" "+bohrLambda(1,2).toFixed(1)+" "+bohrLambda(3,4).toFixed(1)+" "+bohrE(2));
console.log(out.join("\\n"));
console.log("ELEMENTS:", ELEMENTS.length);
var missing=[]; for(var z=1;z<=57;z++){ if(!EL(z)) missing.push(z);} console.log("missing 1-57:", missing);
`);
