
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Heart, Filter, Grid, List, Star } from 'lucide-react';

// Mock product data
const products = [
  {
    id: 1,
    name: 'Elegant Silk Saree',
    price: 2999,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=400&h=600&fit=crop',
    category: 'sarees',
    fabric: 'silk',
    occasion: 'wedding',
    color: 'red',
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
    category: 'suits',
    fabric: 'cotton',
    occasion: 'festive',
    color: 'blue',
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
    category: 'suits',
    fabric: 'georgette',
    occasion: 'party',
    color: 'pink',
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
    category: 'sarees',
    fabric: 'cotton',
    occasion: 'daily',
    color: 'green',
    rating: 4.4,
    reviews: 67,
    new: false
  },
  {
    id: 5,
    name: 'Chiffon Wedding Saree',
    price: 4999,
    originalPrice: 7999,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=400&h=600&fit=crop',
    category: 'sarees',
    fabric: 'chiffon',
    occasion: 'wedding',
    color: 'gold',
    rating: 4.7,
    reviews: 203,
    bestseller: true
  },
  {
    id: 6,
    name: 'Office Wear Suit',
    price: 2199,
    originalPrice: 3499,
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba9b0b6?w=400&h=600&fit=crop',
    category: 'suits',
    fabric: 'cotton',
    occasion: 'office',
    color: 'navy',
    rating: 4.5,
    reviews: 92,
    new: false
  }
];

const Collections = () => {
  const { category } = useParams();
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const fabrics = ['Cotton', 'Silk', 'Chiffon', 'Georgette', 'Crepe'];
  const colors = ['Red', 'Blue', 'Pink', 'Green', 'Gold', 'Navy', 'Black', 'White'];
  const occasions = ['Wedding', 'Festive', 'Party', 'Office', 'Daily'];

  const filteredProducts = products.filter(product => {
    if (category && product.category !== category) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedFabrics.length && !selectedFabrics.includes(product.fabric)) return false;
    if (selectedColors.length && !selectedColors.includes(product.color)) return false;
    if (selectedOccasions.length && !selectedOccasions.includes(product.occasion)) return false;
    return true;
  });

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
              <BreadcrumbPage className="capitalize">
                {category ? category : 'All Collections'}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-brand-charcoal capitalize">
              {category ? category : 'All Collections'}
            </h1>
            <p className="text-brand-charcoal/70 mt-2">
              {filteredProducts.length} products found
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-64 flex-shrink-0`}>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <h3 className="font-semibold text-brand-charcoal mb-4">Filters</h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    min={0}
                    step={100}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-brand-charcoal/70">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                {/* Fabric Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Fabric</h4>
                  <div className="space-y-2">
                    {fabrics.map((fabric) => (
                      <div key={fabric} className="flex items-center space-x-2">
                        <Checkbox
                          id={fabric}
                          checked={selectedFabrics.includes(fabric.toLowerCase())}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFabrics([...selectedFabrics, fabric.toLowerCase()]);
                            } else {
                              setSelectedFabrics(selectedFabrics.filter(f => f !== fabric.toLowerCase()));
                            }
                          }}
                        />
                        <label htmlFor={fabric} className="text-sm">{fabric}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Color</h4>
                  <div className="space-y-2">
                    {colors.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={color}
                          checked={selectedColors.includes(color.toLowerCase())}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedColors([...selectedColors, color.toLowerCase()]);
                            } else {
                              setSelectedColors(selectedColors.filter(c => c !== color.toLowerCase()));
                            }
                          }}
                        />
                        <label htmlFor={color} className="text-sm">{color}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Occasion Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Occasion</h4>
                  <div className="space-y-2">
                    {occasions.map((occasion) => (
                      <div key={occasion} className="flex items-center space-x-2">
                        <Checkbox
                          id={occasion}
                          checked={selectedOccasions.includes(occasion.toLowerCase())}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedOccasions([...selectedOccasions, occasion.toLowerCase()]);
                            } else {
                              setSelectedOccasions(selectedOccasions.filter(o => o !== occasion.toLowerCase()));
                            }
                          }}
                        />
                        <label htmlFor={occasion} className="text-sm">{occasion}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    setPriceRange([0, 10000]);
                    setSelectedFabrics([]);
                    setSelectedColors([]);
                    setSelectedOccasions([]);
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
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
                    </div>
                    
                    {/* Wishlist Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <CardContent className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium text-brand-charcoal group-hover:text-brand-terracotta transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating) 
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
                    
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-semibold text-brand-terracotta">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-brand-charcoal/60 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    
                    <Button className="w-full mt-3" size="sm">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Collections;
