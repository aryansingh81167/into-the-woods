
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { MenuItem } from '@/lib/feast-data';
import { useToast } from '@/hooks/use-toast';

export interface FeastCartItem extends MenuItem {
  quantity: number;
}

interface FeastCartContextType {
  cartItems: FeastCartItem[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const FeastCartContext = createContext<FeastCartContextType | undefined>(undefined);

export const FeastCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<FeastCartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('feastCartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to parse Feast cart items from localStorage', error);
      localStorage.removeItem('feastCartItems');
    }
  }, []);

  const saveCart = (items: FeastCartItem[]) => {
    try {
      localStorage.setItem('feastCartItems', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save Feast cart items to localStorage', error);
    }
  };
  
  const addToCart = useCallback((item: MenuItem, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        newItems = [...prevItems, { ...item, quantity }];
      }
      saveCart(newItems);
      return newItems;
    });
    toast({
        title: "Added to Feast Cart!",
        description: `${item.name} has been added.`,
    });
  }, [toast]);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(i => i.id !== itemId);
      saveCart(newItems);
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prevItems => {
      const newItems = prevItems.map(i =>
        i.id === itemId ? { ...i, quantity } : i
      );
      saveCart(newItems);
      return newItems;
    });
  }, [removeFromCart]);
  
  const clearCart = useCallback(() => {
    setCartItems([]);
    saveCart([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);
  
  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  return (
    <FeastCartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount }}>
      {children}
    </FeastCartContext.Provider>
  );
};

export const useFeastCart = () => {
  const context = useContext(FeastCartContext);
  if (context === undefined) {
    throw new Error('useFeastCart must be used within a FeastCartProvider');
  }
  return context;
};
