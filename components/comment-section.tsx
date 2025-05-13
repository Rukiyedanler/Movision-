"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

interface CommentSectionProps {
  contentId: string
  contentType: "movie" | "tv"
}

export function CommentSection({ contentId, contentType }: CommentSectionProps) {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "ahmet123",
      avatar: "/placeholder.svg?height=40&width=40",
      text: "Harika bir içerik, kesinlikle tavsiye ederim!",
      date: "2 gün önce",
    },
    {
      id: 2,
      user: "ayse_film",
      avatar: "/placeholder.svg?height=40&width=40",
      text: "Beklediğimden çok daha iyiydi. Oyunculuklar muhteşem.",
      date: "1 hafta önce",
    },
  ])
  const router = useRouter()
  const { toast } = useToast()

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim()) {
      toast({
        variant: "destructive",
        title: "Yorum boş olamaz",
        description: "Lütfen bir yorum yazın.",
      })
      return
    }

    // In a real app, this would call an API to save the comment
    const newComment = {
      id: Date.now(),
      user: "kullanici", // This would be the logged-in user
      avatar: "/placeholder.svg?height=40&width=40",
      text: comment,
      date: "Az önce",
    }

    setComments([newComment, ...comments])
    setComment("")

    toast({
      title: "Yorum eklendi",
      description: "Yorumunuz başarıyla eklendi.",
    })
  }

  const handleLoginRedirect = () => {
    router.push("/login")
  }

  // Check if user is logged in (in a real app)
  const isLoggedIn = false // This would be determined by auth state

  return (
    <div className="space-y-6">
      {isLoggedIn ? (
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <Textarea placeholder="Yorumunuzu yazın..." value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button type="submit">Yorum Yap</Button>
        </form>
      ) : (
        <div className="bg-muted/50 p-4 rounded-lg text-center">
          <p className="mb-4">Yorum yapmak için giriş yapmalısınız.</p>
          <Button onClick={handleLoginRedirect}>Giriş Yap</Button>
        </div>
      )}

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
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
          ))
        ) : (
          <p className="text-center text-muted-foreground">Henüz yorum yapılmamış. İlk yorumu siz yapın!</p>
        )}
      </div>
    </div>
  )
}
