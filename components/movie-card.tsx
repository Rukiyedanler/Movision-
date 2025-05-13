import Link from "next/link"
import Image from "next/image"
import { Heart, MessageSquare, Eye, Clock, Star } from "lucide-react"
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
    <Card className="overflow-hidden border-border/40 movie-card-hover">
      <Link href={`/${movie.type}/${movie.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={movie.posterUrl || "/placeholder.svg?height=450&width=300"}
            alt={movie.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
          <Badge className="absolute top-2 right-2 bg-primary/80 hover:bg-primary">
            {movie.type === "movie" ? "Film" : "Dizi"}
          </Badge>
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 rounded-full px-2 py-0.5">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{movie.rating}</span>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/${movie.type}/${movie.id}`}>
          <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">{movie.title}</h3>
        </Link>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-muted-foreground">{movie.releaseYear}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
          <Heart className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
          <MessageSquare className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
          <Clock className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
