
import Link from 'next/link';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const categories = [
  { name: 'Saplings', href: '/shop/saplings', image: placeholderImages.sapling },
  { name: 'Aquarium', href: '/shop/aquarium', image: placeholderImages.aquarium },
  { name: 'Terrarium', href: '/shop/terrarium', image: placeholderImages.terrarium },
  { name: 'Sculptures', href: '/shop/sculptures', image: placeholderImages.sculptures },
  { name: 'Furniture', href: '/shop/furniture', image: placeholderImages.furniture },
  { name: 'Fishes', href: '/shop/fishes', image: placeholderImages.fishes },
  { name: 'Paintings', href: '/shop/paintings', image: placeholderImages.paintings },
];

export function ShopCategories() {
  return (
    <section className="py-8 md:py-12">
      <div className="flex justify-center">
        <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex w-max space-x-6 px-4 mx-auto">
              {categories.map((category) => (
                <Link href={category.href} key={category.name} className="group shrink-0">
                  <Card className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                    <Image
                      src={category.image.src}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={category.image.hint}
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center p-1">
                      <h3 className="text-white font-headline text-center text-sm md:text-base font-semibold drop-shadow-md">
                        {category.name}
                      </h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
