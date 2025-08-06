
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    comment: "Absolutely love the quality! The saree I ordered was exactly as shown, and the fabric feels so premium. Will definitely order again.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Anita Desai",
    location: "Delhi",
    rating: 5,
    comment: "Amazing experience from start to finish. The customer service team was so helpful, and the delivery was super fast. Highly recommended!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Meera Patel",
    location: "Ahmedabad",
    rating: 5,
    comment: "I've been buying sarees for 20 years, and this is by far the best quality I've seen at this price point. Authentic and beautiful!",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-charcoal mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-brand-charcoal/70 max-w-2xl mx-auto">
            Over 10,000 happy customers across India trust us for their traditional wear needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-brand-warm-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 animate-fade-up relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote className="h-8 w-8 text-brand-terracotta/20 mb-4" />
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-brand-charcoal/80 leading-relaxed mb-6 italic">
                "{testimonial.comment}"
              </p>

              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-brand-charcoal">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-brand-charcoal/60">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-4 text-brand-charcoal/60">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 font-semibold">4.8/5</span>
            </div>
            <span>•</span>
            <span>Based on 2,847 reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
