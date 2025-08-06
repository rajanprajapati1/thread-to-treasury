
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-brand-warm-white">
      <Header />
      
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-9xl font-serif font-bold text-brand-terracotta/20 mb-4">
            404
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-brand-charcoal mb-4">
            Page Not Found
          </h1>
          
          <p className="text-brand-charcoal/70 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved. 
            Let's get you back to shopping for beautiful ethnic wear.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link to="/collections">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Collections
              </Link>
            </Button>
          </div>
          
          <div className="mt-12">
            <p className="text-sm text-brand-charcoal/60 mb-4">Popular Categories:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button asChild variant="ghost" size="sm">
                <Link to="/collections/sarees">Cotton Sarees</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/collections/suits">Designer Suits</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/collections/bridal">Bridal Collection</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
