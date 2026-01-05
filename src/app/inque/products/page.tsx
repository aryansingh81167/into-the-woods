
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { InqueProductCard } from '@/components/InqueProductCard';
import { inqueProductData } from '@/lib/inque-data';
import Link from 'next/link';

export default function InqueProductsPage() {
  const categories = [...new Set(inqueProductData.map(p => p.category))];

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto max-w-6xl px-4 py-6">
        
        {/* Header */}
        <header className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
             <Link href="/">
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">All Products</h1>
            </Link>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 h-11 text-base"
              />
            </div>
          </div>
        </header>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center gap-2 flex-1">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                            <SelectItem key={cat} value={cat.toLowerCase().replace(' ', '-')}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="any">Any Price</SelectItem>
                        <SelectItem value="under-10">Under Ð10</SelectItem>
                        <SelectItem value="10-20">Ð10 - Ð20</SelectItem>
                        <SelectItem value="over-20">Over Ð20</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="flex items-center gap-2">
                <ArrowUpDown className="h-5 w-5 text-muted-foreground" />
                <Select>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by Relevance" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="fastest">Fastest Delivery</SelectItem>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        {/* Product Grid */}
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
            {inqueProductData.map(product => (
              <InqueProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
