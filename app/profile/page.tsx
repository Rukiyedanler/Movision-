"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Camera, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainNav } from "@/components/main-nav"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [avatar, setAvatar] = useState("/placeholder.svg?height=200&width=200")
  const [username, setUsername] = useState("filmizleyici42")
  const [email, setEmail] = useState("ornek@mail.com")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [securityQuestion, setSecurityQuestion] = useState("pet")
  const [securityAnswer, setSecurityAnswer] = useState("")
  const { toast } = useToast()

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real implementation, this would upload the file to storage
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real implementation, this would update the profile in the database
    setTimeout(() => {
      toast({
        title: "Profil güncellendi",
        description: "Profil bilgileriniz başarıyla güncellendi.",
      })
      setIsLoading(false)
    }, 1000)
  }

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Şifreler eşleşmiyor",
        description: "Lütfen şifrelerin aynı olduğundan emin olun.",
      })
      return
    }

    setIsLoading(true)

    // In a real implementation, this would update the password in the database
    setTimeout(() => {
      toast({
        title: "Şifre güncellendi",
        description: "Şifreniz başarıyla güncellendi.",
      })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setIsLoading(false)
    }, 1000)
  }

  const handleSecurityUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real implementation, this would update the security question in the database
    setTimeout(() => {
      toast({
        title: "Güvenlik sorusu güncellendi",
        description: "Güvenlik sorunuz başarıyla güncellendi.",
      })
      setSecurityAnswer("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>

      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-8">Profil Ayarları</h1>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image src={avatar || "/placeholder.svg"} alt="Avatar" fill className="object-cover" />
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 rounded-full bg-primary p-2 cursor-pointer"
                >
                  <Camera className="h-5 w-5 text-primary-foreground" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">{username}</h2>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>
          </div>

          <div>
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="password">Şifre</TabsTrigger>
                <TabsTrigger value="security">Güvenlik</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <form onSubmit={handleProfileUpdate}>
                    <CardHeader>
                      <CardTitle>Profil Bilgileri</CardTitle>
                      <CardDescription>Profil bilgilerinizi güncelleyin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Kullanıcı Adı</Label>
                        <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          "Güncelleniyor..."
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Kaydet
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card>
                  <form onSubmit={handlePasswordUpdate}>
                    <CardHeader>
                      <CardTitle>Şifre Değiştir</CardTitle>
                      <CardDescription>Hesabınızın şifresini güncelleyin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Mevcut Şifre</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Yeni Şifre</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Yeni Şifre Tekrar</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <form onSubmit={handleSecurityUpdate}>
                    <CardHeader>
                      <CardTitle>Güvenlik Sorusu</CardTitle>
                      <CardDescription>Hesap kurtarma için güvenlik sorunuzu güncelleyin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="security-question">Güvenlik Sorusu</Label>
                        <Select value={securityQuestion} onValueChange={setSecurityQuestion}>
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
                        <Label htmlFor="security-answer">Cevap</Label>
                        <Input
                          id="security-answer"
                          value={securityAnswer}
                          onChange={(e) => setSecurityAnswer(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Güncelleniyor..." : "Güvenlik Sorusunu Güncelle"}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
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
