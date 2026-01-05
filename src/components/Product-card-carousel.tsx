
'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Plant } from '@/lib/types';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardCarouselProps {
  plant: Plant;
  badge?: string;
}

export function ProductCardCarousel({ plant, badge }: ProductCardCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % plant.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? plant.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative overflow-hidden rounded-lg mb-3 group/carousel">
      <div className="aspect-[3/4] relative">
        <Image
          src={plant.images[currentImageIndex]}
          alt={`${plant.name} image ${currentImageIndex + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="house plant"
        />
         {badge && (
          <Badge className="absolute top-2 left-2 z-10 bg-yellow-300 text-black hover:bg-yellow-400 py-0.5 px-2 text-xs">
            {badge}
          </Badge>
        )}
      </div>

      {plant.images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-1 -translate-y-1/2 h-7 w-7 rounded-full bg-background/40 text-foreground opacity-0 group-hover/carousel:opacity-100 hover:bg-background/60 z-20"
            onClick={handlePrevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-1 -translate-y-1/2 h-7 w-7 rounded-full bg-background/40 text-foreground opacity-0 group-hover/carousel:opacity-100 hover:bg-background/60 z-20"
            onClick={handleNextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-20">
            {plant.images.map((_, index) => (
              <div
                key={index}
                className={`h-1 w-1 rounded-full ${
                  index === currentImageIndex ? 'bg-primary' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
