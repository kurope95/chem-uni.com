import math
R=8.314
def K_from_dG(dG_kJ,T=298.15): return math.exp(-dG_kJ*1000/(R*T))
print("--- K z dG (298 K) ---")
for dG in [-5.7,-11.4,-17.1,-34.2,-57.0,5.7,11.4,0]:
    print(dG, "%.3g"%K_from_dG(dG))
print("dG for K=10:", -R*298.15*math.log(10)/1000)
print("--- Haber ---")
dG_h=2*(-16.4); K298=K_from_dG(dG_h); print("dG298",dG_h,"K298 %.3g"%K298)
dH=-92.2
def vh(K1,T1,T2,dH_kJ): return K1*math.exp(-(dH_kJ*1000/R)*(1/T2-1/T1))
print("K(673) vantHoff %.3g"%vh(K298,298.15,673.15,dH))
print("K(773) %.3g"%vh(K298,298.15,773.15,dH), "K(700) %.3g"%vh(K298,298.15,700,dH))
print("ratio K673/K298 %.3g"%(vh(K298,298.15,673.15,dH)/K298))
# Haber Kp model anchored to 36.3% at 400C/200atm
x=0.363; r=x/(1-x)**2; Kp673=(r/200)**2*256/27; print("Kp673 anchored %.4g"%Kp673)
def Kp_h(T): return Kp673*math.exp((92200/R)*(1/T-1/673.15))
def xNH3(T,P):
    r=P*math.sqrt(27*Kp_h(T)/256)
    # r x^2 -(2r+1)x + r =0
    a=r;b=-(2*r+1);c=r
    return (-b-math.sqrt(b*b-4*a*c))/(2*a)
for Tc in [300,350,400,450,500,550]:
    print(Tc, ["%.1f"%(100*xNH3(Tc+273.15,P)) for P in [10,50,100,200,300,600]], "Kp=%.3g"%Kp_h(Tc+273.15))
# Kc at 700K
Kp700=Kp_h(700); Kc700=Kp700*(0.08314*700)**2; print("Kp700 %.3g Kc700 %.3g"%(Kp700,Kc700))
# equilibrium from 1,3,0 mol/dm3
def solve(f,lo,hi):
    for _ in range(200):
        m=(lo+hi)/2
        if f(m)>0: hi=m
        else: lo=m
    return (lo+hi)/2
x=solve(lambda x:(2*x)**2/((1-x)*(3-3*x)**3)-Kc700,0,0.999999)
print("Haber 700K from 1,3: x=%.4f NH3=%.3f N2=%.3f H2=%.3f frac=%.3f"%(x,2*x,1-x,3-3*x,2*x/(4-2*x)))
print("--- N2O4 ---")
dG=2*51.31-97.89; dHn=2*33.18-9.16; K=K_from_dG(dG); print("dG %.2f dH %.2f Kp298 %.4f"%(dG,dHn,K))
print("Kc298 %.4g"%(K/(0.08314*298.15)), "factor RT %.4g"%(0.08314*298.15))
print("K(350) %.3g"%vh(K,298.15,350,dHn), "K(330) %.3g"%vh(K,298.15,330,dHn), "K(373) %.3g"%vh(K,298.15,373.15,dHn))
for p in [0.1,1,10]:
    a=math.sqrt(K/(K+4*p)); print("alpha at %.1f bar: %.4f"%(p,a))
# Kc-based ICE: [N2O4]0=0.05
Kc=K/(0.08314*298.15); x=solve(lambda x:4*x*x/(0.05-x)-Kc,0,0.05); print("N2O4 0.05: x=%.5f NO2=%.4f alpha=%.3f"%(x,2*x,x/0.05))
print("--- HI ---")
K=50
for a,b,c in [(1,1,0),(1,2,0),(0,0,2),(2,2,0)]:
    f=lambda x:(c+2*x)**2/((a-x)*(b-x))-K
    lo=-c/2 if c>0 else 0; hi=min(a,b)
    x=solve(f,lo+1e-9,hi-1e-9); print("HI",a,b,c,"x=%.4f HI=%.4f H2=%.4f I2=%.4f alpha=%.4f"%(x,c+2*x,a-x,b-x,x/min(a,b) if min(a,b)>0 else 0))
