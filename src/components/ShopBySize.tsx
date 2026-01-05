
import Link from 'next/link';
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';

const sizeCategories = [
  {
    name: 'Small',
    image: placeholderImages.smallPlant,
    href: '/shop/small',
  },
  {
    name: 'Medium',
    image: placeholderImages.mediumPlant,
    href: '/shop/medium',
  },
  {
    name: 'Large',
    image: placeholderImages.largePlant,
    href: '/shop/large',
  },
  {
    name: 'Huge',
    image: placeholderImages.hugePlant,
    href: '/shop/huge',
  },
];

export function ShopBySize() {
  return (
    <section className="mt-16 md:mt-24">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary">Shop by Size</h2>
        <p className="text-lg text-muted-foreground mt-2">
          Discover our wide selection of plants in a variety of pots and sizes
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {sizeCategories.map((category) => (
          <Link href={category.href} key={category.name} className="group text-center">
            <div className="relative overflow-hidden rounded-lg mb-4 aspect-[1.75/2.75] w-full max-w-[224px] mx-auto">
              <Image
                src={category.image.src}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={category.image.hint}
              />
            </div>
            <h3 className="text-xl font-medium text-primary hover:underline">{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
