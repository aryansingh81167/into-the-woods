
'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Plant } from '@/lib/types';
import { Button } from './ui/button';
import { Star, ChevronDown, ShoppingCart, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductCardCarousel } from './Product-card-carousel';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  plant: Plant;
  badge?: string;
  rating: number;
  reviews: number;
}

export function ProductCard({ plant, badge, rating, reviews }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToCart, updateQuantity, cartItems } = useCart();
  const shortDescription = plant.description.length > 80 ? plant.description.substring(0, 80) + '...' : plant.description;

  const itemInCart = cartItems.find(item => item.id === plant.id);
  const quantity = itemInCart?.quantity || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(plant);
  }

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(plant.id, quantity + 1);
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(plant.id, quantity - 1);
  };

  return (
    <div className="group">
        <Link href={`/listings/${plant.id}`}>
            <ProductCardCarousel plant={plant} badge={badge} />
        </Link>
      
      <div className="flex items-center mb-1.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-3 w-3 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
        ))}
        <span className="text-xs text-muted-foreground ml-1.5">({reviews})</span>
      </div>

      <h3 className="text-sm font-medium text-primary mb-0.5 truncate">
        <Link href={`/listings/${plant.id}`} className="hover:underline">{plant.name}</Link>
      </h3>
      <p className="text-xs text-muted-foreground mb-1.5">
        {plant.size === 'Small' ? '100cm' : plant.size === 'Medium' ? '150cm' : '170cm'} • Chalk White Pot
      </p>

      <div className="text-xs text-muted-foreground mb-2">
        <p className="inline">
          {isExpanded ? plant.description : shortDescription}
        </p>
        {plant.description.length > 80 && (
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsExpanded(!isExpanded)}} className="text-primary hover:underline font-bold inline-flex items-center gap-1 ml-1">
            <ChevronDown className={cn("h-3 w-3 transition-transform", isExpanded && "rotate-180")} />
          </button>
        )}
      </div>

      <p className="text-sm font-semibold text-primary mb-3">
        Ð {plant.price.toFixed(0)}
      </p>

      {quantity === 0 ? (
        <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-8" onClick={handleAddToCart}>
          ADD TO CART
        </Button>
      ) : (
        <div className="flex items-center justify-center h-8">
            <Button size="icon" variant="default" className="h-full w-10 rounded-r-none" onClick={handleDecreaseQuantity}>
                <Minus className="h-3 w-3" />
            </Button>
            <div className="flex-1 text-center border-y text-sm font-medium h-full flex items-center justify-center border-primary">
                {quantity}
            </div>
            <Button size="icon" variant="default" className="h-full w-10 rounded-l-none" onClick={handleIncreaseQuantity}>
                <Plus className="h-3 w-3" />
            </Button>
        </div>
      )}
    </div>
  );
}
