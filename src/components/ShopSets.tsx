
import Link from 'next/link';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

export function ShopSets() {
  return (
    <section className="mt-16 md:mt-24">
      <div className="container mx-auto px-4">
        <div className="relative aspect-video md:aspect-[3/1] w-full max-w-6xl mx-auto overflow-hidden rounded-lg group">
           <Image
            src={placeholderImages.shopSets.src}
            alt="Shop plant sets"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={placeholderImages.shopSets.hint}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
            <Link href="/shop/sets" className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold font-headline text-white drop-shadow-md hover:underline underline-offset-8">
                Shop Sets
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
