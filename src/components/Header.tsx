
import { ShoppingBag, Search, User, Menu, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [cartCount] = useState(2); // Mock cart count
  const [wishlistCount] = useState(4); // Mock wishlist count

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
            
            <Link to="/">
              <h1 className="text-2xl md:text-3xl font-serif font-semibold text-brand-terracotta">
                Vasanti Textiles
              </h1>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/collections" 
              className={`text-brand-charcoal hover:text-brand-terracotta transition-colors font-medium ${
                location.pathname === '/collections' ? 'text-brand-terracotta' : ''
              }`}
            >
              Collections
            </Link>
            <Link 
              to="/collections/sarees" 
              className={`text-brand-charcoal hover:text-brand-terracotta transition-colors font-medium ${
                location.pathname === '/collections/sarees' ? 'text-brand-terracotta' : ''
              }`}
            >
              Sarees
            </Link>
            <Link 
              to="/collections/suits" 
              className={`text-brand-charcoal hover:text-brand-terracotta transition-colors font-medium ${
                location.pathname === '/collections/suits' ? 'text-brand-terracotta' : ''
              }`}
            >
              Suits
            </Link>
            <Link 
              to="/collections/bridal" 
              className={`text-brand-charcoal hover:text-brand-terracotta transition-colors font-medium ${
                location.pathname === '/collections/bridal' ? 'text-brand-terracotta' : ''
              }`}
            >
              Bridal
            </Link>
            <Link 
              to="/orders" 
              className={`text-brand-charcoal hover:text-brand-terracotta transition-colors font-medium ${
                location.pathname === '/orders' ? 'text-brand-terracotta' : ''
              }`}
            >
              Orders
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/login">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-brand-terracotta text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-brand-terracotta text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
