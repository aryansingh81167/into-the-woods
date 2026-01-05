
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Plus, Zap } from 'lucide-react';
import type { InqueProduct } from '@/lib/inque-data';
import { useInqueCart } from '@/hooks/use-inque-cart';

interface InqueProductCardProps {
  product: InqueProduct;
}

export function InqueProductCard({ product }: InqueProductCardProps) {
  const { addToCart } = useInqueCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  }

  return (
    <div className="group">
        <Link href={`/inque/products/${product.id}`} className="block">
            <div className="relative overflow-hidden rounded-lg mb-3 border bg-card">
                <div className="aspect-square relative">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint="grocery product"
                    />
                </div>
                 <Button size="icon" className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleAddToCart}>
                    <Plus className="h-5 w-5" />
                </Button>
            </div>
        </Link>
      
      <p className="text-sm font-bold text-primary mb-1">
        Ð{product.price.toFixed(2)}
      </p>

      <h3 className="text-sm font-semibold text-foreground mb-0.5 truncate group-hover:text-primary">
        <Link href={`/inque/products/${product.id}`}>{product.title}</Link>
      </h3>
      <p className="text-xs text-muted-foreground mb-1.5">
        {product.weight}
      </p>
      
      <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
        <Zap className="h-3.5 w-3.5" />
        <span>{product.deliveryTime}</span>
      </div>
    </div>
  );
}
