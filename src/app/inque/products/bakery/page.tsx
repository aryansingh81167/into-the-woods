
import { InqueProductCard } from '@/components/InqueProductCard';
import { inqueProductData } from '@/lib/inque-data';
import Link from 'next/link';

export default function InqueBakeryPage() {
  const products = inqueProductData.filter(p => p.category === 'Bakery');

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto max-w-6xl px-4 py-6">
        <header className="mb-8 text-center">
            <Link href="/">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary hover:underline">Bakery</h1>
            </Link>
            <p className="text-muted-foreground mt-2">Freshly baked bread, pastries, and cakes.</p>
        </header>

        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
            {products.map(product => (
              <InqueProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
