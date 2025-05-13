"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [securityQuestion, setSecurityQuestion] = useState("")
  const [securityAnswer, setSecurityAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Şifreler eşleşmiyor",
        description: "Lütfen şifrelerin aynı olduğundan emin olun.",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real implementation, this would call Supabase or another auth provider
      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      // });

      // if (error) throw error;

      // Then store additional user data including security question
      // await supabase.from('profiles').insert({
      //   id: data.user.id,
      //   username,
      //   security_question: securityQuestion,
      //   security_answer: securityAnswer,
      // });

      // Simulate successful registration
      setTimeout(() => {
        toast({
          title: "Kayıt başarılı",
          description: "Hesabınız oluşturuldu. Şimdi giriş yapabilirsiniz.",
        })
        router.push("/login")
      }, 1000)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Kayıt başarısız",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <Film className="h-6 w-6" />
              <span className="font-bold text-xl">FilmFinder</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Kayıt Ol</CardTitle>
          <CardDescription className="text-center">Hesap oluşturarak film ve dizileri keşfedin</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Şifre Tekrar</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="securityQuestion">Güvenlik Sorusu</Label>
              <Select value={securityQuestion} onValueChange={setSecurityQuestion} required>
                <SelectTrigger>
                  <SelectValue placeholder="Güvenlik sorusu seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pet">İlk evcil hayvanınızın adı nedir?</SelectItem>
                  <SelectItem value="school">İlk gittiğiniz okulun adı nedir?</SelectItem>
                  <SelectItem value="city">Doğduğunuz şehir neresidir?</SelectItem>
                  <SelectItem value="mother">Annenizin kızlık soyadı nedir?</SelectItem>
                  <SelectItem value="movie">En sevdiğiniz film nedir?</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="securityAnswer">Güvenlik Sorusu Cevabı</Label>
              <Input
                id="securityAnswer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
            </Button>
            <div className="text-center text-sm">
              Zaten hesabınız var mı?{" "}
              <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                Giriş Yap
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
