
import { useState, useEffect } from 'react';
import { 
  getCart, 
  getWishlist, 
  getCurrentUser, 
  getCartCount, 
  getWishlistCount,
  type CartItem,
  type Product,
  type User
} from '@/services/localStorage';

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = () => {
    const currentCart = getCart();
    setCart(currentCart);
    setCartCount(getCartCount());
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return { cart, cartCount, refreshCart };
};

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  const refreshWishlist = () => {
    const currentWishlist = getWishlist();
    setWishlist(currentWishlist);
    setWishlistCount(getWishlistCount());
  };

  useEffect(() => {
    refreshWishlist();
  }, []);

  return { wishlist, wishlistCount, refreshWishlist };
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshAuth = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsAuthenticated(!!currentUser);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return { user, isAuthenticated, refreshAuth };
};
