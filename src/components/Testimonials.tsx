
'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import placeholderImages from '@/lib/placeholder-images.json';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function Testimonials() {
  return (
    <section className="bg-card/50 py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <Link href="#" className="group inline-flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary group-hover:underline">
              Over 60,000 plants delivered.
            </h2>
            <ChevronRight className="h-8 w-8 text-primary ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Marquee-style scrolling gallery */}
        <div className="relative h-80 md:h-96 w-full overflow-hidden">
            <div className="flex animate-marquee hover:pause space-x-4">
                {placeholderImages.testimonials.concat(placeholderImages.testimonials).map((img, index) => (
                    <div key={index} className="flex-shrink-0 w-56 md:w-64">
                         <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
                            <Image
                                src={img.src}
                                alt={`Customer plant photo ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover"
                                data-ai-hint={img.hint}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="text-center mt-10">
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            We love when our plants get the love they deserve.
          </p>
          <Button asChild size="lg" variant="outline" className="mt-6 border-primary text-primary hover:bg-primary/5 hover:text-primary">
            <Link href="#">Follow Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
