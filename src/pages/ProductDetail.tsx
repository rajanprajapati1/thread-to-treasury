
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Heart, Share2, Star, ShoppingBag, Truck, Shield, RotateCcw, Award } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: 1,
    name: 'Elegant Silk Saree with Gold Border',
    price: 2999,
    originalPrice: 4999,
    images: [
      'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba9b0b6?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=600&h=800&fit=crop'
    ],
    category: 'Sarees',
    fabric: 'Pure Silk',
    occasion: 'Wedding',
    color: 'Deep Red with Gold',
    rating: 4.8,
    reviews: 124,
    bestseller: true,
    description: 'This exquisite silk saree features intricate gold border work and premium quality fabric. Perfect for weddings and special occasions, it combines traditional elegance with modern sophistication.',
    features: [
      'Pure silk fabric with gold zari work',
      'Intricate border design',
      '6.3 meters saree with 0.8 meter blouse piece',
      'Dry clean only',
      'Made in India'
    ],
    specifications: {
      'Fabric': 'Pure Silk',
      'Work': 'Zari Border',
      'Length': '6.3 meters',
      'Blouse': '0.8 meter unstitched',
      'Care': 'Dry clean only',
      'Color': 'Deep Red with Gold'
    }
  };

  const relatedProducts = [
    {
      id: 2,
      name: 'Designer Cotton Suit',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba9b0b6?w=300&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Georgette Party Wear',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&h=400&fit=crop'
    },
    {
      id: 4,
      name: 'Traditional Cotton Saree',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=300&h=400&fit=crop'
    },
    {
      id: 5,
      name: 'Chiffon Wedding Saree',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=300&h=400&fit=crop'
    }
  ];

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
              <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index 
                      ? 'border-brand-terracotta' 
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.bestseller && (
                <Badge className="bg-brand-terracotta text-white mb-3">
                  Bestseller
                </Badge>
              )}
              <h1 className="text-3xl font-serif font-bold text-brand-charcoal">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-brand-charcoal/70">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-brand-terracotta">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-xl text-brand-charcoal/60 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </Badge>
            </div>

            <p className="text-brand-charcoal/80 leading-relaxed">
              {product.description}
            </p>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-brand-sage/20">
              <div>
                <span className="text-sm text-brand-charcoal/60">Fabric</span>
                <p className="font-medium">{product.fabric}</p>
              </div>
              <div>
                <span className="text-sm text-brand-charcoal/60">Occasion</span>
                <p className="font-medium">{product.occasion}</p>
              </div>
              <div>
                <span className="text-sm text-brand-charcoal/60">Color</span>
                <p className="font-medium">{product.color}</p>
              </div>
              <div>
                <span className="text-sm text-brand-charcoal/60">Category</span>
                <p className="font-medium">{product.category}</p>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-brand-sage/30 rounded-md">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="px-4 py-2">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-brand-sage/20">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-brand-terracotta" />
                <span>Free shipping above ₹999</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-brand-terracotta" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-4 w-4 text-brand-terracotta" />
                <span>Easy 7-day returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-brand-terracotta" />
                <span>Quality guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Product Description</h3>
                  <p className="text-brand-charcoal/80 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <h4 className="font-medium mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-brand-terracotta">•</span>
                        <span className="text-brand-charcoal/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Product Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-brand-sage/10">
                        <span className="font-medium text-brand-charcoal/70">{key}:</span>
                        <span className="text-brand-charcoal">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="care" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Care Instructions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-brand-terracotta mb-2">Washing:</h4>
                      <p className="text-brand-charcoal/80">Dry clean only. Do not wash in washing machine.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-brand-terracotta mb-2">Storage:</h4>
                      <p className="text-brand-charcoal/80">Store in a cool, dry place. Use cotton covers to prevent moisture.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-brand-terracotta mb-2">Ironing:</h4>
                      <p className="text-brand-charcoal/80">Iron on medium heat. Use a cotton cloth over the saree while ironing.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    <div className="border-b border-brand-sage/10 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-medium">Priya M.</span>
                      </div>
                      <p className="text-brand-charcoal/80">"Beautiful saree with excellent quality fabric. The gold work is stunning!"</p>
                    </div>
                    <div className="border-b border-brand-sage/10 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="font-medium">Rajesh K.</span>
                      </div>
                      <p className="text-brand-charcoal/80">"Good quality and fast delivery. My wife loved it!"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-bold text-brand-charcoal mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-brand-charcoal group-hover:text-brand-terracotta transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg font-semibold text-brand-terracotta mt-1">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
