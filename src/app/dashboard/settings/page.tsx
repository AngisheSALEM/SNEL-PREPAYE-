"use client"

import { User, Bell, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-10 space-y-10 overflow-y-auto">
      <header className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight">Paramètres</h1>
        <p className="text-foreground/50 font-medium">Gérez votre compte et vos préférences système.</p>
      </header>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-xl mb-8">
          <TabsTrigger value="profile" className="rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">Profil</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">Notifications</TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="border-border bg-muted/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-snel-gold" /> Informations Personnelles</CardTitle>
              <CardDescription>Mettez à jour vos informations de contact.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Nom Complet</Label>
                  <Input defaultValue="Jean Dupont" className="rounded-xl border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Email</Label>
                  <Input defaultValue="jean.dupont@email.com" type="email" className="rounded-xl border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Téléphone</Label>
                  <Input defaultValue="+243 812 345 678" className="rounded-xl border-border bg-background" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Numéro de Compteur</Label>
                  <Input defaultValue="1425 3647 5869" className="rounded-xl border-border bg-background" />
                </div>
              </div>
              <Button className="bg-snel-blue hover:bg-snel-blue/90 text-white font-bold rounded-xl px-8 mt-4">Enregistrer les modifications</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
            <Card className="border-border bg-muted/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-snel-gold" /> Préférences de Notifications</CardTitle>
                    <CardDescription>Choisissez comment vous souhaitez être informé.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {[
                        { title: "Alerte de solde faible", desc: "Recevoir une notification quand le crédit est inférieur à 5 kWh." },
                        { title: "Confirmation d'achat", desc: "Recevoir un reçu par email après chaque transaction." },
                        { title: "Promotions & Offres", desc: "Être informé des tarifs préférentiels et bonus SNEL." }
                    ].map((pref, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border">
                            <div className="space-y-1">
                                <p className="font-bold">{pref.title}</p>
                                <p className="text-xs text-foreground/50">{pref.desc}</p>
                            </div>
                            <div className="h-6 w-12 bg-snel-gold rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="security">
            <Card className="border-border bg-muted/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-snel-gold" /> Sécurité du Compte</CardTitle>
                    <CardDescription>Protégez l&apos;accès à votre espace personnel.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Mot de passe actuel</Label>
                        <Input type="password" placeholder="••••••••" className="rounded-xl border-border bg-background" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Nouveau mot de passe</Label>
                            <Input type="password" placeholder="••••••••" className="rounded-xl border-border bg-background" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/50">Confirmer le nouveau mot de passe</Label>
                            <Input type="password" placeholder="••••••••" className="rounded-xl border-border bg-background" />
                        </div>
                    </div>
                    <Button className="bg-destructive hover:bg-destructive/90 text-white font-bold rounded-xl px-8 mt-4">Mettre à jour le mot de passe</Button>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
