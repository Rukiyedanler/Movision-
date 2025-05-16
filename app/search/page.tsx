import { Suspense } from "react"
import { MainNav } from "@/components/main-nav"
import { MovieCard } from "@/components/movie-card"
import { searchMulti, formatSearchResult } from "@/lib/tmdb"

interface SearchPageProps {
  searchParams: { q: string; page?: string }
}

async function SearchResults({ query, page = "1" }: { query: string; page?: string }) {
  if (!query) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Arama yapmak için bir terim girin</h2>
        <p className="text-muted-foreground">Film veya dizi adı yazarak arama yapabilirsiniz.</p>
      </div>
    )
  }

  try {
    const data = await searchMulti(query, Number.parseInt(page))
    const formattedResults = data.results
      .filter((item: any) => item.media_type === "movie" || item.media_type === "tv")
      .map((item: any) => formatSearchResult(item))
      .filter(Boolean)

    if (formattedResults.length === 0) {
      return (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Sonuç bulunamadı</h2>
          <p className="text-muted-foreground">"{query}" için sonuç bulunamadı. Farklı bir arama terimi deneyin.</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {formattedResults.map((item: any) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Search error:", error)
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Bir hata oluştu</h2>
        <p className="text-muted-foreground">Arama yapılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
      </div>
    )
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const page = searchParams.page || "1"

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>

      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">{query ? `"${query}" için arama sonuçları` : "Arama"}</h1>

        <Suspense fallback={<div className="text-center py-12">Aranıyor...</div>}>
          <SearchResults query={query} page={page} />
        </Suspense>
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
