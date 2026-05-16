import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, ShieldCheck, Clock, Smartphone, ArrowRight, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen text-foreground selection:bg-opere-cyan/30">
      {/* Header */}
      <header className="px-4 lg:px-6 h-20 flex items-center bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
        <Link className="flex items-center justify-center gap-2 group" href="/">
          <div className="p-2 bg-snel-gold/20 rounded-xl group-hover:bg-snel-gold/20 transition-colors">
            <Zap className="h-6 w-6 text-snel-gold fill-snel-gold" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-snel-gold">SNEL-PAY</span>
        </Link>
        <nav className="ml-auto flex gap-6 sm:gap-8">
          <Link className="text-[10px] font-black uppercase tracking-widest text-foreground hover:text-snel-gold transition-colors" href="#features">
            Avantages
          </Link>
          <Link className="text-[10px] font-black uppercase tracking-widest text-foreground hover:text-snel-gold transition-colors" href="#how-it-works">
            Guide
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-48 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-4xl">
                <h1 className="text-4xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none leading-[1.1]">
                  L&apos;énergie à <span className="text-snel-gold">portée de main</span>,<br />
                  <span className="text-gradient">instantanément.</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-foreground md:text-xl font-medium leading-relaxed mt-6">
                  Rechargez votre compteur SNEL prépayé en quelques secondes. Une expérience premium, fluide et entièrement sécurisée.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Link href="/buy">
                  <Button className="bg-snel-blue hover:bg-snel-blue/90 text-white px-10 py-8 text-xl font-bold rounded-2xl shadow-2xl shadow-snel-blue/20 transition-all hover:scale-105 active:scale-95 border border-white/10 cursor-pointer">
                    Recharger maintenant <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="#" target="_blank">
                  <Button className="btn-whatsapp-gradient text-white px-10 py-8 text-xl font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer">
                    Aide via WhatsApp <MessageCircle className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 md:py-32 relative">
          <div className="container px-4 md:px-6 mx-auto">
             <div className="text-center mb-16 space-y-2">
                <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Pourquoi choisir <span className="text-snel-gold">SNEL-PAY</span>?</h2>
                <p className="text-foreground/70 font-medium">La simplicité au service de votre confort.</p>
             </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Clock, title: "Rapidité Éclair", desc: "Recevez votre jeton STS immédiatement après validation du paiement.", color: "text-opere-cyan" },
                { icon: ShieldCheck, title: "Sécurité Totale", desc: "Vos transactions sont protégées par les plus hauts standards de sécurité bancaire.", color: "text-opere-emerald" },
                { icon: Smartphone, title: "Multi-Opérateurs", desc: "Compatible avec M-Pesa, Airtel Money et Orange Money pour plus de flexibilité.", color: "text-opere-blue" }
              ].map((feature, i) => (
                <Card key={i} className="group border-border bg-muted/50 backdrop-blur-xl">
                  <CardContent className="pt-8 flex flex-col items-center text-center space-y-4">
                    <div className={cn("p-5 rounded-2xl bg-muted group-hover:bg-foreground/10 transition-colors", feature.color)}>
                      <feature.icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                    <p className="text-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section id="how-it-works" className="w-full py-24 md:py-32 relative">
           <div className="absolute inset-0 bg-snel-blue/10 -z-10" />
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 space-y-2">
                <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Comment ça marche ?</h2>
                <p className="text-foreground/70 font-medium">Trois étapes simples pour retrouver la lumière.</p>
             </div>
            <div className="grid gap-12 md:grid-cols-3 pt-8">
              {[
                { step: "1", title: "Saisissez vos infos", desc: "Entrez votre numéro de compteur et le montant souhaité." },
                { step: "2", title: "Payez par Mobile", desc: "Validez la transaction sur votre téléphone via votre opérateur." },
                { step: "3", title: "Activez votre crédit", desc: "Recevez instantanément votre jeton de 20 chiffres par SMS." }
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <Card className="h-full border-border bg-muted/50 backdrop-blur-xl">
                    <CardContent className="pt-12">
                      <div className="absolute -top-6 left-6 w-14 h-14 bg-snel-gold text-snel-blue rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl shadow-snel-gold/20 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                        {item.step}
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-24 md:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <Card className="bg-gradient-to-br from-snel-blue to-blue-900 border-none shadow-3xl overflow-hidden">
                <CardContent className="p-12 md:p-20 text-center space-y-8 relative z-10">
                    <h2 className="text-4xl font-black text-white sm:text-6xl tracking-tight">Prêt à recharger ?</h2>
                    <p className="text-white/70 text-xl max-w-2xl mx-auto font-medium">Rejoignez des milliers d&apos;utilisateurs qui font confiance à SNEL-PAY pour leur électricité au quotidien.</p>
                    <Link href="/buy" className="inline-block mt-4">
                    <Button className="bg-snel-gold hover:bg-snel-gold/90 text-snel-blue font-black px-12 py-10 text-2xl rounded-3xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-snel-gold/30 cursor-pointer">
                        Commencer maintenant
                    </Button>
                    </Link>
                </CardContent>
                <div className="absolute top-0 right-0 w-64 h-64 bg-muted/50 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-snel-gold/20 rounded-full blur-3xl -ml-32 -mb-32" />
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background/80 backdrop-blur-md mt-auto">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-snel-gold fill-snel-gold" />
            <span className="text-xl font-black text-snel-gold tracking-tighter">SNEL-PAY</span>
          </div>
          <p className="text-sm font-medium text-foreground/60 text-center">© 2024 SNEL-PAY. Développé pour la modernité de la RDC.</p>
          <div className="flex gap-8">
            <Link className="text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-snel-gold transition-colors" href="#">
              Conditions
            </Link>
            <Link className="text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-snel-gold transition-colors" href="#">
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
