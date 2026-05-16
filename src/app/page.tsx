import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, ShieldCheck, Clock, Smartphone, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-100">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Zap className="h-6 w-6 text-[#D4AF37] fill-[#D4AF37]" />
          <span className="text-xl font-bold text-[#003366]">SNEL-PAY</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-[#003366] transition-colors" href="#features">
            Avantages
          </Link>
          <Link className="text-sm font-medium hover:text-[#003366] transition-colors" href="#how-it-works">
            Comment ça marche
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-slate-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#003366]">
                  L'énergie à portée de main, <br /> instantanément.
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl">
                  Rechargez votre compteur SNEL prépayé en quelques secondes avec votre mobile. Simple, rapide et sécurisé.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/buy">
                  <Button className="bg-[#003366] hover:bg-[#002244] text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-blue-900/20">
                    Recharger maintenant <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-blue-50 rounded-full">
                  <Clock className="h-8 w-8 text-[#003366]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366]">Rapidité Éclair</h3>
                <p className="text-slate-500">Recevez votre jeton STS immédiatement après validation du paiement.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-blue-50 rounded-full">
                  <ShieldCheck className="h-8 w-8 text-[#003366]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366]">Paiement Sécurisé</h3>
                <p className="text-slate-500">Vos transactions sont protégées par les plus hauts standards de sécurité bancaire.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-blue-50 rounded-full">
                  <Smartphone className="h-8 w-8 text-[#003366]" />
                </div>
                <h3 className="text-xl font-bold text-[#003366]">Multi-Opérateurs</h3>
                <p className="text-slate-500">Compatible avec M-Pesa, Airtel Money et Orange Money.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#003366]">Comment ça marche ?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="relative p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#D4AF37] text-[#003366] rounded-full flex items-center justify-center font-bold text-xl">1</div>
                <h3 className="text-lg font-bold mb-2">Saisissez vos infos</h3>
                <p className="text-slate-500 text-sm">Entrez votre numéro de compteur et le montant souhaité.</p>
              </div>
              <div className="relative p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#D4AF37] text-[#003366] rounded-full flex items-center justify-center font-bold text-xl">2</div>
                <h3 className="text-lg font-bold mb-2">Payez par Mobile</h3>
                <p className="text-slate-500 text-sm">Validez la transaction sur votre téléphone via votre opérateur mobile.</p>
              </div>
              <div className="relative p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#D4AF37] text-[#003366] rounded-full flex items-center justify-center font-bold text-xl">3</div>
                <h3 className="text-lg font-bold mb-2">Activez votre crédit</h3>
                <p className="text-slate-500 text-sm">Recevez instantanément votre jeton de 20 chiffres à saisir sur le compteur.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-[#003366]">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Prêt à recharger ?</h2>
            <p className="text-blue-100 mb-8 max-w-lg mx-auto">Rejoignez des milliers d'utilisateurs qui font confiance à SNEL-PAY pour leur électricité.</p>
            <Link href="/buy">
              <Button className="bg-[#D4AF37] hover:bg-[#c4a030] text-[#003366] font-bold px-8 py-6 text-lg rounded-full">
                Commencer maintenant
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-100 bg-white">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#D4AF37] fill-[#D4AF37]" />
            <span className="font-bold text-[#003366]">SNEL-PAY</span>
          </div>
          <p className="text-sm text-slate-500">© 2024 SNEL-PAY. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link className="text-sm text-slate-500 hover:underline" href="#">
              Conditions
            </Link>
            <Link className="text-sm text-slate-500 hover:underline" href="#">
              Confidentialité
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
