"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, TrendingUp, Star, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MovieCard } from "@/components/movie-card"
import { MainNav } from "@/components/main-nav"
import { getTrending, formatSearchResult } from "@/lib/tmdb"

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <Image
        src="/placeholder.svg?height=500&width=1920"
        alt="Hero background"
        fill
        className="object-cover brightness-50"
      />
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white max-w-3xl">Keşfedin, İzleyin, Paylaşın</h1>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
          En iyi film ve dizileri keşfedin, izleme listenize ekleyin ve arkadaşlarınızla paylaşın
        </p>
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Film veya dizi ara..."
              className="w-full pl-10 pr-4 h-12 bg-background/80 backdrop-blur border-primary/20 focus-visible:border-primary text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9">
              Ara
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

async function TrendingContent() {
  try {
    const data = await getTrending("all", "week")
    const formattedResults = data.results
      .filter((item: any) => item.media_type === "movie" || item.media_type === "tv")
      .map((item: any) => formatSearchResult(item))
      .filter(Boolean)
      .slice(0, 8)

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {formattedResults.map((item: any) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error fetching trending content:", error)
    return <div>Veri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</div>
  }
}

export default function Home() {
  const [trendingData, setTrendingData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTrending("all", "week")
        const formattedResults = data.results
          .filter((item: any) => item.media_type === "movie" || item.media_type === "tv")
          .map((item: any) => formatSearchResult(item))
          .filter(Boolean)
          .slice(0, 8)

        setTrendingData(formattedResults)
      } catch (error) {
        console.error("Error fetching trending content:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-transparent">
        <MainNav />
      </header>

      <HeroSection />

      <main className="flex-1">
        <section className="py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">Trend İçerikler</h2>
              </div>
              <Button variant="ghost" className="gap-1">
                <span>Tümünü Gör</span>
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-[350px] rounded-lg bg-muted/40 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trendingData.map((item: any) => (
                  <MovieCard key={item.id} movie={item} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">En İyi Filmler</h2>
              </div>
              <Link href="/movies">
                <Button variant="ghost" className="gap-1">
                  <span>Tümünü Gör</span>
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="h-[350px] rounded-lg bg-muted/40 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trendingData
                  .filter((item) => item.type === "movie")
                  .slice(0, 4)
                  .map((item: any) => (
                    <MovieCard key={item.id} movie={item} />
                  ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg text-primary">Movision</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Movision. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  )
}
