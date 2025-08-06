
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Heart, ShoppingCart, Star, Filter, Grid3X3, Grid2X2 } from 'lucide-react';
import { getSampleProducts, addToCart, addToWishlist, removeFromWishlist, isInWishlist, type Product } from '@/services/localStorage';
import { useCart, useWishlist } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

const Collections = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid-3' | 'grid-2'>('grid-3');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { refreshCart } = useCart();
  const { refreshWishlist } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    const allProducts = getSampleProducts();
    setProducts(allProducts);
    
    let filtered = allProducts;
    
    // Filter by category if specified
    if (category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Apply other filters
    filtered = filtered.filter(product => {
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return priceMatch && searchMatch;
    });
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      case 'bestselling':
        filtered.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
    }
    
    setFilteredProducts(filtered);
  }, [category, sortBy, priceRange, searchQuery]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    refreshCart();
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
    refreshWishlist();
  };

  const getCategoryTitle = () => {
    if (category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
    return 'All Collections';
  };

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
            {category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getCategoryTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-charcoal mb-2">
              {getCategoryTitle()}
            </h1>
            <p className="text-brand-charcoal/70">
              {filteredProducts.length} products found
            </p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {/* View Mode Toggle */}
            <div className="flex border border-brand-sage/30 rounded-md">
              <Button
                variant={viewMode === 'grid-3' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid-3')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid-2' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid-2')}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="bestselling">Best Selling</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-4 w-4" />
                  <h3 className="font-semibold">Filters</h3>
                </div>
                
                {/* Search */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">
                    Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={15000}
                    min={0}
                    step={500}
                    className="mb-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className={`grid ${
              viewMode === 'grid-3' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 md:grid-cols-2'
            } gap-6`}>
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.bestseller && (
                        <Badge className="bg-brand-terracotta text-white">
                          Bestseller
                        </Badge>
                      )}
                      {product.new && (
                        <Badge className="bg-brand-sage text-brand-charcoal">
                          New
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="secondary" className="bg-gray-500 text-white">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    
                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute top-3 right-3 bg-white/80 hover:bg-white transition-colors ${
                        isInWishlist(product.id) 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-gray-400 hover:text-red-500'
                      }`}
                      onClick={() => handleWishlistToggle(product)}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium text-brand-charcoal group-hover:text-brand-terracotta transition-colors mb-1">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-brand-charcoal/60 mb-2">{product.category}</p>
                    
                    {product.rating && (
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating!) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-brand-charcoal/60">
                          ({product.reviews})
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-semibold text-brand-terracotta">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-brand-charcoal/60 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-brand-charcoal/60">No products found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 15000]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Collections;
