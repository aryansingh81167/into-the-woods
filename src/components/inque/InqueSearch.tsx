
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { inqueProductData, type InqueProduct } from '@/lib/inque-data';
import { voltProductData, type VoltProduct } from '@/lib/volt-data';
import { restaurants, type MenuItem } from '@/lib/feast-data';
import Link from 'next/link';
import Image from 'next/image';

type SearchResult = (InqueProduct | VoltProduct | MenuItem) & { href: string };

interface InqueSearchProps {
  store: 'flash' | 'feast' | 'volt';
}

export function InqueSearch({ store }: InqueSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const getPlaceholder = () => {
    switch (store) {
      case 'feast':
        return 'Search for "Pizza"';
      case 'volt':
        return 'Search for "Laptop"';
      default:
        return 'Search for "Cookies"';
    }
  }

  useEffect(() => {
    if (query.trim().length > 1) {
      let searchPool: SearchResult[] = [];
      
      switch (store) {
        case 'flash':
          searchPool = inqueProductData.map(p => ({ ...p, href: `/inque/products/${p.id}` }));
          break;
        case 'volt':
          searchPool = voltProductData.map(p => ({ ...p, title: p.name, href: `/volt/products/${p.id}` }));
          break;
        case 'feast':
          const allMenuItems = restaurants.flatMap(r => r.menu.map(item => ({...item, restaurantName: r.name, href: `/feast/restaurants/${r.id}`})));
          searchPool = allMenuItems.map(p => ({...p, title: p.name}));
          break;
      }

      const filteredResults = searchPool
        .filter((item) =>
          (item.title || (item as any).name).toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [query, store]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchContainerRef]);

  return (
    <div className="relative" ref={searchContainerRef}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <input
        type="search"
        placeholder={getPlaceholder()}
        className="w-full h-12 pl-12 pr-4 rounded-xl border-2 border-input bg-background/50 focus:bg-card focus:border-primary focus:ring-primary/50"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
      />
      {isFocused && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border rounded-lg shadow-lg z-50 overflow-hidden">
          <ul>
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  href={product.href}
                  className="flex items-center gap-4 p-3 hover:bg-muted"
                  onClick={() => setIsFocused(false)}
                >
                  <Image
                    src={product.image}
                    alt={product.title!}
                    width={40}
                    height={40}
                    className="rounded-md object-contain border"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold text-sm">{product.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {(product as any).weight || (product as any).restaurantName || (product as any).brand}
                    </p>
                  </div>
                  <p className="font-semibold text-sm text-primary">
                    Ð{product.price.toFixed(2)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
