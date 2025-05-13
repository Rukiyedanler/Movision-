"use client"

import { useState } from "react"
import { Bell, Film, Tv, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"

export default function NotificationsPage() {
  // In a real implementation, this data would come from an API
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "new_season",
      title: "Stranger Things",
      message: "Stranger Things'in 5. sezonu yayınlandı!",
      date: "2 saat önce",
      read: false,
    },
    {
      id: 2,
      type: "release",
      title: "Dune: Part Two",
      message: "İzlemek istediğiniz Dune: Part Two vizyona girdi!",
      date: "1 gün önce",
      read: false,
    },
    {
      id: 3,
      type: "comment",
      title: "Breaking Bad",
      message: "Yorumunuza yeni bir cevap geldi.",
      date: "3 gün önce",
      read: true,
    },
    {
      id: 4,
      type: "new_season",
      title: "The Mandalorian",
      message: "The Mandalorian'ın 4. sezonu yayınlandı!",
      date: "1 hafta önce",
      read: true,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "new_season":
        return <Tv className="h-5 w-5 text-blue-500" />
      case "release":
        return <Film className="h-5 w-5 text-green-500" />
      case "comment":
        return <Calendar className="h-5 w-5 text-yellow-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Bildirimler</h1>
          <Button variant="outline" onClick={markAllAsRead}>
            Tümünü Okundu İşaretle
          </Button>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card key={notification.id} className={notification.read ? "opacity-70" : ""}>
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{notification.title}</h3>
                      <span className="text-xs text-muted-foreground">{notification.date}</span>
                    </div>
                    <p className="text-sm mt-1">{notification.message}</p>
                  </div>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        Okundu İşaretle
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => deleteNotification(notification.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Bildiriminiz Yok</h3>
                <p className="text-muted-foreground">Yeni bildirimler geldiğinde burada görünecek.</p>
              </CardContent>
            </Card>
          )}
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
