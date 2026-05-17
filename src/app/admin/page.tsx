"use client"

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Zap,
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  LogOut,
  TrendingUp,
  AlertTriangle,
  Search,
  Download,
  Filter,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    { title: "Ventes Totales", value: "1,245,000 FC", icon: TrendingUp, color: "text-opere-emerald", trend: "+12%" },
    { title: "Utilisateurs Actifs", value: "450", icon: Users, color: "text-opere-blue", trend: "+5%" },
    { title: "Alertes Système", value: "2", icon: AlertTriangle, color: "text-destructive", trend: "-1" },
    { title: "Transactions (24h)", value: "128", icon: CreditCard, color: "text-snel-gold", trend: "+18%" }
  ];

  const recentUsers = [
    { name: "Jean Dupont", email: "jean.d@example.com", status: "Actif", joined: "12 Mai 2024" },
    { name: "Marie Kabila", email: "m.kabila@service.cd", status: "Actif", joined: "10 Mai 2024" },
    { name: "Paul Luvambo", email: "paul.luv@outlook.fr", status: "Suspendu", joined: "05 Mai 2024" },
    { name: "Sarah Tshisekedi", email: "sarah.t@gmail.com", status: "Actif", joined: "01 Mai 2024" },
  ];

  const recentTransactions = [
    { id: "TX-9021", user: "Jean Dupont", amount: "50,000 FC", type: "M-Pesa", date: "Il y a 2 min" },
    { id: "TX-9020", user: "Marie Kabila", amount: "20,000 FC", type: "Airtel", date: "Il y a 15 min" },
    { id: "TX-9019", user: "Inconnu", amount: "100,000 FC", type: "Visa", date: "Il y a 45 min" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <Link className="flex items-center gap-2" href="/">
          <div className="p-2 bg-snel-gold/20 rounded-xl">
            <Zap className="h-5 w-5 text-snel-gold fill-snel-gold" />
          </div>
          <span className="text-lg font-black tracking-tighter text-snel-gold">SNEL-PAY ADMIN</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-0 z-50 md:relative md:z-0 w-full md:w-64 border-r border-border bg-muted/30 p-6 flex flex-col gap-8 transition-transform duration-300 md:translate-x-0 bg-background md:bg-transparent",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex items-center justify-between md:justify-start">
            <Link className="flex items-center gap-2 group" href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="p-2 bg-snel-gold/20 rounded-xl">
                    <Zap className="h-6 w-6 text-snel-gold fill-snel-gold" />
                </div>
                <span className="text-xl font-black tracking-tighter text-snel-gold uppercase">Admin</span>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                <X />
            </Button>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <Button variant="ghost" className="justify-start gap-3 rounded-xl bg-snel-gold/10 text-snel-gold font-bold">
            <LayoutDashboard className="h-5 w-5" /> Vue d&apos;ensemble
          </Button>
          <Button variant="ghost" className="justify-start gap-3 rounded-xl text-foreground/60 hover:text-foreground">
            <Users className="h-5 w-5" /> Utilisateurs
          </Button>
          <Button variant="ghost" className="justify-start gap-3 rounded-xl text-foreground/60 hover:text-foreground">
            <CreditCard className="h-5 w-5" /> Transactions
          </Button>
          <Button variant="ghost" className="justify-start gap-3 rounded-xl text-foreground/60 hover:text-foreground">
            <Settings className="h-5 w-5" /> Configuration
          </Button>
        </nav>

        <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-destructive hover:bg-destructive/10">
                <LogOut className="h-5 w-5" /> Quitter Admin
            </Button>
        </Link>
      </aside>

      <main className="flex-1 p-6 md:p-10 space-y-10 overflow-y-auto selection:bg-snel-gold/30">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight uppercase">Dashboard Admin</h1>
            <p className="text-foreground/50 font-medium italic">Gestion centralisée du système SNEL-PAY.</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-10 w-10 rounded-full bg-snel-blue flex items-center justify-center text-white font-black">AD</div>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i} className="border-border bg-muted/50 backdrop-blur-sm">
              <CardContent className="pt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className={cn("p-2 bg-background rounded-lg border border-border", stat.color)}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-black text-opere-emerald bg-opere-emerald/10 px-2 py-0.5 rounded-full">{stat.trend}</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground/50">{stat.title}</p>
                  <p className="text-2xl font-black">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Users Table */}
          <Card className="border-border bg-background shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-muted/20 pb-4">
              <div>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Utilisateurs Récents</CardTitle>
                <p className="text-xs text-foreground/50">4 nouveaux aujourd&apos;hui</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg h-8 px-2 font-bold gap-1">
                <Filter className="h-3 w-3" /> Filtrer
              </Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-muted/10">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Nom</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Inscrit le</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/30">
                      <TableCell>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-[10px] text-foreground/40">{user.email}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Actif" ? "default" : "secondary"} className="text-[8px] font-black uppercase px-2 py-0">
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs font-medium text-foreground/60 italic">{user.joined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="p-4 border-t border-border flex justify-center">
                <Button variant="link" className="text-xs font-bold text-snel-gold">Voir tous les utilisateurs</Button>
            </div>
          </Card>

          {/* Transactions Table */}
          <Card className="border-border bg-background shadow-sm overflow-hidden">
             <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-muted/20 pb-4">
              <div>
                <CardTitle className="text-lg font-black uppercase tracking-tight">Flux de Paiement</CardTitle>
                <p className="text-xs text-foreground/50">Surveillance temps réel</p>
              </div>
              <div className="flex gap-2">
                 <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-foreground/30" />
                    <Input placeholder="Rechercher..." className="h-8 w-40 pl-8 text-xs rounded-lg bg-muted/50 border-border" />
                 </div>
                 <Button variant="outline" size="sm" className="rounded-lg h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                 </Button>
              </div>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-muted/10">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">ID / Utilisateur</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Montant</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((tx, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/30">
                      <TableCell>
                        <p className="font-mono text-[10px] font-bold text-snel-gold">{tx.id}</p>
                        <p className="font-bold text-xs">{tx.user}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-opere-emerald">{tx.amount}</p>
                        <p className="text-[10px] uppercase font-black tracking-tighter text-foreground/40">{tx.type}</p>
                      </TableCell>
                      <TableCell className="text-right text-[10px] font-black text-foreground/50">{tx.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
             <div className="p-4 border-t border-border flex justify-center">
                <Button variant="link" className="text-xs font-bold text-snel-gold">Journal complet des logs</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
