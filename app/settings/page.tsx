"use client"
import { useTheme } from "next-themes"
import { Sun, Moon, Languages } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const toggleLanguage = () => {
    setLanguage(language === "tr" ? "en" : "tr")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <MainNav />
      </header>

      <main className="flex-1 container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">{t("profile.settings")}</h1>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.theme")}</CardTitle>
                <CardDescription>
                  {theme === "light" ? t("settings.theme.light") : t("settings.theme.dark")} {t("settings.theme")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    <Label htmlFor="theme-mode">
                      {theme === "light" ? t("settings.theme.light") : t("settings.theme.dark")}
                    </Label>
                  </div>
                  <Switch id="theme-mode" checked={theme === "dark"} onCheckedChange={toggleTheme} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("settings.language")}</CardTitle>
                <CardDescription>{language === "tr" ? "Türkçe" : "English"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Languages className="h-5 w-5" />
                    <Label htmlFor="language-toggle">{language === "tr" ? "TR" : "EN"}</Label>
                  </div>
                  <Switch id="language-toggle" checked={language === "en"} onCheckedChange={toggleLanguage} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
