
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { InqueProduct } from '@/lib/inque-data';
import { useToast } from '@/hooks/use-toast';

export interface InqueCartItem extends InqueProduct {
  quantity: number;
}

interface InqueCartContextType {
  cartItems: InqueCartItem[];
  addToCart: (item: InqueProduct, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const InqueCartContext = createContext<InqueCartContextType | undefined>(undefined);

export const InqueCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<InqueCartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('inqueCartItems');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to parse INQUE cart items from localStorage', error);
      localStorage.removeItem('inqueCartItems');
    }
  }, []);

  const saveCart = (items: InqueCartItem[]) => {
    try {
      localStorage.setItem('inqueCartItems', JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save INQUE cart items to localStorage', error);
    }
  };
  
  const addToCart = useCallback((item: InqueProduct, quantity: number = 1) => {
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
        title: "Added to Quick Cart!",
        description: `${item.title} has been added.`,
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
    <InqueCartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount }}>
      {children}
    </InqueCartContext.Provider>
  );
};

export const useInqueCart = () => {
  const context = useContext(InqueCartContext);
  if (context === undefined) {
    throw new Error('useInqueCart must be used within a InqueCartProvider');
  }
  return context;
};
