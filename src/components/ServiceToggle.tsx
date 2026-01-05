
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const ServiceToggle = () => {
  const pathname = usePathname();
  const isProductsPage = pathname.startsWith('/products');

  return (
    <div className="bg-muted p-1 rounded-full flex items-center">
      <Button
        asChild
        variant="ghost"
        className={cn(
          'rounded-full px-4 sm:px-6 md:px-8 text-xs sm:text-sm',
          !isProductsPage ? 'bg-background text-foreground shadow-sm' : 'hover:bg-muted/80'
        )}
      >
        <Link href="/">Quick Commerce</Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        className={cn(
          'rounded-full px-4 sm:px-6 md:px-8 text-xs sm:text-sm',
          isProductsPage ? 'bg-background text-foreground shadow-sm' : 'hover:bg-muted/80'
        )}
      >
        <Link href="/products">Home Decor</Link>
      </Button>
    </div>
  );
};

