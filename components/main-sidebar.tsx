"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Film, Home, Clapperboard, Tv, Heart, Clock, Eye, User, Settings, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function MainSidebar() {
  const pathname = usePathname()
  const { toast } = useToast()

  const handleLogout = () => {
    toast({
      title: "Çıkış yapıldı",
      description: "Başarıyla çıkış yaptınız.",
    })
  }

  // Check if user is logged in (in a real app)
  const isLoggedIn = true // This would be determined by auth state
  const username = "kullanici123"
  const avatarUrl = "/placeholder.svg?height=40&width=40"

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Film className="h-6 w-6 text-primary" />
            <span className="text-primary">Movision</span>
          </Link>
          <div className="ml-auto">
            <SidebarTrigger />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Keşfet</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Ana Sayfa">
                  <Link href="/">
                    <Home className="mr-2" />
                    <span>Ana Sayfa</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/movies"} tooltip="Filmler">
                  <Link href="/movies">
                    <Clapperboard className="mr-2" />
                    <span>Filmler</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/tv-shows"} tooltip="Diziler">
                  <Link href="/tv-shows">
                    <Tv className="mr-2" />
                    <span>Diziler</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {isLoggedIn ? (
          <SidebarGroup>
            <SidebarGroupLabel>Kütüphanem</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/watchlist"} tooltip="İzleme Listem">
                    <Link href="/watchlist">
                      <Clock className="mr-2" />
                      <span>İzleme Listem</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/favorites"} tooltip="Beğendiklerim">
                    <Link href="/favorites">
                      <Heart className="mr-2" />
                      <span>Beğendiklerim</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/watched"} tooltip="İzlediklerim">
                    <Link href="/watched">
                      <Eye className="mr-2" />
                      <span>İzlediklerim</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="px-4 py-3 text-center">
                <p className="text-sm text-muted-foreground mb-3">Kişisel listeleri görmek için giriş yapın</p>
                <Link href="/login">
                  <Button className="w-full" size="sm">
                    Giriş Yap
                  </Button>
                </Link>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {isLoggedIn ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/profile"} tooltip="Profil">
                <Link href="/profile">
                  <User className="mr-2" />
                  <span>Profil</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/settings"} tooltip="Ayarlar">
                <Link href="/settings">
                  <Settings className="mr-2" />
                  <span>Ayarlar</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleLogout} tooltip="Çıkış Yap">
                <LogOut className="mr-2" />
                <span>Çıkış Yap</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <div className="p-2">
            <Link href="/register">
              <Button variant="outline" className="w-full" size="sm">
                Kayıt Ol
              </Button>
            </Link>
          </div>
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
