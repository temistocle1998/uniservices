"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MarketingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">U</span>
              </div>
              <span className="font-bold text-xl hidden sm:block">UniServices</span>
              <span className="font-bold text-lg sm:hidden">Uni</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Témoignages
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Plus
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  Tarifs
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  Documentation
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  Support
                </Link>
              </div>
            </div>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Se connecter
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Essai gratuit</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="py-4 space-y-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link
                href="#features"
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={closeMenu}
              >
                Fonctionnalités
              </Link>
              <Link
                href="#testimonials"
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={closeMenu}
              >
                Témoignages
              </Link>
              <Link
                href="#faq"
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={closeMenu}
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={closeMenu}
              >
                Tarifs
              </Link>
              <Link
                href="#"
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                onClick={closeMenu}
              >
                Documentation
              </Link>
            </nav>

            {/* Mobile CTA Buttons */}
            <div className="flex flex-col space-y-3 pt-4 border-t">
              <Link href="/login" onClick={closeMenu}>
                <Button variant="outline" className="w-full justify-center">
                  Se connecter
                </Button>
              </Link>
              <Link href="/dashboard" onClick={closeMenu}>
                <Button className="w-full justify-center">Essai gratuit</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
