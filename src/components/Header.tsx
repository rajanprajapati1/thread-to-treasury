
import { ShoppingBag, Search, User, Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-brand-warm-white border-b border-brand-sage/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm text-brand-charcoal/70 border-b border-brand-sage/10">
          <div className="hidden md:flex items-center space-x-6">
            <span>Free shipping on orders above ₹999</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>WhatsApp: +91 98765 43210</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>Made in India 🇮🇳</span>
          </div>
        </div>
        
        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-serif font-semibold text-brand-terracotta">
              Vasanti Textiles
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-brand-charcoal hover:text-brand-terracotta transition-colors font-medium">Collections</a>
            <a href="#" className="text-brand-charcoal hover:text-brand-terracotta transition-colors font-medium">Sarees</a>
            <a href="#" className="text-brand-charcoal hover:text-brand-terracotta transition-colors font-medium">Suits</a>
            <a href="#" className="text-brand-charcoal hover:text-brand-terracotta transition-colors font-medium">Bridal</a>
            <a href="#" className="text-brand-charcoal hover:text-brand-terracotta transition-colors font-medium">About</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-brand-terracotta text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
