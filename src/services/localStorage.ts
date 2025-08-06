
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  description?: string;
  size?: string;
  color?: string;
  inStock?: boolean;
  rating?: number;
  reviews?: number;
  bestseller?: boolean;
  new?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  total: number;
  items: CartItem[];
  deliveryDate?: string;
  estimatedDelivery?: string;
  estimatedShipping?: string;
  trackingNumber?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

// Cart Management
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product: Product, quantity: number = 1): void => {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (productId: number): void => {
  const cart = getCart();
  const filteredCart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(filteredCart));
};

export const updateCartQuantity = (productId: number, quantity: number): void => {
  if (quantity === 0) {
    removeFromCart(productId);
    return;
  }
  
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

export const clearCart = (): void => {
  localStorage.removeItem('cart');
};

export const getCartCount = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Wishlist Management
export const getWishlist = (): Product[] => {
  const wishlist = localStorage.getItem('wishlist');
  return wishlist ? JSON.parse(wishlist) : [];
};

export const addToWishlist = (product: Product): void => {
  const wishlist = getWishlist();
  const exists = wishlist.find(item => item.id === product.id);
  
  if (!exists) {
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
};

export const removeFromWishlist = (productId: number): void => {
  const wishlist = getWishlist();
  const filteredWishlist = wishlist.filter(item => item.id !== productId);
  localStorage.setItem('wishlist', JSON.stringify(filteredWishlist));
};

export const isInWishlist = (productId: number): boolean => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === productId);
};

export const getWishlistCount = (): number => {
  return getWishlist().length;
};

// Orders Management
export const getOrders = (): Order[] => {
  const orders = localStorage.getItem('orders');
  return orders ? JSON.parse(orders) : [];
};

export const createOrder = (cartItems: CartItem[]): Order => {
  const orderNumber = Date.now().toString();
  const order: Order = {
    id: `ORD-${orderNumber}`,
    date: new Date().toISOString(),
    status: 'processing',
    total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    items: cartItems,
    estimatedShipping: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days
  };
  
  const orders = getOrders();
  orders.unshift(order); // Add to beginning
  localStorage.setItem('orders', JSON.stringify(orders));
  
  return order;
};

// Auth Management
export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const login = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  return null;
};

export const signup = (name: string, email: string, password: string): User | null => {
  const users = getUsers();
  const existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    return null; // User already exists
  }
  
  const newUser: User = {
    id: Date.now(),
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  
  return newUser;
};

export const logout = (): void => {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('rememberUser');
};

export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Sample Products Data
export const getSampleProducts = (): Product[] => {
  return [
    {
      id: 1,
      name: 'Elegant Silk Saree',
      price: 2999,
      originalPrice: 4999,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=400&h=600&fit=crop',
      category: 'Sarees',
      description: 'Premium silk saree with traditional motifs',
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
      description: 'Comfortable cotton suit perfect for daily wear',
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
      description: 'Elegant georgette suit for special occasions',
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
      description: 'Classic cotton saree with hand-block prints',
      inStock: true,
      rating: 4.4,
      reviews: 67
    },
    {
      id: 5,
      name: 'Banarasi Silk Saree',
      price: 8999,
      originalPrice: 12999,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e3?w=400&h=600&fit=crop',
      category: 'Sarees',
      description: 'Luxurious Banarasi silk with gold zari work',
      inStock: true,
      rating: 4.9,
      reviews: 201,
      bestseller: true
    },
    {
      id: 6,
      name: 'Chanderi Suit Set',
      price: 2799,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba9b0b6?w=400&h=600&fit=crop',
      category: 'Suits',
      description: 'Pure Chanderi suit with delicate embroidery',
      inStock: true,
      rating: 4.7,
      reviews: 143
    }
  ];
};
