
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Elegant Silk Saree',
      price: 2999,
      originalPrice: 4999,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=400&h=600&fit=crop',
      category: 'Sarees',
      inStock: true,
      rating: 4.8,
      reviews: 124,
      bestseller: true
    },
    {
      id: 2,
      name: 'Designer Cotton Suit',
      price: 1899,
      originalPrice: 2999,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba9b0b6?w=400&h=600&fit=crop',
      category: 'Suits',
      inStock: true,
      rating: 4.6,
      reviews: 89,
      new: true
    },
    {
      id: 3,
      name: 'Georgette Party Wear',
      price: 3499,
      originalPrice: 5499,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&h=600&fit=crop',
      category: 'Suits',
      inStock: false,
      rating: 4.9,
      reviews: 156,
      bestseller: true
    },
    {
      id: 4,
      name: 'Traditional Cotton Saree',
      price: 1299,
      originalPrice: 1999,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=400&h=600&fit=crop',
      category: 'Sarees',
      inStock: true,
      rating: 4.4,
      reviews: 67,
      new: false
    }
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-brand-warm-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Heart className="h-24 w-24 mx-auto text-brand-sage mb-6" />
          <h1 className="text-3xl font-serif font-bold text-brand-charcoal mb-4">Your Wishlist is Empty</h1>
          <p className="text-brand-charcoal/70 mb-8">Save your favorite items to your wishlist and shop them later.</p>
          <Button asChild size="lg">
            <Link to="/collections">Explore Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-warm-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>My Wishlist</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brand-charcoal">
            My Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
          </h1>
          
          <Button 
            variant="outline" 
            onClick={() => setWishlistItems([])}
            disabled={wishlistItems.length === 0}
          >
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-300">
              <div className="relative overflow-hidden">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {item.bestseller && (
                    <Badge className="bg-brand-terracotta text-white">
                      Bestseller
                    </Badge>
                  )}
                  {item.new && (
                    <Badge className="bg-brand-sage text-brand-charcoal">
                      New
                    </Badge>
                  )}
                  {!item.inStock && (
                    <Badge variant="secondary" className="bg-gray-500 text-white">
                      Out of Stock
                    </Badge>
                  )}
                </div>
                
                {/* Remove from Wishlist */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-medium text-brand-charcoal group-hover:text-brand-terracotta transition-colors mb-1">
                    {item.name}
                  </h3>
                </Link>
                
                <p className="text-sm text-brand-charcoal/60 mb-2">{item.category}</p>
                
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${
                          i < Math.floor(item.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-brand-charcoal/60">
                    ({item.reviews})
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-semibold text-brand-terracotta">
                    ₹{item.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-brand-charcoal/60 line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    size="sm"
                    disabled={!item.inStock}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-red-500 hover:text-red-600 hover:border-red-300"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                {!item.inStock && (
                  <p className="text-xs text-center text-brand-charcoal/60 mt-2">
                    Notify me when back in stock
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-brand-charcoal mb-8">You Might Also Like</h2>
          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/collections">Explore More Products</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
