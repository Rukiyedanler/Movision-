"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Film, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NotificationsPopover } from "@/components/notifications-popover"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function MainNav() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  // Check if user is logged in (in a real app)
  const isLoggedIn = true // This would be determined by auth state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div
      className={`flex items-center w-full transition-all duration-300 ${isScrolled ? "h-16 search-fixed" : "h-20"}`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 md:hidden">
          <SidebarTrigger className="h-9 w-9" />
          <Link href="/" className="flex items-center gap-2">
            <Film className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-primary">Movision</span>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Film veya dizi ara..."
              className="w-full pl-10 pr-4 h-10 bg-background/80 backdrop-blur border-primary/20 focus-visible:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <NotificationsPopover />

          {isLoggedIn ? (
            <Link href="/profile">
              <Avatar className="h-9 w-9 border-2 border-primary/20 hover:border-primary transition-colors">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Profil" />
                <AvatarFallback className="bg-primary/20 text-primary">K</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Giriş
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Kayıt</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
