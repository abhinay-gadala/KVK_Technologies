import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", action: () => scrollToSection("home") },
    { name: "Services", action: () => scrollToSection("services") },
    { name: "Reviews", action: () => scrollToSection("reviews") },
    { name: "Contact", action: () => scrollToSection("contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-white/10"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="https://res.cloudinary.com/dkwllsxnd/image/upload/v1778738164/IMG-20260514-WA0000_x718vq.jpg"
                alt="KVK Technologies Logo"
                className="h-10 w-auto rounded-none grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <span className="font-medium text-lg tracking-[0.2em] uppercase hidden sm:block text-white">
                KVK <span className="font-light text-white/50">Tech</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="text-xs font-medium uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              >
                {link.name}
              </button>
            ))}
            <Link href="/book-slot">
              <Button className="bg-white hover:bg-white/90 text-black rounded-none uppercase tracking-widest text-xs font-bold px-8 h-10 transition-all">
                Initiate
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={link.action}
                className="block w-full text-left py-3 text-sm tracking-widest uppercase font-light text-white/70 hover:text-white hover:bg-white/[0.02] border-b border-white/5"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-6 pb-2">
              <Link href="/book-slot" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-white hover:bg-white/90 text-black rounded-none uppercase tracking-widest text-xs font-bold h-12">
                  Initiate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
