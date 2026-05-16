"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HistoryPage() {
  const transactions = [
    { id: "TX-9021", date: "15 Mai 2024", amount: "50,000 FC", energy: "151.5 kWh", token: "1234-5678-9012-3456-7890", status: "Réussi" },
    { id: "TX-8842", date: "02 Mai 2024", amount: "20,000 FC", energy: "60.6 kWh", token: "9876-5432-1098-7654-3210", status: "Réussi" },
    { id: "TX-7731", date: "18 Avril 2024", amount: "100,000 FC", energy: "303.0 kWh", token: "5544-3322-1100-9988-7766", status: "Réussi" },
    { id: "TX-6620", date: "05 Avril 2024", amount: "10,000 FC", energy: "30.3 kWh", token: "1122-3344-5566-7788-9900", status: "Réussi" },
    { id: "TX-5519", date: "20 Mars 2024", amount: "25,000 FC", energy: "75.7 kWh", token: "9988-7766-5544-3322-1100", status: "Échoué" },
  ]

  return (
    <div className="p-6 md:p-10 space-y-10 overflow-y-auto">
      <header className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight">Historique des Transactions</h1>
        <p className="text-foreground/50 font-medium">Consultez l&apos;historique complet de vos achats d&apos;énergie.</p>
      </header>

      <Card className="border-border bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-[10px] font-black uppercase tracking-widest">ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Date</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Montant</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Énergie</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Jeton STS</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id} className="border-border">
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell className="font-medium whitespace-nowrap">{t.date}</TableCell>
                  <TableCell className="font-bold text-snel-gold">{t.amount}</TableCell>
                  <TableCell className="font-bold text-opere-emerald">{t.energy}</TableCell>
                  <TableCell className="font-mono text-xs bg-muted/50 px-2 py-1 rounded select-all">{t.token}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={t.status === "Réussi" ? "default" : "destructive"} className="uppercase text-[10px] font-black tracking-widest">
                      {t.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
