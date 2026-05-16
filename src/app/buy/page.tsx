"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Smartphone,
  ArrowLeft,

  CheckCircle2,
  Copy,
  Share2,
  ArrowRight,
  ShieldCheck,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { generateSTSToken } from "@/lib/sts";
import { cn } from "@/lib/utils";

const QUICK_AMOUNTS = [5000, 10000, 50000];

export default function PurchasePage() {
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
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentModal(false);
      const token = generateSTSToken(meterNumber);
      setGeneratedToken(token);
    }, 2500);
  };

  const copyToken = () => {
    if (generatedToken) {
      navigator.clipboard.writeText(generatedToken.replace(/\s/g, ""));
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-opere-cyan/30">
      <header className="px-4 lg:px-6 h-20 flex items-center bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
        <Link className="flex items-center gap-2 group" href="/">
          <div className="p-2 bg-snel-gold/10 rounded-xl group-hover:bg-snel-gold/20 transition-colors">
            <ArrowLeft className="h-5 w-5 text-snel-gold" />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest text-foreground/70 group-hover:text-snel-gold transition-colors">Retour</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
            <Zap className="h-5 w-5 text-snel-gold fill-snel-gold" />
            <span className="text-xl font-black text-snel-gold tracking-tighter">SNEL-PAY</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 py-12 md:py-24 relative">
        <AnimatePresence mode="wait">
          {!generatedToken ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl"
            >
              <div className="mb-10 text-center space-y-2">
                <h1 className="text-4xl font-black tracking-tight">Recharge de <span className="text-snel-gold">Crédit</span></h1>
                <p className="text-foreground/50 font-medium">Saisissez les détails de votre compteur pour continuer.</p>
              </div>

              <Card className="border-border bg-muted/50 backdrop-blur-2xl shadow-3xl">
                <CardHeader className="bg-snel-blue/10 border-b border-border px-8 py-8">
                  <CardTitle className="text-2xl">Détails de l&apos;Achat</CardTitle>
                  <CardDescription className="text-foreground/60 font-medium">Remplissez le formulaire ci-dessous</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <form onSubmit={handleStartPayment} className="space-y-8">
                    <div className="space-y-3">
                      <Label htmlFor="meter" className="text-xs font-black uppercase tracking-[0.2em] text-foreground/50">Numéro du Compteur (11 chiffres)</Label>
                      <div className="relative group">
                        <Input
                          id="meter"
                          placeholder="Ex: 14253647586"
                          value={meterNumber}
                          onChange={(e) => setMeterNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
                          className="h-16 pl-14 text-xl tracking-[0.2em] font-mono bg-muted/50 border-border focus:border-snel-gold/50 transition-all rounded-2xl"
                          required
                        />
                        <Smartphone className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-foreground/30 group-focus-within:text-snel-gold transition-colors" />
                      </div>
                      {meterNumber.length > 0 && meterNumber.length < 11 && (
                        <p className="text-xs text-snel-gold/80 font-bold flex items-center gap-1">
                          <Info className="w-3 h-3" /> Le numéro doit comporter 11 chiffres
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <Label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/50">Montant de la Recharge (FC)</Label>
                      <div className="grid grid-cols-3 gap-3">
                        {QUICK_AMOUNTS.map((amt) => (
                          <Button
                            key={amt}
                            type="button"
                            variant="outline"
                            className={cn(
                              "h-14 font-black rounded-xl border-border transition-all",
                              amount === amt.toString()
                                ? "bg-snel-gold text-snel-blue border-snel-gold scale-[1.02]"
                                : "bg-muted/50 hover:bg-muted"
                            )}
                            onClick={() => setAmount(amt.toString())}
                          >
                            {amt.toLocaleString()}
                          </Button>
                        ))}
                      </div>
                      <Input
                        type="number"
                        placeholder="Saisir un autre montant..."
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="h-14 bg-muted/50 border-border focus:border-snel-gold/50 rounded-xl"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/50">Opérateur de Paiement</Label>
                      <Select onValueChange={(val) => setProvider(val)} value={provider || ""} required>
                        <SelectTrigger className="h-14 bg-muted/50 border-border rounded-xl">
                          <SelectValue placeholder="Choisir votre opérateur" />
                        </SelectTrigger>
                        <SelectContent className="bg-background/80 backdrop-blur-md border-border">
                          <SelectItem value="M-PESA" className="font-bold">M-PESA (Vodacom)</SelectItem>
                          <SelectItem value="ORANGE" className="font-bold">Orange Money</SelectItem>
                          <SelectItem value="AIRTEL" className="font-bold">Airtel Money</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-18 text-xl font-black bg-snel-blue hover:bg-snel-blue/90 text-white rounded-2xl shadow-2xl shadow-snel-blue/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                      disabled={meterNumber.length !== 11 || !amount || !provider}
                    >
                      Procéder au Paiement <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-border py-6 bg-muted/50">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-opere-emerald" /> Paiement sécurisé • Cryptage 256-bit
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-xl"
            >
              <Card className="border-none bg-muted/50 backdrop-blur-2xl shadow-3xl overflow-hidden">
                <div className="h-3 bg-opere-emerald" />
                <CardHeader className="text-center pt-12 pb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="mx-auto w-24 h-24 bg-opere-emerald/20 rounded-3xl flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-14 h-14 text-opere-emerald" />
                  </motion.div>
                  <CardTitle className="text-4xl font-black tracking-tight">Achat Réussi !</CardTitle>
                  <CardDescription className="text-foreground/50 font-medium leading-relaxed text-lg mt-2">Votre jeton STS est prêt à l&apos;emploi</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-10 space-y-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-opere-cyan/10 blur-3xl rounded-full opacity-20 -z-10" />
                    <div className="bg-muted border border-border p-10 rounded-3xl text-center space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-snel-gold">TOKEN DE RECHARGE (20 CHIFFRES)</p>
                      <p className="text-4xl md:text-5xl font-mono font-black tracking-tight text-white selection:bg-snel-gold selection:text-snel-blue">
                        {generatedToken}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-14 gap-2 font-black rounded-2xl border-border hover:bg-muted transition-all cursor-pointer"
                      onClick={copyToken}
                    >
                      <Copy className="w-5 h-5" /> COPIER
                    </Button>
                    <Button
                      variant="outline"
                      className="h-14 gap-2 font-black rounded-2xl border-border hover:bg-muted transition-all cursor-pointer"
                    >
                      <Share2 className="w-5 h-5" /> PARTAGER
                    </Button>
                  </div>

                  <div className="pt-8 border-t border-border space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Compteur</span>
                      <span className="font-mono font-bold text-lg">{meterNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Montant Payé</span>
                      <span className="font-black text-xl text-snel-gold">{Number(amount).toLocaleString()} FC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Énergie Estimée</span>
                      <span className="font-black text-xl text-opere-emerald">{(Number(amount) / 330).toFixed(1)} kWh</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-8 bg-muted/50">
                  <Button
                    className="w-full h-16 text-lg font-black bg-snel-blue hover:bg-snel-blue/90 text-white rounded-2xl cursor-pointer"
                    onClick={() => {
                      setGeneratedToken(null);
                      setAmount("");
                      setMeterNumber("");
                      setProvider("");
                    }}
                  >
                    Effectuer un Nouvel Achat
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-md border-border rounded-[2rem] p-8">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-3xl font-black tracking-tight text-center">Validation <span className="text-snel-gold">Mobile</span></DialogTitle>
            <DialogDescription className="text-center font-medium leading-relaxed text-foreground/60">
              Une demande de paiement va être envoyée à votre téléphone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-10 space-y-6">
            <div className="relative">
                <div className="absolute inset-0 bg-snel-blue/20 blur-2xl rounded-full animate-pulse" />
                <div className="relative w-24 h-24 bg-snel-blue/10 rounded-[2rem] flex items-center justify-center border border-border">
                    <Smartphone className="w-12 h-12 text-snel-gold animate-bounce" />
                </div>
            </div>
            <div className="text-center space-y-2">
              <p className="font-black text-xl tracking-tight">Attente de confirmation...</p>
              <p className="text-sm font-medium text-foreground/40">Veuillez saisir votre code PIN on votre mobile.</p>
            </div>
            <div className="bg-muted/50 p-6 rounded-2xl border border-border w-full space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Opérateur</span>
                <span className="font-bold text-opere-blue">{provider}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Montant</span>
                <span className="font-black text-xl text-snel-gold">{Number(amount).toLocaleString()} FC</span>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="ghost"
              className="h-14 font-bold rounded-xl hover:bg-muted/50 transition-all"
              onClick={() => setShowPaymentModal(false)}
              disabled={isProcessing}
            >
              Annuler
            </Button>
            <Button
              className="flex-1 h-14 bg-snel-gold text-snel-blue font-black rounded-xl hover:bg-snel-gold/90 transition-all shadow-xl shadow-snel-gold/20"
              onClick={simulatePayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Traitement en cours..." : "Simuler Validation (OK)"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
