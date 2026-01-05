
'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import { Plus, ChevronDown } from 'lucide-react';
import type { InqueProduct } from '@/lib/inque-data';
import { useInqueCart } from '@/hooks/use-inque-cart';
import { Badge } from '../ui/badge';
import Link from 'next/link';

interface HotDealProduct extends InqueProduct {
  originalPrice?: number;
  discount?: string;
}

interface InqueHotDealCardProps {
  product: HotDealProduct;
}

export function InqueHotDealCard({ product }: InqueHotDealCardProps) {
  const { addToCart } = useInqueCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="w-36 flex-shrink-0">
       <Link href={`/inque/products/${product.id}`} className="block group">
        <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-muted border-2 border-border mb-2">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-2"
            sizes="20vw"
          />
          <Button
            size="icon"
            className="absolute top-1.5 right-1.5 h-7 w-7 rounded-lg bg-background text-primary border-primary border-2 shadow-md hover:bg-primary/10"
            onClick={handleAddToCart}
          >
            <Plus className="h-5 w-5 font-bold" />
          </Button>
        </div>
      </Link>
      <p className="text-xs text-muted-foreground">4 MINS</p>
      <h3 className="text-sm font-bold text-foreground truncate leading-tight mt-1">{product.title}</h3>
      <button className="flex items-center text-sm text-muted-foreground mt-1">
        {product.weight} <ChevronDown className="h-4 w-4 ml-1" />
      </button>
      <div className="mt-2 flex flex-col">
        {product.discount && (
            <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50 mb-1 w-fit">
                {product.discount}
            </Badge>
        )}
        <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-foreground">Ð{product.price.toFixed(0)}</p>
            {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">Ð{product.originalPrice.toFixed(0)}</p>
            )}
        </div>
      </div>
    </div>
  );
}
