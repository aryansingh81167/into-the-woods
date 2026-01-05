'use client';

import { useEffect, useState } from 'react';
import { CartProvider } from './use-cart';

export function CartClientProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <CartProvider>{children}</CartProvider>;
}
