
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import type { VoltProduct } from '@/lib/volt-data';
import { useVoltCart } from '@/hooks/use-volt-cart';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

interface VoltProductCardProps {
  product: VoltProduct;
}

export function VoltProductCard({ product }: VoltProductCardProps) {
  const { addToCart } = useVoltCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  return (
    <Link href={`#`} className="block group h-full">
      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg h-full flex flex-col">
        <div className="relative aspect-square w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.category}
          />
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">{product.discount}</Badge>
          )}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 text-white text-xs font-bold p-1 rounded-md">
            ★ {product.rating.toFixed(1)}
          </div>
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <div>
            <h3 className="text-base font-bold text-primary truncate">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
          </div>
          <div className="mt-auto flex items-end justify-between">
            <div>
              {product.originalPrice && (
                <p className="text-xs text-muted-foreground line-through">Ð{product.originalPrice.toFixed(2)}</p>
              )}
              <p className="text-lg font-extrabold text-primary">Ð{product.price.toFixed(2)}</p>
            </div>
            <Button size="icon" className="h-9 w-9" onClick={handleAddToCart}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
