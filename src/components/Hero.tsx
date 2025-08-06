
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Shield, Truck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-warm-white via-brand-cream to-brand-blush min-h-[85vh] flex items-center">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-up">
          <div className="space-y-4">
            <p className="text-brand-terracotta font-medium tracking-wide uppercase text-sm">
              Direct from Manufacturer
            </p>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-charcoal leading-tight">
              Premium Sarees & Suits
              <span className="block text-gradient">Crafted with Love</span>
            </h1>
            <p className="text-lg text-brand-charcoal/70 max-w-lg leading-relaxed">
              Experience authentic Indian textiles with modern elegance. From our looms to your wardrobe, 
              enjoy premium quality at manufacturer prices.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-brand-terracotta hover:bg-brand-terracotta-dark text-white px-8 py-6 text-lg font-medium group">
              Explore Collections
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-brand-terracotta text-brand-terracotta hover:bg-brand-terracotta hover:text-white px-8 py-6 text-lg font-medium">
              Our Story
            </Button>
          </div>

          <div className="flex items-center space-x-8 pt-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-brand-terracotta" />
              <span className="text-sm font-medium text-brand-charcoal/80">Quality Assured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-brand-terracotta" />
              <span className="text-sm font-medium text-brand-charcoal/80">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-brand-terracotta" />
              <span className="text-sm font-medium text-brand-charcoal/80">4.8/5 Rating</span>
            </div>
          </div>
        </div>

        <div className="relative animate-scale-in">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-terracotta/10 to-brand-burgundy/10 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop&crop=center"
                alt="Beautiful handcrafted saree"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white text-lg font-medium">Handcrafted Silk Saree</p>
                <p className="text-white/90 text-sm">From ₹2,999</p>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-pulse">
            <div className="w-3 h-3 bg-brand-terracotta rounded-full"></div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-brand-blush rounded-full p-3 shadow-lg">
            <div className="w-4 h-4 bg-brand-burgundy rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
