"use client"

import { CreditCard, Plus, Landmark, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function PaymentsPage() {
  const paymentMethods = [
    { id: 1, type: "Mobile Money", provider: "M-Pesa", number: "+243 812 *** 456", isDefault: true },
    { id: 2, type: "Mobile Money", provider: "Airtel Money", number: "+243 998 *** 123", isDefault: false },
    { id: 3, type: "Carte Bancaire", provider: "Visa", number: "**** **** **** 8890", isDefault: false },
  ]

  return (
    <div className="p-6 md:p-10 space-y-10 overflow-y-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">Modes de Paiement</h1>
          <p className="text-foreground/50 font-medium">Gérez vos options de paiement enregistrées.</p>
        </div>
        <Button className="bg-snel-blue hover:bg-snel-blue/90 text-white font-bold rounded-xl gap-2">
          <Plus className="h-4 w-4" /> Ajouter un mode
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="border-border bg-muted/50 relative overflow-hidden group">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-3 bg-background rounded-xl border border-border">
                {method.type === "Carte Bancaire" ? <CreditCard className="h-6 w-6 text-snel-gold" /> : <Landmark className="h-6 w-6 text-snel-blue" />}
              </div>
              <div className="space-y-1">
                <CardTitle className="text-lg font-bold">{method.provider}</CardTitle>
                <CardDescription className="text-xs uppercase font-black tracking-widest">{method.type}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xl font-mono tracking-wider font-bold">{method.number}</p>
              <div className="flex items-center justify-between">
                {method.isDefault ? (
                  <span className="text-[10px] font-black bg-opere-emerald/20 text-opere-emerald px-2 py-1 rounded-full uppercase tracking-tighter">Par défaut</span>
                ) : (
                  <Button variant="link" className="p-0 h-auto text-[10px] font-black uppercase tracking-widest text-foreground/50">Définir par défaut</Button>
                )}
                <Button variant="ghost" size="icon" className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed border-2 border-border bg-transparent flex items-center justify-center p-8 hover:bg-muted/30 transition-colors cursor-pointer group">
            <div className="flex flex-col items-center gap-2">
                <div className="p-4 rounded-full bg-muted group-hover:bg-snel-gold/10 transition-colors">
                    <Plus className="h-8 w-8 text-foreground/20 group-hover:text-snel-gold" />
                </div>
                <p className="text-sm font-bold text-foreground/40 group-hover:text-foreground">Ajouter une option</p>
            </div>
        </Card>
      </div>
    </div>
  )
}
