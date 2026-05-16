"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Zap,
  History,
  CreditCard,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Historique", href: "/dashboard/history", icon: History },
    { name: "Paiements", href: "/dashboard/payments", icon: CreditCard },
    { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <Link className="flex items-center gap-2" href="/dashboard">
          <div className="p-2 bg-snel-gold/20 rounded-xl">
            <Zap className="h-5 w-5 text-snel-gold fill-snel-gold" />
          </div>
          <span className="text-lg font-black tracking-tighter text-snel-gold">SNEL-PAY</span>
        </Link>
        <Button aria-label="Toggle menu" variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {/* Sidebar - Desktop & Mobile Overlay */}
      <aside className={cn(
        "fixed inset-0 z-50 md:relative md:z-0 w-full md:w-64 border-r border-border bg-muted/30 p-6 flex flex-col gap-8 transition-transform duration-300 md:translate-x-0 bg-background md:bg-transparent",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex items-center justify-between md:justify-start">
            <Link className="flex items-center gap-2 group" href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="p-2 bg-snel-gold/20 rounded-xl">
                <Zap className="h-6 w-6 text-snel-gold fill-snel-gold" />
            </div>
            <span className="text-xl font-black tracking-tighter text-snel-gold">SNEL-PAY</span>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                <X />
            </Button>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 rounded-xl font-bold transition-all",
                    isActive
                      ? "bg-snel-gold/10 text-snel-gold"
                      : "text-foreground/60 hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" /> {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-destructive hover:bg-destructive/10">
            <LogOut className="h-5 w-5" /> Déconnexion
            </Button>
        </Link>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}
