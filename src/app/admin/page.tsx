import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Zap, LayoutDashboard, Users, CreditCard, Settings, LogOut, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-muted/30 p-6 flex flex-col gap-8">
        <Link className="flex items-center gap-2 group" href="/">
          <div className="p-2 bg-snel-gold/20 rounded-xl">
            <Zap className="h-6 w-6 text-snel-gold fill-snel-gold" />
          </div>
          <span className="text-xl font-black tracking-tighter text-snel-gold">SNEL-PAY</span>
        </Link>
        <nav className="flex flex-col gap-2 flex-1">
          <Button variant="ghost" className="justify-start gap-3 rounded-xl bg-snel-gold/10 text-snel-gold font-bold">
            <LayoutDashboard className="h-5 w-5" /> Admin Panel
          </Button>
          <Button variant="ghost" className="justify-start gap-3 rounded-xl text-foreground/60 hover:text-foreground">
            <Users className="h-5 w-5" /> Utilisateurs
          </Button>
          <Button variant="ghost" className="justify-start gap-3 rounded-xl text-foreground/60 hover:text-foreground">
            <CreditCard className="h-5 w-5" /> Transactions
          </Button>
          <Button variant="ghost" className="justify-start gap-3 rounded-xl text-foreground/60 hover:text-foreground">
            <Settings className="h-5 w-5" /> Config
          </Button>
        </nav>
        <Button variant="ghost" className="justify-start gap-3 rounded-xl text-destructive hover:bg-destructive/10">
          <LogOut className="h-5 w-5" /> Déconnexion
        </Button>
      </aside>

      <main className="flex-1 p-6 md:p-10 space-y-10 overflow-y-auto">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight">Vue d&apos;ensemble</h1>
            <p className="text-foreground/50 font-medium">Statistiques globales du système.</p>
          </div>
          <ThemeToggle />
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border bg-muted/50">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-black uppercase tracking-widest text-foreground/50">Total Ventes</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-black">1.2M FC</div></CardContent>
          </Card>
          <Card className="border-border bg-muted/50">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-black uppercase tracking-widest text-foreground/50">Utilisateurs</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-black">450</div></CardContent>
          </Card>
          <Card className="border-border bg-muted/50">
            <CardHeader className="pb-2"><CardTitle className="text-xs font-black uppercase tracking-widest text-foreground/50">Alertes</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-black text-destructive">2</div></CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
