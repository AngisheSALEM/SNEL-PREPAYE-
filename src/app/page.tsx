"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Zap, Smartphone, Copy, Share2, CheckCircle2, CreditCard, ShieldCheck, Clock } from "lucide-react";
import { generateSTSToken } from "@/lib/sts";

const QUICK_AMOUNTS = [5000, 10000, 50000];

export default function ClientPage() {
  const [meterNumber, setMeterNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (meterNumber.length !== 11) return;
    if (!amount || !provider) return;
    setShowPaymentModal(true);
  };

  const simulatePayment = () => {
    setIsProcessing(true);
    // Simulate USSD/Payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      const token = generateSTSToken(meterNumber);
      setGeneratedToken(token);
    }, 2000);
  };

  const copyToken = () => {
    if (generatedToken) {
      navigator.clipboard.writeText(generatedToken.replace(/\s/g, ""));
    }
  };

  if (generatedToken) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md border-t-4 border-t-emerald-500 shadow-2xl glass">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">Achat Réussi !</CardTitle>
            <CardDescription>Votre jeton de recharge SNEL est prêt</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-900 text-white p-6 rounded-xl text-center shadow-inner">
              <p className="text-slate-400 text-sm mb-2 uppercase tracking-widest font-semibold">TOKEN STS (20 CHIFFRES)</p>
              <p className="text-3xl font-mono font-bold tracking-tighter sm:text-4xl text-yellow-400">
                {generatedToken}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex gap-2" onClick={copyToken}>
                <Copy className="w-4 h-4" /> Copier
              </Button>
              <Button variant="outline" className="flex gap-2">
                <Share2 className="w-4 h-4" /> Partager
              </Button>
            </div>

            <div className="pt-4 border-t border-slate-100/20 text-sm text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Compteur:</span>
                <span className="font-semibold text-slate-800">{meterNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Montant:</span>
                <span className="font-semibold text-slate-800">{Number(amount).toLocaleString()} FC</span>
              </div>
              <div className="flex justify-between">
                <span>Énergie approx:</span>
                <span className="font-semibold text-emerald-600">{(Number(amount) / 330).toFixed(1)} kWh</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-[#003366] hover:bg-[#002244] text-white"
              onClick={() => {
                setGeneratedToken(null);
                setAmount("");
                setMeterNumber("");
                setProvider("");
              }}
            >
              Nouvel Achat
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003366]/10 text-[#003366] text-sm font-semibold">
                <Zap className="w-4 h-4 fill-current" />
                <span>Nouveau : Paiement instantané</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-[#003366] leading-tight">
                L&apos;énergie de demain, <br />
                <span className="text-[#D4AF37]">en un clic.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl">
                Rechargez votre compteur SNEL en quelques secondes. Simple, rapide et sécurisé, SNEL-PAY est disponible partout en RDC.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button size="lg" className="bg-[#003366] hover:bg-[#002244] text-white px-8 h-14 text-lg">
                  Recharger maintenant
                </Button>
                <Button size="lg" variant="outline" className="px-8 h-14 text-lg">
                  Comment ça marche ?
                </Button>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <Card className="shadow-2xl border-none glass overflow-hidden">
                <CardHeader className="bg-[#003366] text-white p-6">
                  <CardTitle className="text-xl">Achat de Crédit</CardTitle>
                  <CardDescription className="text-slate-300">Entrez les détails de votre compteur</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 p-6">
                  <form onSubmit={handleStartPayment} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="meter" className="text-slate-700 font-bold">Numéro du Compteur (11 chiffres)</Label>
                      <div className="relative">
                        <Input
                          id="meter"
                          placeholder="Ex: 14253647586"
                          value={meterNumber}
                          onChange={(e) => setMeterNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
                          className="pl-10 h-12 text-lg tracking-widest font-mono bg-white/50"
                          required
                        />
                        <Smartphone className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                      {meterNumber.length > 0 && meterNumber.length < 11 && (
                        <p className="text-xs text-amber-600 font-medium italic">Le numéro doit comporter 11 chiffres</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700 font-bold">Montant (FC)</Label>
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        {QUICK_AMOUNTS.map((amt) => (
                          <Button
                            key={amt}
                            type="button"
                            variant={amount === amt.toString() ? "default" : "outline"}
                            className={amount === amt.toString() ? "bg-[#D4AF37] text-[#003366] hover:bg-[#c4a030] font-bold border-none" : "bg-white/50"}
                            onClick={() => setAmount(amt.toString())}
                          >
                            {amt.toLocaleString()}
                          </Button>
                        ))}
                      </div>
                      <Input
                        type="number"
                        placeholder="Autre montant..."
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-12 bg-white/50"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-700 font-bold">Mode de Paiement</Label>
                      <Select onValueChange={(val) => setProvider(val)} value={provider || ""} required>
                        <SelectTrigger className="h-12 bg-white/50">
                          <SelectValue placeholder="Choisir un opérateur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M-PESA">M-PESA (Vodacom)</SelectItem>
                          <SelectItem value="ORANGE">Orange Money</SelectItem>
                          <SelectItem value="AIRTEL">Airtel Money</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-14 text-lg font-bold bg-[#003366] hover:bg-[#002244] text-white shadow-lg shadow-blue-900/20"
                      disabled={meterNumber.length !== 11 || !amount || !provider}
                    >
                      Payer Maintenant
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-slate-200/20 pt-4 bg-white/20">
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <CreditCard className="w-3 h-3" /> Paiement sécurisé par cryptage SSL
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Animated Background Decoration */}
        <div className="absolute top-0 right-0 -z-10 w-full h-full">
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#003366]/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">Pourquoi choisir SNEL-PAY ?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Nous simplifions l&apos;accès à l&apos;électricité pour des millions de foyers en RDC.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass p-8 border-none space-y-4 hover:translate-y-[-5px] transition-transform">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#003366]" />
              </div>
              <h3 className="text-xl font-bold text-[#003366]">Disponibilité 24/7</h3>
              <p className="text-slate-600">N&apos;attendez plus que les bureaux ouvrent. Rechargez à toute heure, même en plein milieu de la nuit.</p>
            </Card>

            <Card className="glass p-8 border-none space-y-4 hover:translate-y-[-5px] transition-transform">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-[#003366]">Vitesse Éclair</h3>
              <p className="text-slate-600">Votre jeton STS est généré instantanément après la confirmation de votre paiement mobile.</p>
            </Card>

            <Card className="glass p-8 border-none space-y-4 hover:translate-y-[-5px] transition-transform">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-[#003366]">100% Sécurisé</h3>
              <p className="text-slate-600">Vos transactions sont protégées par les protocoles de sécurité les plus avancés du marché.</p>
            </Card>
          </div>
        </div>
      </section>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md glass">
          <DialogHeader>
            <DialogTitle>Validation du Paiement</DialogTitle>
            <DialogDescription>
              Une demande USSD va être envoyée à votre téléphone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-20 h-20 bg-slate-100/50 rounded-full flex items-center justify-center animate-pulse">
              <Smartphone className="w-10 h-10 text-[#003366]" />
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">Attente de confirmation...</p>
              <p className="text-sm text-slate-500">Veuillez saisir votre code PIN sur votre mobile.</p>
            </div>
            <div className="bg-white/50 p-4 rounded-lg border border-slate-200/50 w-full text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-slate-500">Opérateur:</span>
                <span className="font-bold">{provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Montant:</span>
                <span className="font-bold">{Number(amount).toLocaleString()} FC</span>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="ghost"
              onClick={() => setShowPaymentModal(false)}
              disabled={isProcessing}
            >
              Annuler
            </Button>
            <Button
              className="bg-[#003366] text-white"
              onClick={simulatePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Traitement..." : "Simuler Validation (OK)"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
