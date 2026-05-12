"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Users,
  Zap,
  ShieldAlert,
  Search,
  RefreshCcw,
  Map as MapIcon,
  History,
  TrendingUp,
  LayoutDashboard
} from "lucide-react";
import { mockTransactions, mockStats } from "@/lib/sts";
import { Transaction } from "@/lib/types";

export default function AdminPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isReconciling, setIsReconciling] = useState(false);

  const handleReconciliation = () => {
    setIsReconciling(true);
    setTimeout(() => {
      setTransactions(prev =>
        prev.map(tx => ({ ...tx, status: 'Reconciled' }))
      );
      setIsReconciling(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-[#003366] text-white flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-blue-900/50">
          <Zap className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" />
          <span className="text-xl font-bold tracking-tight">SNEL-PAY <span className="text-[10px] bg-blue-500 px-1 rounded">BÊTA</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 bg-blue-900/30 text-white">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-blue-900/20 text-slate-300">
            <History className="w-5 h-5" /> Transactions
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-blue-900/20 text-slate-300">
            <MapIcon className="w-5 h-5" /> Heatmap Réseau
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-blue-900/20 text-slate-300">
            <Users className="w-5 h-5" /> Clients
          </Button>
        </nav>
        <div className="p-4 border-t border-blue-900/50">
          <div className="bg-blue-900/30 p-4 rounded-lg">
            <p className="text-xs text-blue-300 mb-1">Session: Admin SNEL</p>
            <p className="text-sm font-medium">Kinshasa - Gombe</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-bold text-slate-800">Supervision Revenue Assurance</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                placeholder="Chercher un compteur..."
                className="pl-9 pr-4 py-2 border rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#003366]/20"
              />
            </div>
            <Button size="sm" className="bg-[#003366]">Exporter Rapport</Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-blue-600">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Revenu du Jour</p>
                    <h3 className="text-2xl font-bold mt-1 text-[#003366]">{mockStats.dailyRevenue.toLocaleString()} FC</h3>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-emerald-600 mt-2 font-semibold">+12.5% vs hier</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-500">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">kWh Vendus (24h)</p>
                    <h3 className="text-2xl font-bold mt-1">{mockStats.dailyKwh.toLocaleString()} kWh</h3>
                  </div>
                  <div className="p-2 bg-amber-50 rounded-lg">
                    <Zap className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2 font-medium">Moyenne: 158 kWh/h</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Taux de Succès</p>
                    <h3 className="text-2xl font-bold mt-1 text-emerald-600">{mockStats.successRate}%</h3>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
                <p className="text-xs text-emerald-600 mt-2 font-semibold">Optimal</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-rose-500">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Alertes Fraude</p>
                    <h3 className="text-2xl font-bold mt-1 text-rose-600">{mockStats.fraudAlerts}</h3>
                  </div>
                  <div className="p-2 bg-rose-50 rounded-lg">
                    <ShieldAlert className="w-5 h-5 text-rose-600" />
                  </div>
                </div>
                <p className="text-xs text-rose-600 mt-2 font-semibold">2 tentatives bloquées</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Table */}
            <Card className="lg:col-span-2 shadow-sm border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Journal d&apos;Audit en Temps Réel</CardTitle>
                  <CardDescription>Suivi des transactions et réconciliation STS</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-[#003366] border-[#003366] hover:bg-blue-50"
                  onClick={handleReconciliation}
                  disabled={isReconciling}
                >
                  <RefreshCcw className={`w-4 h-4 ${isReconciling ? 'animate-spin' : ''}`} />
                  {isReconciling ? "Traitement..." : "Lancer Réconciliation"}
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Heure</TableHead>
                      <TableHead>ID Compteur</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Opérateur</TableHead>
                      <TableHead className="text-right">Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-medium text-slate-500">
                          {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </TableCell>
                        <TableCell className="font-mono">{tx.meterNumber}</TableCell>
                        <TableCell>{tx.amount.toLocaleString()} FC</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-slate-50">{tx.provider}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="secondary"
                            className={tx.status === 'Reconciled' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}
                          >
                            {tx.status === 'Reconciled' ? 'Vérifié' : 'En attente'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Visual Placeholder for Map */}
            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle>Localisation des Ventes</CardTitle>
                <CardDescription>Kinshasa Heatmap (Simulation)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-[4/5] bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                  <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ea/Kinshasa_map.png')] bg-cover bg-center opacity-40 grayscale" />

                  {/* Mock Heatmap Bubbles */}
                  <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-blue-500/40 rounded-full blur-xl animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-[#003366]/40 rounded-full blur-2xl" />
                  <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-amber-500/40 rounded-full blur-lg" />

                  <div className="absolute inset-0 flex flex-col p-4 justify-between pointer-events-none">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 bg-white/90 p-2 rounded-lg shadow-sm w-fit">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <span className="text-[10px] font-bold">Gombe: Forte Activité</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/90 p-2 rounded-lg shadow-sm w-fit">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span className="text-[10px] font-bold">Limete: Normal</span>
                      </div>
                    </div>

                    <div className="bg-[#003366] text-white p-3 rounded-lg text-xs font-medium">
                      Total Points Actifs: 452 cabines
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Tabs defaultValue="commune" className="w-full">
                    <TabsList className="grid grid-cols-2 w-full">
                      <TabsTrigger value="commune" className="text-xs">Par Commune</TabsTrigger>
                      <TabsTrigger value="cabine" className="text-xs">Par Cabine</TabsTrigger>
                    </TabsList>
                    <TabsContent value="commune" className="pt-2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Gombe</span>
                          <span className="font-bold">45.2%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full">
                          <div className="bg-[#003366] h-1.5 rounded-full w-[45%]" />
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Ngaliema</span>
                          <span className="font-bold">22.8%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full">
                          <div className="bg-[#003366] h-1.5 rounded-full w-[23%]" />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
