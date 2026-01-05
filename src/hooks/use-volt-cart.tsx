
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { VoltProduct } from '@/lib/volt-data';
import { useToast } from '@/hooks/use-toast';

// The cart item for Volt will be based on the VoltProduct
export interface VoltCartItem extends VoltProduct {
  quantity: number;
}

interface VoltCartContextType {
  cartItems: VoltCartItem[];
  addToCart: (item: VoltProduct, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const VoltCartContext = createContext<VoltCartContextType | undefined>(undefined);

export const VoltCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<VoltCartItem[]>([]);
  const { toast } = useToast();
  const storageKey = 'voltCartItems';

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(storageKey);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to parse Volt cart items from localStorage', error);
      localStorage.removeItem(storageKey);
    }
  }, []);

  const saveCart = (items: VoltCartItem[]) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save Volt cart items to localStorage', error);
    }
  };
  
  const addToCart = useCallback((item: VoltProduct, quantity: number = 1) => {
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
        title: "Added to Volt Cart!",
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
    <VoltCartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount }}>
      {children}
    </VoltCartContext.Provider>
  );
};

export const useVoltCart = () => {
  const context = useContext(VoltCartContext);
  if (context === undefined) {
    throw new Error('useVoltCart must be used within a VoltCartProvider');
  }
  return context;
};
