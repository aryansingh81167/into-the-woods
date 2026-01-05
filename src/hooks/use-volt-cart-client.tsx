
'use client';

import { useEffect, useState } from 'react';
import { VoltCartProvider } from './use-volt-cart';

export function VoltCartClientProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <VoltCartProvider>{children}</VoltCartProvider>;
}
