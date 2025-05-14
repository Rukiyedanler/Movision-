"use client"

import { useState } from "react"
import { Bell, Tv, Film, Calendar, X, Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-provider"

export function NotificationsPopover() {
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

  const { toast } = useToast()
  const { t } = useLanguage()
  const unreadCount = notifications.filter((n) => !n.read).length

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
    toast({
      title: t("notifications.markAllRead"),
    })
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "new_season":
        return <Tv className="h-4 w-4 text-blue-500" />
      case "release":
        return <Film className="h-4 w-4 text-primary" />
      case "comment":
        return <Calendar className="h-4 w-4 text-yellow-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && <span className="notification-badge" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-medium">{t("notifications.title")}</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{t("notifications.markAllRead")}</span>
            </Button>
          )}
        </div>
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            <div className="py-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 hover:bg-muted/50 ${notification.read ? "opacity-70" : ""}`}
                >
                  <div className="mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">{notification.date}</span>
                    </div>
                    <p className="text-xs mt-1 text-muted-foreground">{notification.message}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <Bell className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium mb-1">{t("notifications.empty")}</h3>
              <p className="text-xs text-muted-foreground">{t("notifications.emptyDesc")}</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
