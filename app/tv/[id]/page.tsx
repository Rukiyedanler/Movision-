import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { getTvDetails, formatTvData } from "@/lib/tmdb"
import { MovieActions } from "@/components/movie-actions"
import { CommentSection } from "@/components/comment-section"

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const tvData = await getTvDetails(Number(params.id))
    const tv = formatTvData(tvData)

    return {
      title: `${tv.title} | FilmFinder`,
      description: tv.description,
    }
  } catch (error) {
    return {
      title: "Dizi Detayları | FilmFinder",
      description: "Dizi detaylarını görüntüleyin",
    }
  }
}

export default async function TvDetailPage({ params }: { params: { id: string } }) {
  const tvData = await getTvDetails(Number(params.id))
  const tv = formatTvData(tvData)

  const trailerKey = tv.trailerUrl
  const trailerUrl = trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : null

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
            src={tv.backdropUrl || "/placeholder.svg?height=400&width=1200"}
            alt={tv.title}
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Geri
              </Button>
            </Link>
            <div className="flex items-end gap-6">
              <div className="relative h-48 w-32 overflow-hidden rounded-md shadow-lg">
                <Image src={tv.posterUrl || "/placeholder.svg"} alt={tv.title} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{tv.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge>{tv.releaseYear}</Badge>
                  <Badge>{tv.seasons} Sezon</Badge>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{tv.rating}/10</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  {trailerUrl && (
                    <Link href={`/tv/${params.id}/trailer`}>
                      <Button className="gap-2">Fragmanı İzle</Button>
                    </Link>
                  )}
                  <MovieActions type="tv" id={Number(params.id)} />
                </div>
              </div>
            </div>
          </div>
        </div>

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
                <p>{tv.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Detaylar</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Yaratıcı</dt>
                      <dd>{tv.creator}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Yayıncı</dt>
                      <dd>{tv.studio}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">İlk Yayın Yılı</dt>
                      <dd>{tv.releaseYear}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Sezon Sayısı</dt>
                      <dd>{tv.seasons}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Bölüm Sayısı</dt>
                      <dd>{tv.episodes}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cast">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {tv.cast.map((actor, index) => (
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
              <CommentSection contentId={params.id} contentType="tv" />
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