print("Q example 0.1,0.2,0.4:", 0.4**2/(0.1*0.2))
print("sqrt50",math.sqrt(50), "x=", math.sqrt(50)/(2+math.sqrt(50)))
print("--- Ester K=4 ---")
for a,b in [(1,1),(1,3),(1,10),(1,2),(2,1)]:
    x=solve(lambda x:x*x/((a-x)*(b-x))-4,0,min(a,b)-1e-9); print("ester",a,b,"x=%.4f vytezek=%.1f%%"%(x,100*x/min(a,b)))
print("--- PCl5 K=0.0415 ---")
for c0 in [0.1,1.0,0.01,0.5]:
    x=solve(lambda x:x*x/(c0-x)-0.0415,0,c0-1e-12); print("PCl5 c0",c0,"x=%.5f alpha=%.3f"%(x,x/c0))
print("Kp PCl5 = Kc*RT = %.3f"%(0.0415*0.08206*523.15))
print("--- CaCO3 ---")
dH=178.3; dS=160.6
for T in [298.15,900,1000,1100,1110,1200]:
    dG=dH-T*dS/1000; K=math.exp(-dG*1000/(R*T)); print("T",T,"dG %.1f K %.3g"%(dG,K))
print("--- SO3 ---")
dG=2*(-371.1)-2*(-300.1); dHs=2*(-395.7)-2*(-296.8); K=K_from_dG(dG); print("dG %.1f dH %.1f K298 %.3g"%(dG,dHs,K))
for T in [700,723,1000]: print(T,"%.3g"%vh(K,298.15,T,dHs))
print("--- shift ---")
dG=-394.4-(-137.2-228.6); dHw=-393.5-(-110.5-241.8); K=K_from_dG(dG); print("dG %.1f dH %.1f K298 %.3g"%(dG,dHw,K))
for T in [700,773,800,1000]: print(T,"%.3g"%vh(K,298.15,T,dHw))
print("--- alpha A<=>B ---")
for K in [0.001,0.01,0.1,1,10,100,1000]: print(K,"%.4f"%(K/(1+K)))
print("--- A<=>2B K=1 ---")
for c0 in [0.1,1,10]:
    a=(-1+math.sqrt(1+16*c0))/(8*c0); print(c0,"%.3f"%a)
print("--- van t Hoff quiz: dH=-100, 300->400 ---", "%.3g"%math.exp(-(-100000/R)*(1/400-1/300)))
print("dH=+50, 300->600: %.3g"%math.exp(-(50000/R)*(1/600-1/300)))
print("--- K = exp(-dG/RT) misc ---")
print("dG=-33.0 at 298: %.3g"%K_from_dG(-33.0))
print("dG=+20 at 298: %.3g"%K_from_dG(20), "dG=+20 at 1000: %.3g"%K_from_dG(20,1000))
print("RT at 298.15 = %.4f kJ"%(R*298.15/1000), "RT ln10 = %.3f"%(R*298.15*math.log(10)/1000))
print("ln(0.148)=%.3f"%math.log(0.148))
print("Kc->Kp Haber Kc(500K)=0.060: Kp=%.3g"%(0.060/(0.08314*500)**2))
# Fe SCN
print("FeSCN: K=138: Fe0=0.001, SCN0=0.001: ")
x=solve(lambda x:x/((0.001-x)**2)-138,0,0.001-1e-12); print("x=%.3e frac=%.3f"%(x,x/0.001))
# blood pH
print("Henderson: pH = 6.1+log10(24/(0.03*40)) = %.2f"%(6.1+math.log10(24/(0.03*40))))
