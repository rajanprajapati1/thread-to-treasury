
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Package, Truck, CheckCircle, Clock, RefreshCw, ShoppingBag, Star } from 'lucide-react';
import { getOrders, addToCart, type Order } from '@/services/localStorage';
import { useAuth, useCart } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/use-toast';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { isAuthenticated } = useAuth();
  const { refreshCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      setOrders(getOrders());
    }
  }, [isAuthenticated]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrdersByStatus = (status: string) => {
    return orders.filter(order => order.status === status);
  };

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      addToCart(item, item.quantity);
    });
    refreshCart();
    toast({
      title: "Items Added to Cart",
      description: "All items from this order have been added to your cart.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-warm-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-brand-sage mb-6" />
          <h1 className="text-3xl font-serif font-bold text-brand-charcoal mb-4">Please Login</h1>
          <p className="text-brand-charcoal/70 mb-8">You need to login to view your order history.</p>
          <Button asChild size="lg">
            <Link to="/login">Login</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-brand-warm-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-brand-sage mb-6" />
          <h1 className="text-3xl font-serif font-bold text-brand-charcoal mb-4">No Orders Yet</h1>
          <p className="text-brand-charcoal/70 mb-8">You haven't placed any orders yet. Start shopping to see your order history here.</p>
          <Button asChild size="lg">
            <Link to="/collections">Start Shopping</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const renderOrderCard = (order: Order) => (
    <Card key={order.id}>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <p className="text-sm text-brand-charcoal/60">
              Placed on {new Date(order.date).toLocaleDateString('en-IN')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
              {getStatusIcon(order.status)}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
            <div className="text-right">
              <p className="font-semibold">₹{order.total.toLocaleString()}</p>
              <p className="text-sm text-brand-charcoal/60">
                {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Order Items */}
        <div className="grid gap-4 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-3 bg-brand-cream/50 rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-brand-charcoal">{item.name}</h4>
                <p className="text-sm text-brand-charcoal/60">Quantity: {item.quantity}</p>
                <p className="text-sm font-semibold text-brand-terracotta">
                  ₹{item.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Status Info */}
        <div className="border-t border-brand-sage/20 pt-4">
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              {order.status === 'delivered' && order.deliveryDate && (
                <p className="text-green-600">
                  ✓ Delivered on {new Date(order.deliveryDate).toLocaleDateString('en-IN')}
                </p>
              )}
              {order.status === 'shipped' && order.estimatedDelivery && (
                <p className="text-blue-600">
                  📦 Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-IN')}
                </p>
              )}
              {order.status === 'processing' && order.estimatedShipping && (
                <p className="text-yellow-600">
                  ⏳ Estimated shipping: {new Date(order.estimatedShipping).toLocaleDateString('en-IN')}
                </p>
              )}
              {order.trackingNumber && (
                <p className="text-brand-charcoal/60">
                  Tracking: {order.trackingNumber}
                </p>
              )}
            </div>
            <div className="flex gap-2 sm:justify-end">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              {order.status === 'delivered' && (
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-1" />
                  Review
                </Button>
              )}
              <Button size="sm" onClick={() => handleReorder(order)}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Reorder
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
              <BreadcrumbPage>My Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-serif font-bold text-brand-charcoal mb-8">
          My Orders
        </h1>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="processing">Processing ({getOrdersByStatus('processing').length})</TabsTrigger>
            <TabsTrigger value="shipped">Shipped ({getOrdersByStatus('shipped').length})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({getOrdersByStatus('delivered').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-6">
              {orders.map(renderOrderCard)}
            </div>
          </TabsContent>

          <TabsContent value="processing" className="mt-6">
            <div className="space-y-6">
              {getOrdersByStatus('processing').map(renderOrderCard)}
              {getOrdersByStatus('processing').length === 0 && (
                <div className="text-center py-12">
                  <Clock className="h-12 w-12 mx-auto text-brand-sage mb-4" />
                  <p className="text-brand-charcoal/70">No processing orders</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="shipped" className="mt-6">
            <div className="space-y-6">
              {getOrdersByStatus('shipped').map(renderOrderCard)}
              {getOrdersByStatus('shipped').length === 0 && (
                <div className="text-center py-12">
                  <Truck className="h-12 w-12 mx-auto text-brand-sage mb-4" />
                  <p className="text-brand-charcoal/70">No shipped orders</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="delivered" className="mt-6">
            <div className="space-y-6">
              {getOrdersByStatus('delivered').map(renderOrderCard)}
              {getOrdersByStatus('delivered').length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 mx-auto text-brand-sage mb-4" />
                  <p className="text-brand-charcoal/70">No delivered orders</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Orders;
