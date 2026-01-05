
'use client';

import { useEffect, useState } from 'react';
import { FeastCartProvider } from './use-feast-cart';

export function FeastCartClientProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <FeastCartProvider>{children}</FeastCartProvider>;
}
