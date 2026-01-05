
import { VoltProductCard } from '@/components/volt/VoltProductCard';
import { voltProductData } from '@/lib/volt-data';
import Link from 'next/link';

export default function VoltLaptopsPage() {
  const products = voltProductData.filter(p => p.category === 'Laptops');

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto max-w-6xl px-4 py-6">
        <header className="mb-8 text-center">
            <Link href="/volt">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary hover:underline">Laptops</h1>
            </Link>
            <p className="text-muted-foreground mt-2">Powerful laptops for work, play, and everything in between.</p>
        </header>

        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map(product => (
              <VoltProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
