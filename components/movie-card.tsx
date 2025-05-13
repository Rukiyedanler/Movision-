import Link from "next/link"
import Image from "next/image"
import { Heart, MessageSquare, Eye, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Movie {
  id: number
  title: string
  posterUrl: string
  releaseYear: number | string
  type: "movie" | "tv"
  rating: number | string
}

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/${movie.type}/${movie.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={movie.posterUrl || "/placeholder.svg?height=450&width=300"}
            alt={movie.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <Badge className="absolute top-2 right-2">{movie.type === "movie" ? "Film" : "Dizi"}</Badge>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/${movie.type}/${movie.id}`}>
          <h3 className="font-semibold text-lg line-clamp-1 hover:underline">{movie.title}</h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-muted-foreground">{movie.releaseYear}</span>
          <span className="text-sm font-medium">{movie.rating}/10</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="ghost" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Clock className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
