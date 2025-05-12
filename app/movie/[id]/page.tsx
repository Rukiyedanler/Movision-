"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Heart, Eye, Clock, Play, ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const [showTrailer, setShowTrailer] = useState(false)
  const [comment, setComment] = useState("")
  const router = useRouter()

  // In a real implementation, this data would come from an API
  const movie = {
    id: Number.parseInt(params.id),
    title: "Dune: Part Two",
    posterUrl: "/placeholder.svg?height=600&width=400",
    backdropUrl: "/placeholder.svg?height=400&width=1200",
    releaseYear: 2024,
    director: "Denis Villeneuve",
    studio: "Warner Bros. Pictures",
    duration: "166 dakika",
    rating: 8.7,
    description:
      "Paul Atreides, Chani ve Fremen'lerle birlikte, Harkonnen'lere karşı intikam almak için yola çıkar. İmparatorluk ve galaksinin kaderi tehlikedeyken, Paul sevdiği kişiyle geleceği arasında seçim yapmak zorunda kalır.",
    trailerUrl: "https://www.youtube.com/embed/Way9Dexny3w",
    cast: [
      { name: "Timothée Chalamet", character: "Paul Atreides", imageUrl: "/placeholder.svg?height=100&width=100" },
      { name: "Zendaya", character: "Chani", imageUrl: "/placeholder.svg?height=100&width=100" },
      { name: "Rebecca Ferguson", character: "Lady Jessica", imageUrl: "/placeholder.svg?height=100&width=100" },
      { name: "Javier Bardem", character: "Stilgar", imageUrl: "/placeholder.svg?height=100&width=100" },
    ],
    comments: [
      {
        id: 1,
        user: "ahmet123",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Harika bir film, görsel efektler muhteşem!",
        date: "2 gün önce",
      },
      {
        id: 2,
        user: "ayse_film",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "İlk filmden daha iyi olmuş. Kesinlikle izlenmeli.",
        date: "1 hafta önce",
      },
    ],
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would send the comment to an API
    setComment("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Backdrop */}
        <div className="relative h-[50vh] w-full">
          <Image
            src={movie.backdropUrl || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.back()}>
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
                  <Badge>{movie.releaseYear}</Badge>
                  <Badge>{movie.duration}</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{movie.rating}/10</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => setShowTrailer(true)} className="gap-2">
                    <Play className="h-4 w-4" />
                    Fragmanı İzle
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Eye className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Clock className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Modal */}
        {showTrailer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="relative w-full max-w-4xl aspect-video">
              <iframe
                src={movie.trailerUrl}
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
                {movie.cast.map((actor, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full mb-3">
                      <Image
                        src={actor.imageUrl || "/placeholder.svg"}
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
              <div className="space-y-6">
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <Textarea
                    placeholder="Yorumunuzu yazın..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button type="submit">Yorum Yap</Button>
                </form>

                <div className="space-y-6">
                  {movie.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                        <AvatarFallback>{comment.user.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{comment.user}</h4>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="mt-1">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
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
