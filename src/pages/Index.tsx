
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import Collections from "@/components/Collections";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ValueProposition />
      <Collections />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
