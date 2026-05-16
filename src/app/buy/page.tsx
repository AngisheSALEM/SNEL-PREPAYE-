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
import { Zap, Smartphone, Copy, Share2, CheckCircle2, CreditCard } from "lucide-react";
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
      <main className="min-h-screen bg-slate-50 flex flex-col items-center p-4 pt-12 md:pt-24">
        <Card className="w-full max-w-md border-t-4 border-t-emerald-500 shadow-lg">
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

            <div className="pt-4 border-t border-slate-100 text-sm text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Compteur:</span>
                <span className="font-semibold text-slate-700">{meterNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Montant:</span>
                <span className="font-semibold text-slate-700">{Number(amount).toLocaleString()} FC</span>
              </div>
              <div className="flex justify-between">
                <span>Énergie approx:</span>
                <span className="font-semibold text-emerald-600">{(Number(amount) / 330).toFixed(1)} kWh</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-[#003366] hover:bg-[#002244]"
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
    <main className="min-h-screen bg-slate-50 flex flex-col items-center p-4 pt-8 md:pt-16">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Zap className="w-8 h-8 text-[#D4AF37] fill-[#D4AF37]" />
          <h1 className="text-3xl font-black text-[#003366] tracking-tight">SNEL-PAY</h1>
        </div>
        <p className="text-slate-500 font-medium">Recharge prépayée instantanée</p>
      </div>

      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="bg-[#003366] text-white rounded-t-xl">
          <CardTitle>Achat de Crédit</CardTitle>
          <CardDescription className="text-slate-300">Entrez les détails de votre compteur</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleStartPayment} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="meter" className="text-slate-700 font-bold">Numéro du Compteur (11 chiffres)</Label>
              <div className="relative">
                <Input
                  id="meter"
                  placeholder="Ex: 14253647586"
                  value={meterNumber}
                  onChange={(e) => setMeterNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  className="pl-10 text-lg tracking-widest font-mono"
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
                    className={amount === amt.toString() ? "bg-[#D4AF37] text-[#003366] hover:bg-[#c4a030] font-bold border-none" : ""}
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
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-bold">Mode de Paiement</Label>
              <Select onValueChange={(val) => setProvider(val)} value={provider || ""} required>
                <SelectTrigger>
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
              className="w-full h-12 text-lg font-bold bg-[#003366] hover:bg-[#002244] shadow-lg shadow-blue-900/20"
              disabled={meterNumber.length !== 11 || !amount || !provider}
            >
              Payer Maintenant
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-50 pt-4 bg-slate-50/50 rounded-b-xl">
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <CreditCard className="w-3 h-3" /> Paiement sécurisé par cryptage SSL
          </p>
        </CardFooter>
      </Card>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Validation du Paiement</DialogTitle>
            <DialogDescription>
              Une demande USSD va être envoyée à votre téléphone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center animate-pulse">
              <Smartphone className="w-10 h-10 text-[#003366]" />
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">Attente de confirmation...</p>
              <p className="text-sm text-slate-500">Veuillez saisir votre code PIN sur votre mobile.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border w-full text-sm">
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
              className="bg-[#003366]"
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
