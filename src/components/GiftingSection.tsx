
import Link from 'next/link';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from './ui/button';

export function GiftingSection() {
  return (
    <section className="mt-16 md:mt-24">
      <div className="container mx-auto px-4">
        <div className="relative aspect-video md:aspect-[2.5/1] w-full max-w-5xl mx-auto overflow-hidden rounded-lg group">
           <Image
            src={placeholderImages.gifting.src}
            alt="Person receiving a plant as a gift"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={placeholderImages.gifting.hint}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-white drop-shadow-md">
              Gifting
            </h2>
            <p className="mt-4 text-lg text-white/90 drop-shadow-sm max-w-lg">
                Find the perfect plant for every occasion.
            </p>
            <Button asChild size="lg" className="mt-6 bg-white text-primary hover:bg-white/90">
                <Link href="/shop/gifts">Shop Gifts</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
