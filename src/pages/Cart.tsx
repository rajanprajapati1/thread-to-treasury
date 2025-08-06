
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Trash2, Plus, Minus, ShoppingBag, Truck, Shield, Tag } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Elegant Silk Saree',
      price: 2999,
      originalPrice: 4999,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=150&h=200&fit=crop',
      quantity: 1,
      size: 'One Size',
      color: 'Deep Red'
    },
    {
      id: 2,
      name: 'Designer Cotton Suit',
      price: 1899,
      originalPrice: 2999,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba9b0b6?w=150&h=200&fit=crop',
      quantity: 2,
      size: 'M',
      color: 'Blue'
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(10);
    } else if (couponCode.toUpperCase() === 'FIRST20') {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal - discountAmount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-brand-warm-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-brand-sage mb-6" />
          <h1 className="text-3xl font-serif font-bold text-brand-charcoal mb-4">Your Cart is Empty</h1>
          <p className="text-brand-charcoal/70 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild size="lg">
            <Link to="/collections">Continue Shopping</Link>
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
              <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-serif font-bold text-brand-charcoal mb-8">
          Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border border-brand-sage/20 rounded-lg">
                      <div className="w-24 h-32 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-medium text-brand-charcoal">{item.name}</h3>
                          <div className="text-sm text-brand-charcoal/70 mt-1">
                            <span>Size: {item.size}</span> • <span>Color: {item.color}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-brand-terracotta">
                            ₹{item.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-brand-charcoal/60 line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-brand-sage/30 rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold text-brand-charcoal">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-brand-sage/20">
                  <Button variant="outline" asChild>
                    <Link to="/collections">Continue Shopping</Link>
                  </Button>
                  <Button variant="outline" onClick={() => setCartItems([])}>
                    Clear Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon Code */}
                <div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button onClick={applyCoupon} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-green-600 mt-2">
                      Coupon applied! {discount}% discount
                    </p>
                  )}
                </div>
                
                <Separator />
                
                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1">
                      Shipping
                      {shipping === 0 && (
                        <span className="text-xs text-green-600">(Free)</span>
                      )}
                    </span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-brand-terracotta">₹{total.toLocaleString()}</span>
                </div>
                
                {/* Trust Badges */}
                <div className="space-y-2 text-sm text-brand-charcoal/70">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-brand-terracotta" />
                    <span>Free shipping on orders above ₹999</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-brand-terracotta" />
                    <span>Secure checkout guaranteed</span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                
                <p className="text-xs text-center text-brand-charcoal/60">
                  By proceeding, you agree to our Terms & Conditions
                </p>
              </CardContent>
            </Card>
            
            {/* Delivery Info */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Delivery Information</h3>
                <div className="space-y-2 text-sm text-brand-charcoal/70">
                  <p>• Standard delivery: 5-7 business days</p>
                  <p>• Express delivery: 2-3 business days (+₹99)</p>
                  <p>• Same day delivery available in select cities</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
