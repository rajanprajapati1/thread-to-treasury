
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-brand-terracotta mb-4">
              Vasanti Textiles
            </h3>
            <p className="text-white/80 mb-6 max-w-md leading-relaxed">
              Three generations of textile manufacturing expertise, bringing premium Indian wear 
              directly from our looms to your wardrobe. Experience authentic craftsmanship with modern convenience.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-terracotta transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-terracotta transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-terracotta transition-colors cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/80 hover:text-brand-terracotta transition-colors">Collections</a></li>
              <li><a href="#" className="text-white/80 hover:text-brand-terracotta transition-colors">Sarees</a></li>
              <li><a href="#" className="text-white/80 hover:text-brand-terracotta transition-colors">Suits</a></li>
              <li><a href="#" className="text-white/80 hover:text-brand-terracotta transition-colors">Bridal Wear</a></li>
              <li><a href="#" className="text-white/80 hover:text-brand-terracotta transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-brand-terracotta transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-terracotta mt-0.5 flex-shrink-0" />
                <p className="text-white/80 text-sm">
                  123 Textile District<br />
                  Mumbai, Maharashtra 400001
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-brand-terracotta flex-shrink-0" />
                <p className="text-white/80 text-sm">+91 98765 43210</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand-terracotta flex-shrink-0" />
                <p className="text-white/80 text-sm">hello@vasantitextiles.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
            <p>© 2024 Vasanti Textiles. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-brand-terracotta transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-terracotta transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand-terracotta transition-colors">Return Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
