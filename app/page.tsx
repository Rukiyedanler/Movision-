import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import { MainNav } from "@/components/main-nav"

export default function Home() {
  // Featured movies and shows would come from an API in a real implementation
  const featuredContent = [
    {
      id: 1,
      title: "Dune: Part Two",
      posterUrl: "/placeholder.svg?height=450&width=300",
      releaseYear: 2024,
      type: "movie",
      rating: 8.7,
    },
    {
      id: 2,
      title: "The Batman",
      posterUrl: "/placeholder.svg?height=450&width=300",
      releaseYear: 2022,
      type: "movie",
      rating: 7.8,
    },
    {
      id: 3,
      title: "Stranger Things",
      posterUrl: "/placeholder.svg?height=450&width=300",
      releaseYear: 2016,
      type: "tv",
      rating: 8.7,
    },
    {
      id: 4,
      title: "Breaking Bad",
      posterUrl: "/placeholder.svg?height=450&width=300",
      releaseYear: 2008,
      type: "tv",
      rating: 9.5,
    },
  ]

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
            <h1 className="text-4xl font-bold tracking-tight mb-8">En İyi Film ve Dizileri Keşfedin</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredContent.map((item) => (
                <MovieCard key={item.id} movie={item} />
              ))}
            </div>
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
