
import { Scissors, Heart, Truck, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Scissors,
    title: "Direct from Manufacturer",
    description: "No middlemen. Premium quality at factory prices, ensuring you get the best value."
  },
  {
    icon: Heart,
    title: "Handcrafted Excellence",
    description: "Each piece is carefully crafted by skilled artisans with decades of textile expertise."
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Free shipping across India on orders above ₹999. Fast, secure, and reliable."
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day hassle-free returns. Your satisfaction is our priority."
  }
];

const ValueProposition = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-charcoal mb-4">
            Why Choose Vasanti Textiles?
          </h2>
          <p className="text-lg text-brand-charcoal/70 max-w-2xl mx-auto">
            Three generations of textile manufacturing expertise, now bringing premium Indian wear directly to you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-brand-warm-white hover:bg-brand-cream transition-colors duration-300 group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-terracotta/10 rounded-full mb-6 group-hover:bg-brand-terracotta/20 transition-colors">
                <feature.icon className="h-8 w-8 text-brand-terracotta" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-brand-charcoal mb-4">
                {feature.title}
              </h3>
              <p className="text-brand-charcoal/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
