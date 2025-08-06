
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Cotton Sarees",
    description: "Comfortable everyday elegance",
    image: "https://manyavar.scene7.com/is/image/manyavar/SB17561_413-PURPLE_301.6228_25-12-2024-17-12:283x395?&dpr=on,2",
    price: "Starting ₹1,299",
    tag: "Bestseller"
  },
  {
    title: "Designer Suits",
    description: "Modern cuts, traditional charm",
    image: "https://manyavar.scene7.com/is/image/manyavar/NMSAS6454_426-T.BLUE_101.16787_27-05-2024-15-41:650x900?&dpr=on,2",
    price: "Starting ₹2,499",
    tag: "New Collection"
  },
  {
    title: "Bridal Collection",
    description: "Your special day deserves perfection",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=400&fit=crop&crop=center",
    price: "Starting ₹8,999",
    tag: "Premium"
  }
];

const Collections = () => {
  return (
    <section className="py-20 bg-soft-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-charcoal mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-brand-charcoal/70 max-w-2xl mx-auto">
            Discover our curated selection of premium textiles, each piece telling a story of craftsmanship and tradition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="group cursor-pointer animate-fade-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-[1.02]">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-brand-terracotta text-white px-3 py-1 text-sm font-medium rounded-full">
                    {collection.tag}
                  </span>
                </div>
                
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-brand-charcoal mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-brand-charcoal/70 mb-4">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-brand-terracotta">
                      {collection.price}
                    </span>
                    <Button variant="ghost" className="text-brand-terracotta hover:text-brand-terracotta-dark group-hover:translate-x-1 transition-transform">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-brand-terracotta text-brand-terracotta hover:bg-brand-terracotta hover:text-white px-8">
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Collections;
