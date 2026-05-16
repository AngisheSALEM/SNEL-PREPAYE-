"use client"

import Link from "next/link"
import {
  Zap,
  History,
  CreditCard,
  Activity,
  ArrowUpRight,
  TrendingUp,
  LayoutDashboard,
  Settings,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardPage() {
  const transactions = [
    { date: "15 Mai 2024", amount: "50,000 FC", energy: "151.5 kWh", status: "Réussi" },
    { date: "02 Mai 2024", amount: "20,000 FC", energy: "60.6 kWh", status: "Réussi" },
    { date: "18 Avril 2024", amount: "100,000 FC", energy: "303.0 kWh", status: "Réussi" },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar - Minimalist */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-muted/30 p-6 flex flex-col gap-8">
        <Link className="flex items-center gap-2 group" href="/">
          <div className="p-2 bg-snel-gold/20 rounded-xl">
            <Zap className="h-6 w-6 text-snel-gold fill-snel-gold" />
          </div>
          <span className="text-xl font-black tracking-tighter text-snel-gold">SNEL-PAY</span>
        </Link>

        <nav className="flex flex-col gap-2 flex-1">
          <Button variant="ghost" className="justify-start gap-3 rounded-xl bg-snel-gold/10 text-snel-gold font-bold">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Button>
          <Button variant="ghost" className="justify-start gap-3 rounded-xl text-foreground/60 hover:text-foreground">
            <History className="h-5 w-5" /> Historique
          </Button>
          <Button variant="ghost" className="justify-start gap-3 rounded-xl text-foreground/60 hover:text-foreground">
            <CreditCard className="h-5 w-5" /> Paiements
          </Button>
          <Button variant="ghost" className="justify-start gap-3 rounded-xl text-foreground/60 hover:text-foreground">
            <Settings className="h-5 w-5" /> Paramètres
          </Button>
        </nav>

        <Button variant="ghost" className="justify-start gap-3 rounded-xl text-destructive hover:bg-destructive/10">
          <LogOut className="h-5 w-5" /> Déconnexion
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 space-y-10 overflow-y-auto">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Bonjour, Jean</h1>
            <p className="text-foreground/50 font-medium italic">Bienvenue sur votre espace personnel.</p>
          </div>
          <div className="flex items-center gap-4">
             <ThemeToggle />
             <Link href="/buy">
                <Button className="bg-snel-blue hover:bg-snel-blue/90 text-white font-bold rounded-xl px-6">
                    Acheter du crédit
                </Button>
             </Link>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border bg-muted/50 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Consommation</CardTitle>
              <Activity className="h-4 w-4 text-snel-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">75%</div>
              <p className="text-xs text-foreground/40 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-opere-emerald" /> +2.5% depuis hier
              </p>
              <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-snel-gold rounded-full" style={{ width: '75%' }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-muted/50 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Abonnement</CardTitle>
              <CreditCard className="h-4 w-4 text-opere-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">Domestique Premium</div>
              <p className="text-xs text-foreground/40 mt-1">Status: Actif</p>
              <div className="mt-4 flex items-center gap-2">
                 <span className="text-[10px] font-black bg-opere-emerald/20 text-opere-emerald px-2 py-0.5 rounded-full uppercase tracking-tighter">Illimité Weekend</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-muted/50 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Solde Estimé</CardTitle>
              <Zap className="h-4 w-4 text-opere-cyan" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">42.5 kWh</div>
              <p className="text-xs text-foreground/40 mt-1">~ 3 jours restants</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Purchases */}
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-black tracking-tight">Derniers Achats</h2>
                <Button variant="link" className="text-snel-gold font-bold p-0">Tout voir <ArrowUpRight className="h-4 w-4 ml-1" /></Button>
            </div>
            <Card className="border-border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-border">
                            <TableHead className="text-[10px] font-black uppercase tracking-widest">Date</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest">Montant</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest">Énergie</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((t, i) => (
                            <TableRow key={i} className="border-border">
                                <TableCell className="font-medium">{t.date}</TableCell>
                                <TableCell className="font-bold text-snel-gold">{t.amount}</TableCell>
                                <TableCell className="font-bold text-opere-emerald">{t.energy}</TableCell>
                                <TableCell className="text-right">
                                    <span className="text-[10px] font-black px-2 py-1 bg-opere-emerald/10 text-opere-emerald rounded-lg uppercase">
                                        {t.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
      </main>
    </div>
  )
}
