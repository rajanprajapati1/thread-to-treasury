
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Package, Truck, CheckCircle, Clock, RefreshCw, ShoppingBag, Star } from 'lucide-react';

const Orders = () => {
  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 5898,
      items: [
        {
          id: 1,
          name: 'Elegant Silk Saree',
          image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=100&h=150&fit=crop',
          price: 2999,
          quantity: 1
        },
        {
          id: 2,
          name: 'Designer Cotton Suit',
          image: 'https://images.unsplash.com/photo-1594736797933-d0401ba9b0b6?w=100&h=150&fit=crop',
          price: 1899,
          quantity: 1
        }
      ],
      deliveryDate: '2024-01-20',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-18',
      status: 'shipped',
      total: 3499,
      items: [
        {
          id: 3,
          name: 'Georgette Party Wear',
          image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=100&h=150&fit=crop',
          price: 3499,
          quantity: 1
        }
      ],
      estimatedDelivery: '2024-01-23',
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-20',
      status: 'processing',
      total: 2599,
      items: [
        {
          id: 4,
          name: 'Traditional Cotton Saree',
          image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=100&h=150&fit=crop',
          price: 1299,
          quantity: 2
        }
      ],
      estimatedShipping: '2024-01-22'
    }
  ]);

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
              {orders.map((order) => (
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
                          {order.status === 'delivered' && (
                            <p className="text-green-600">
                              ✓ Delivered on {new Date(order.deliveryDate!).toLocaleDateString('en-IN')}
                            </p>
                          )}
                          {order.status === 'shipped' && (
                            <p className="text-blue-600">
                              📦 Estimated delivery: {new Date(order.estimatedDelivery!).toLocaleDateString('en-IN')}
                            </p>
                          )}
                          {order.status === 'processing' && (
                            <p className="text-yellow-600">
                              ⏳ Estimated shipping: {new Date(order.estimatedShipping!).toLocaleDateString('en-IN')}
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
                          <Button size="sm">
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Reorder
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="processing" className="mt-6">
            <div className="space-y-6">
              {getOrdersByStatus('processing').map((order) => (
                <Card key={order.id}>
                  {/* Same structure as above, filtered for processing orders */}
                </Card>
              ))}
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
              {getOrdersByStatus('shipped').map((order) => (
                <Card key={order.id}>
                  {/* Same structure as above, filtered for shipped orders */}
                </Card>
              ))}
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
              {getOrdersByStatus('delivered').map((order) => (
                <Card key={order.id}>
                  {/* Same structure as above, filtered for delivered orders */}
                </Card>
              ))}
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
