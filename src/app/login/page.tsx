"use client"

import Link from "next/link"
import { Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-snel-gold/30">
      <header className="px-4 lg:px-6 h-20 flex items-center bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border">
        <Link className="flex items-center justify-center gap-2 group" href="/">
          <div className="p-2 bg-snel-gold/20 rounded-xl group-hover:bg-snel-gold/20 transition-colors">
            <Zap className="h-6 w-6 text-snel-gold fill-snel-gold" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-snel-gold">SNEL-PAY</span>
        </Link>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border bg-muted/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-black tracking-tight">Connexion</CardTitle>
            <CardDescription className="font-medium">
              Entrez vos identifiants pour accéder à votre dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-foreground/50">Email</Label>
              <Input id="email" type="email" placeholder="nom@exemple.com" className="h-12 rounded-xl bg-background/50 border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-foreground/50">Mot de passe</Label>
              <Input id="password" type="password" className="h-12 rounded-xl bg-background/50 border-border text-foreground" />
            </div>
            <Link href="/dashboard">
              <Button className="w-full h-12 bg-snel-blue hover:bg-snel-blue/90 text-white font-bold rounded-xl shadow-lg shadow-snel-blue/20 transition-all mt-4">
                Se connecter <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center font-medium text-foreground/60">
              Pas encore de compte &#63;{" "}
              <Link href="/signup" className="text-snel-gold font-bold hover:underline">
                S&apos;inscrire
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
