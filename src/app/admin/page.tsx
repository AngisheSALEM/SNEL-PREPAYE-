"use client";

import { useState } from "react";
import {
  Zap,
  TrendingUp,
  Users,
  ShieldAlert,
  RefreshCcw,
  Search,
  BarChart3,
  LayoutDashboard,
  Settings,
  LogOut,
  Bell,
  Menu,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock data for the dashboard
const mockStats = {
  dailyRevenue: 2450000,
  dailyKwh: 7420,
  successRate: 99.8,
  fraudAlerts: 0,
};

const transactions = [
  { id: "1", timestamp: "2024-05-20T10:30:00", meterNumber: "14253647586", amount: 50000, provider: "M-PESA", status: "Reconciled" },
  { id: "2", timestamp: "2024-05-20T10:28:00", meterNumber: "22334455667", amount: 10000, provider: "ORANGE", status: "Pending" },
  { id: "3", timestamp: "2024-05-20T10:25:00", meterNumber: "99887766554", amount: 5000, provider: "AIRTEL", status: "Reconciled" },
  { id: "4", timestamp: "2024-05-20T10:20:00", meterNumber: "11223344556", amount: 100000, provider: "M-PESA", status: "Reconciled" },
  { id: "5", timestamp: "2024-05-20T10:15:00", meterNumber: "55667788990", amount: 20000, provider: "ORANGE", status: "Reconciled" },
];

export default function AdminDashboard() {
  const [isReconciling, setIsReconciling] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const handleReconciliation = () => {
    setIsReconciling(true);
    setTimeout(() => setIsReconciling(false), 3000);
  };

  return (
    <div className="flex min-h-screen selection:bg-opere-cyan/30">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-72 glass border-r border-white/5 flex flex-col z-50 fixed inset-y-0 lg:relative"
          >
            <div className="p-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-snel-gold fill-snel-gold" />
                <span className="text-xl font-black text-snel-gold tracking-tighter">SNEL-ADMIN</span>
              </div>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex-1 px-4 space-y-2 pt-4">
              {[
                { icon: LayoutDashboard, label: "Overview", id: "overview" },
                { icon: BarChart3, label: "Analytics", id: "analytics" },
                { icon: Users, label: "Users", id: "users" },
                { icon: Settings, label: "Settings", id: "settings" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-all relative group",
                    activeTab === item.id
                      ? "text-snel-gold bg-snel-gold/10"
                      : "text-foreground/50 hover:text-foreground/80 hover:bg-white/5"
                  )}
                >
                  {activeTab === item.id && (
                    <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-6 bg-snel-gold rounded-full" />
                  )}
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm uppercase tracking-widest font-black">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="p-4 mt-auto">
              <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl font-bold text-rose-500 hover:bg-rose-500/10 transition-all">
                <LogOut className="w-5 h-5" />
                <span className="text-sm uppercase tracking-widest font-black">Déconnexion</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 glass border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </Button>
            )}
            <h2 className="text-xl font-black uppercase tracking-widest">Tableau de Bord</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/30" />
              <input
                placeholder="Chercher un compteur..."
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-snel-gold/20 focus:border-snel-gold/50 transition-all"
              />
            </div>
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full" />
              <Bell className="w-5 h-5 text-foreground/50 cursor-pointer hover:text-foreground transition-colors" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-snel-blue border border-white/10 flex items-center justify-center font-black text-white text-xs">
              AD
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Revenu du Jour", value: mockStats.dailyRevenue.toLocaleString() + " FC", icon: TrendingUp, color: "text-opere-cyan", sub: "+12.5% vs hier" },
              { label: "kWh Vendus (24h)", value: mockStats.dailyKwh.toLocaleString() + " kWh", icon: Zap, color: "text-snel-gold", sub: "Moyenne: 158/h" },
              { label: "Taux de Succès", value: mockStats.successRate + "%", icon: BarChart3, color: "text-opere-emerald", sub: "Performance Optimale" },
              { label: "Alertes Fraude", value: mockStats.fraudAlerts.toString(), icon: ShieldAlert, color: "text-rose-500", sub: "Système Sécurisé" }
            ].map((stat, i) => (
              <Card key={i} className="border-white/5 bg-white/5 relative overflow-hidden group">
                <div className={cn("absolute top-0 left-0 w-1 h-full bg-current opacity-50", stat.color)} />
                <CardContent className="pt-8">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{stat.label}</p>
                      <h3 className="text-2xl font-black">{stat.value}</h3>
                    </div>
                    <div className={cn("p-3 rounded-xl bg-foreground/5 group-hover:scale-110 transition-transform", stat.color)}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", stat.color.replace('text-', 'bg-'))} />
                    <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">{stat.sub}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Journal d'Audit */}
            <Card className="lg:col-span-2 border-white/5 bg-white/5 shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 px-8 py-8">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-black uppercase tracking-tight">Journal d&apos;Audit</CardTitle>
                  <CardDescription className="text-foreground/40 font-medium">Flux de transactions en temps réel</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 px-4 font-black text-[10px] uppercase tracking-widest bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer"
                  onClick={handleReconciliation}
                  disabled={isReconciling}
                >
                  <RefreshCcw className={cn("w-3 h-3 mr-2", isReconciling && "animate-spin")} />
                  {isReconciling ? "Sync..." : "Réconciliation"}
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/5 hover:bg-transparent">
                      <TableHead className="px-8 font-black text-[10px] uppercase tracking-widest text-foreground/30">Heure</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-foreground/30">ID Compteur</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-foreground/30">Montant</TableHead>
                      <TableHead className="font-black text-[10px] uppercase tracking-widest text-foreground/30">Opérateur</TableHead>
                      <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest text-foreground/30">Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id} className="border-white/5 hover:bg-white/5 transition-colors">
                        <TableCell className="px-8 font-bold text-foreground/60">
                          {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </TableCell>
                        <TableCell className="font-mono font-bold tracking-widest text-opere-cyan">{tx.meterNumber}</TableCell>
                        <TableCell className="font-black">{tx.amount.toLocaleString()} FC</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-white/5 border-white/10 font-bold text-[10px]">{tx.provider}</Badge>
                        </TableCell>
                        <TableCell className="text-right px-8">
                          <div className={cn(
                            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                            tx.status === 'Reconciled' ? 'bg-opere-emerald/10 text-opere-emerald' : 'bg-snel-gold/10 text-snel-gold'
                          )}>
                            <div className={cn("w-1 h-1 rounded-full", tx.status === 'Reconciled' ? 'bg-opere-emerald' : 'bg-snel-gold')} />
                            {tx.status === 'Reconciled' ? 'Vérifié' : 'Attente'}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Heatmap Section */}
            <Card className="border-white/5 bg-white/5 shadow-2xl flex flex-col">
              <CardHeader className="px-8 py-8 border-b border-white/5">
                <CardTitle className="text-xl font-black uppercase tracking-tight">Activité Géo</CardTitle>
                <CardDescription className="text-foreground/40 font-medium">Kinshasa Heatmap (Sim)</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-8 space-y-8">
                <div className="relative aspect-[4/5] bg-white/5 rounded-3xl overflow-hidden border border-white/10 group">
                  <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ea/Kinshasa_map.png')] bg-cover bg-center opacity-20 grayscale group-hover:opacity-30 transition-opacity" />

                  {/* Glowing Points */}
                  <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-opere-cyan/30 rounded-full blur-xl animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-snel-gold/30 rounded-full blur-2xl animate-pulse delay-75" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="space-y-2">
                        <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center gap-3 w-fit">
                            <div className="w-2 h-2 bg-opere-cyan rounded-full shadow-[0_0_8px_#22D3EE]" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Gombe: Intense</span>
                        </div>
                        <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 flex items-center gap-3 w-fit">
                            <div className="w-2 h-2 bg-snel-gold rounded-full shadow-[0_0_8px_#D4AF37]" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Limete: Normal</span>
                        </div>
                    </div>

                    <div className="bg-snel-blue p-4 rounded-xl border border-white/10 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Total Points Actifs</p>
                        <p className="text-2xl font-black text-white">452 Cabines</p>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="commune" className="w-full">
                  <TabsList className="grid grid-cols-2 w-full bg-white/5 border border-white/10 p-1 h-12 rounded-xl">
                    <TabsTrigger value="commune" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-snel-gold data-[state=active]:text-snel-blue">Par Commune</TabsTrigger>
                    <TabsTrigger value="cabine" className="rounded-lg font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-snel-gold data-[state=active]:text-snel-blue">Par Cabine</TabsTrigger>
                  </TabsList>
                  <TabsContent value="commune" className="pt-6 space-y-6">
                    {[
                      { label: "Gombe", value: 45.2, color: "bg-opere-cyan" },
                      { label: "Ngaliema", value: 22.8, color: "bg-snel-gold" }
                    ].map((item, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50">{item.label}</span>
                          <span className="font-black text-sm">{item.value}%</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={cn("h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]", item.color)}
                          />
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
