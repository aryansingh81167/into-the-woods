
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

import { plantData } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from './ui/button';

// Let's pick 4 plants for our sale
const salePlantIds = ['1', '3', '8', '9'];
const salePlants = plantData
  .filter((p) => salePlantIds.includes(p.id))
  .map((plant) => ({
    ...plant,
    discountPrice: Math.round(plant.price * 0.8), // 20% off
  }));

export function SaleCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {salePlants.map((plant) => (
            <CarouselItem key={plant.id}>
              <div className="p-1">
                <Card className="overflow-hidden border-0 shadow-none rounded-none">
                  <div className="grid md:grid-cols-2">
                    <div className="md:col-span-1 relative aspect-[4/3] md:aspect-[2/1]">
                      <Image
                        src={plant.images[0]}
                        alt={plant.name}
                        fill
                        className="object-cover"
                        data-ai-hint="house plant sale"
                      />
                       <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-full text-sm font-bold">
                        SALE IS LIVE
                      </div>
                    </div>
                    <div className="md:col-span-1 flex flex-col justify-center p-6 md:p-12 bg-card">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-headline text-primary mb-2">
                        {plant.name}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground mb-4">
                        {plant.species}
                      </p>
                      <p className="text-sm text-foreground/80 mb-4 line-clamp-2">
                        {plant.description}
                      </p>
                      <div className="flex items-baseline gap-4 mb-6">
                        <p className="text-3xl md:text-4xl font-bold text-destructive">
                          Ð {plant.discountPrice.toFixed(2)}
                        </p>
                        <p className="text-xl md:text-2xl font-medium text-muted-foreground line-through">
                          Ð {plant.price.toFixed(2)}
                        </p>
                      </div>
                      <Button asChild size="lg" className="w-full sm:w-auto self-start">
                        <Link href={`/listings/${plant.id}`}>Shop Now</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex left-4" />
        <CarouselNext className="hidden md:flex right-4" />
      </Carousel>
    </section>
  );
}
