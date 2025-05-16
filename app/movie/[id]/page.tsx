"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star, Play, Heart, Eye, Clock, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { getMovieDetails, formatMovieData } from "@/lib/tmdb"
import { CommentSection } from "@/components/comment-section"

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showTrailer, setShowTrailer] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movieData = await getMovieDetails(Number(params.id))
        const formattedMovie = formatMovieData(movieData)
        setMovie(formattedMovie)
      } catch (error) {
        console.error("Error fetching movie details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovieDetails()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 bg-background">
          <MainNav />
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 bg-background">
          <MainNav />
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Film bulunamadı</h1>
            <p className="text-muted-foreground mb-4">İstediğiniz film bulunamadı veya bir hata oluştu.</p>
            <Button onClick={() => router.push("/")}>Ana Sayfaya Dön</Button>
          </div>
        </div>
      </div>
    )
  }

  const trailerUrl = movie.trailerUrl ? `https://www.youtube.com/embed/${movie.trailerUrl}` : null

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-transparent">
        <MainNav />
      </header>

      <main className="flex-1">
        {/* Hero Section with Backdrop */}
        <div className="relative h-[60vh] w-full">
          <Image
            src={movie.backdropUrl || "/placeholder.svg?height=400&width=1200"}
            alt={movie.title}
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <Button variant="ghost" size="sm" className="mb-4 hover:bg-black/20" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri
            </Button>
            <div className="flex items-end gap-6">
              <div className="relative h-48 w-32 overflow-hidden rounded-md shadow-lg">
                <Image src={movie.posterUrl || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{movie.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-primary/80 hover:bg-primary">{movie.releaseYear}</Badge>
                  <Badge className="bg-primary/80 hover:bg-primary">{movie.duration}</Badge>
                  <div className="flex items-center bg-black/40 px-2 py-0.5 rounded-full">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{movie.rating}/10</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  {trailerUrl && (
                    <Button onClick={() => setShowTrailer(true)} className="gap-2 bg-primary hover:bg-primary/90">
                      <Play className="h-4 w-4" />
                      Fragmanı İzle
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-black/20 border-white/20 hover:bg-primary/20 hover:text-primary"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-black/20 border-white/20 hover:bg-primary/20 hover:text-primary"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-black/20 border-white/20 hover:bg-primary/20 hover:text-primary"
                  >
                    <Clock className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Modal */}
        {showTrailer && trailerUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="relative w-full max-w-4xl aspect-video">
              <iframe
                src={trailerUrl}
                className="absolute inset-0 h-full w-full"
                allowFullScreen
                title={`${movie.title} Trailer`}
              ></iframe>
              <Button className="absolute top-4 right-4" variant="outline" onClick={() => setShowTrailer(false)}>
                Kapat
              </Button>
            </div>
          </div>
        )}

        {/* Content Tabs */}
        <div className="container py-8">
          <Tabs defaultValue="about">
            <TabsList className="mb-6">
              <TabsTrigger value="about">Hakkında</TabsTrigger>
              <TabsTrigger value="cast">Oyuncular</TabsTrigger>
              <TabsTrigger value="comments">Yorumlar</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Özet</h2>
                <p>{movie.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Detaylar</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Yönetmen</dt>
                      <dd>{movie.director}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Yapım Şirketi</dt>
                      <dd>{movie.studio}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Çıkış Yılı</dt>
                      <dd>{movie.releaseYear}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Süre</dt>
                      <dd>{movie.duration}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cast">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {movie.cast.map((actor: any, index: number) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full mb-3">
                      <Image
                        src={actor.imageUrl || "/placeholder.svg?height=100&width=100"}
                        alt={actor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-medium">{actor.name}</h3>
                    <p className="text-sm text-muted-foreground">{actor.character}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="comments">
              <CommentSection contentId={params.id} contentType="movie" />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t py-6">
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
