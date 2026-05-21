"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for user in localStorage and cookie
    const checkAuth = () => {
      const savedUser = localStorage.getItem("snel-pay-user")
      const sessionCookie = Cookies.get("snel-pay-session")

      if (savedUser && sessionCookie) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, _password?: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "1",
        name: "Jean Dupont",
        email: email,
      }

      localStorage.setItem("snel-pay-user", JSON.stringify(mockUser))
      Cookies.set("snel-pay-session", "mock-token", { expires: 7 })
      setUser(mockUser)
      router.push("/dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, _password?: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "1",
        name: name,
        email: email,
      }

      localStorage.setItem("snel-pay-user", JSON.stringify(mockUser))
      Cookies.set("snel-pay-session", "mock-token", { expires: 7 })
      setUser(mockUser)
      router.push("/dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      // Simulate Google OAuth
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockUser: User = {
        id: "google-1",
        name: "Google User",
        email: "user@gmail.com",
      }

      localStorage.setItem("snel-pay-user", JSON.stringify(mockUser))
      Cookies.set("snel-pay-session", "google-mock-token", { expires: 7 })
      setUser(mockUser)
      router.push("/dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("snel-pay-user")
    Cookies.remove("snel-pay-session")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
