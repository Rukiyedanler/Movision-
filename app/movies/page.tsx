import { Suspense } from "react"
import { MainNav } from "@/components/main-nav"
import { MovieCard } from "@/components/movie-card"
import { getTrending, formatSearchResult } from "@/lib/tmdb"
import Link from "next/link"
import { Button } from "@/components/ui/button"

async function TrendingMovies() {
  try {
    const data = await getTrending("movie", "week")
    const formattedResults = data.results
      .map((item: any) => formatSearchResult({ ...item, media_type: "movie" }))
      .filter(Boolean)

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {formattedResults.map((item: any) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error fetching trending movies:", error)
    return <div>Veri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</div>
  }
}

export default function MoviesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Giriş Yap</Button>
            </Link>
            <Link href="/register">
              <Button>Kayıt Ol</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12">
          <div className="container">
            <h1 className="text-4xl font-bold tracking-tight mb-8">Popüler Filmler</h1>
            <Suspense fallback={<div>Yükleniyor...</div>}>
              <TrendingMovies />
            </Suspense>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} FilmFinder. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  )
}
