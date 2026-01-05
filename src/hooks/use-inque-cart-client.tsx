
'use client';

import { useEffect, useState } from 'react';
import { InqueCartProvider } from './use-inque-cart';

export function InqueCartClientProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <InqueCartProvider>{children}</InqueCartProvider>;
}
