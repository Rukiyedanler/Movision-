"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-provider"

// Mock data for watched history
const mockWatchedHistory = [
  {
    id: 1,
    title: "Inception",
    type: "movie",
    posterUrl: "/placeholder.svg?height=150&width=100",
    watchedDate: "2023-05-15T14:30:00",
    progress: 100,
  },
  {
    id: 2,
    title: "Breaking Bad",
    type: "tv",
    posterUrl: "/placeholder.svg?height=150&width=100",
    watchedDate: "2023-05-10T20:15:00",
    progress: 100,
    season: 3,
    episode: 5,
  },
  {
    id: 3,
    title: "The Dark Knight",
    type: "movie",
    posterUrl: "/placeholder.svg?height=150&width=100",
    watchedDate: "2023-05-05T19:00:00",
    progress: 100,
  },
  {
    id: 4,
    title: "Stranger Things",
    type: "tv",
    posterUrl: "/placeholder.svg?height=150&width=100",
    watchedDate: "2023-05-01T21:30:00",
    progress: 100,
    season: 2,
    episode: 8,
  },
]

export default function HistoryPage() {
  const [watchedHistory, setWatchedHistory] = useState(mockWatchedHistory)
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()
  const { t } = useLanguage()

  const filteredHistory = watchedHistory.filter((item) => {
    if (activeTab === "all") return true
    if (activeTab === "movies") return item.type === "movie"
    if (activeTab === "tvshows") return item.type === "tv"
    return true
  })

  const clearHistory = () => {
    setWatchedHistory([])
    toast({
      title: "İzleme geçmişi temizlendi",
      description: "Tüm izleme geçmişiniz başarıyla silindi.",
    })
  }

  const removeFromHistory = (id: number) => {
    setWatchedHistory(watchedHistory.filter((item) => item.id !== id))
    toast({
      title: "İçerik kaldırıldı",
      description: "İçerik izleme geçmişinizden kaldırıldı.",
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <MainNav />
      </header>

      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">İzleme Geçmişi</h1>
          </div>

          {watchedHistory.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearHistory}>
              <Trash2 className="h-4 w-4 mr-2" />
              Geçmişi Temizle
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">Tümü</TabsTrigger>
            <TabsTrigger value="movies">Filmler</TabsTrigger>
            <TabsTrigger value="tvshows">Diziler</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className="relative h-24 w-16 flex-shrink-0">
                      <Image
                        src={item.posterUrl || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <Link href={`/${item.type}/${item.id}`} className="font-medium hover:text-primary">
                            {item.title}
                          </Link>
                          <div className="text-sm text-muted-foreground mt-1">
                            {item.type === "tv" && item.season && item.episode && (
                              <span>
                                Sezon {item.season}, Bölüm {item.episode}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">{formatDate(item.watchedDate)}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFromHistory(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Eye className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">İzleme Geçmişi Boş</h2>
            <p className="text-muted-foreground mb-6">İzlediğiniz içerikler burada görünecek.</p>
            <Link href="/">
              <Button>İçerik Keşfet</Button>
            </Link>
          </div>
        )}
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/movision.ico" alt="Movision" width={20} height={20} />
            <span className="font-bold text-lg text-primary">Movision</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Movision. {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  )
}
