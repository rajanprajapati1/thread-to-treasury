
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Gift } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-brand-terracotta to-brand-burgundy">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-8">
            <Mail className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Stay Updated with Latest Collections
          </h2>
          
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Be the first to know about new arrivals, exclusive offers, and traditional textile insights. 
            Join our community of textile enthusiasts.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
              />
              <Button 
                className="bg-white text-brand-terracotta hover:bg-white/90 px-8 font-semibold whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center mt-6 text-white/80">
            <Gift className="h-4 w-4 mr-2" />
            <span className="text-sm">Get 10% off on your first order when you subscribe!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
