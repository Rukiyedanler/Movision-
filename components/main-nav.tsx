"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Film, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function MainNav() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="flex items-center space-x-4 lg:space-x-6 w-full">
      <Link href="/" className="flex items-center space-x-2">
        <Film className="h-6 w-6" />
        <span className="font-bold text-xl">FilmFinder</span>
      </Link>
      <div className="hidden md:flex items-center space-x-4">
        <Link href="/movies" className="text-sm font-medium transition-colors hover:text-primary">
          Filmler
        </Link>
        <Link href="/tv-shows" className="text-sm font-medium transition-colors hover:text-primary">
          Diziler
        </Link>
        <Link href="/watchlist" className="text-sm font-medium transition-colors hover:text-primary">
          İzleme Listem
        </Link>
      </div>
      <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-sm items-center">
        <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Film veya dizi ara..."
          className="w-full pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <Link href="/notifications" className="ml-auto md:ml-0">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  )
}
