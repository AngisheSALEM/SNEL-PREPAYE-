"use client"

import Link from "next/link"
import { Zap, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"
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
import { useAuth } from "@/lib/auth"
import { useState } from "react"

export default function SignupPage() {
  const { signup, loginWithGoogle, isLoading } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && password) {
      await signup(name, email, password)
    }
  }

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

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="mb-6 w-full max-w-md">
            <Link href="/" className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-snel-gold transition-colors">
                <ArrowLeft className="mr-2 h-3 w-3" /> Accueil
            </Link>
        </div>
        <Card className="w-full max-w-md border-border bg-muted/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-black tracking-tight">Inscription</CardTitle>
            <CardDescription className="font-medium">
              Créez votre compte pour gérer vos recharges SNEL.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Nom complet</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Jean Dupont"
                  className="h-12 rounded-xl bg-background/50 border-border text-foreground"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nom@exemple.com"
                  className="h-12 rounded-xl bg-background/50 border-border text-foreground"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  className="h-12 rounded-xl bg-background/50 border-border text-foreground"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-snel-blue hover:bg-snel-blue/90 text-white font-bold rounded-xl shadow-lg shadow-snel-blue/20 transition-all mt-4"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Créer un compte <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-foreground/40 font-black tracking-widest">Ou continuer avec</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl border-border hover:bg-muted font-bold transition-all"
              onClick={() => loginWithGoogle()}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center font-medium text-foreground/60">
              Déjà un compte ?{" "}
              <Link href="/login" className="text-snel-gold font-bold hover:underline">
                Se connecter
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
