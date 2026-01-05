
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Smartphone, Laptop, Headphones, Home, Plus, PcCase, Refrigerator, Tablet, Tv, Gamepad2 } from 'lucide-react';
import { voltProductData, type VoltProduct } from '@/lib/volt-data';
import { Badge } from '@/components/ui/badge';
import { useVoltCart } from '@/hooks/use-volt-cart';
import { SponsoredCarousel } from '@/components/SponsoredCarousel';

const ProductCard = ({ product }: { product: VoltProduct }) => {
    const { addToCart } = useVoltCart();
    
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    }

    return (
        <Link href={`#`} className="block group">
            <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg h-full flex flex-col">
                <div className="relative aspect-square w-full">
                    <Image 
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={product.category}
                    />
                    {product.discount && (
                        <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">{product.discount}</Badge>
                    )}
                     <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 text-white text-xs font-bold p-1 rounded-md">
                        ★ {product.rating.toFixed(1)}
                    </div>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col">
                    <div>
                        <h3 className="text-lg font-bold text-primary truncate">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                        <p className="text-xs text-foreground/80 line-clamp-2 mb-4">{product.description}</p>
                    </div>
                    <div className="mt-auto flex items-end justify-between">
                       <div>
                         {product.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">Ð{product.originalPrice.toFixed(2)}</p>
                        )}
                        <p className="text-xl font-extrabold text-primary">Ð{product.price.toFixed(2)}</p>
                       </div>
                       <Button size="sm" onClick={handleAddToCart}>
                            <Plus className="mr-2 h-4 w-4" /> Add
                       </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

const CategorySection = ({ title, items, id }: { title: string, items: VoltProduct[], id: string }) => (
    <section id={id} className="my-12 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-6 font-headline text-primary">{title}</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
                <ProductCard key={item.id} product={item} />
            ))}
        </div>
    </section>
);


export default function VoltPage() {
    const topDeals = voltProductData.filter(p => p.discount).slice(0, 3);
    const smartphones = voltProductData.filter(p => p.category === 'Smartphones');
    const laptops = voltProductData.filter(p => p.category === 'Laptops');
    const audio = voltProductData.filter(p => p.category === 'Audio');
    const pcs = voltProductData.filter(p => p.category === 'PCs');
    const homeAppliances = voltProductData.filter(p => p.category === 'Home Appliances');
    const tablets = voltProductData.filter(p => p.category === 'Tablets');
    const tvAndDisplay = voltProductData.filter(p => p.category === 'TV & Display');
    const gaming = voltProductData.filter(p => p.category === 'Gaming');
    const accessories = voltProductData.filter(p => p.category === 'Accessories');


    const categories = [
        { name: 'Smartphones', icon: <Smartphone />, href: '/volt/products/smartphones' },
        { name: 'Laptops', icon: <Laptop />, href: '/volt/products/laptops' },
        { name: 'Tablets', icon: <Tablet />, href: '/volt/products/tablets' },
        { name: 'Audio', icon: <Headphones />, href: '/volt/products/audio' },
        { name: 'PCs', icon: <PcCase />, href: '/volt/products/pcs' },
        { name: 'TV & Displays', icon: <Tv />, href: '/volt/products/tv-display' },
        { name: 'Appliances', icon: <Refrigerator />, href: '/volt/products/home-appliances' },
        { name: 'Gaming', icon: <Gamepad2 />, href: '/volt/products/gaming' },
    ];
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto max-w-6xl p-4">
        
        <SponsoredCarousel store="volt" />
        
        {/* Top Deals */}
        <section className="my-12">
             <h2 className="text-3xl font-bold mb-6 font-headline text-primary">Top Deals</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topDeals.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
             </div>
        </section>
        
        {/* Category Links */}
        <section className="my-12 p-6 bg-card rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Shop by Category</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {categories.map(category => (
                    <Link href={category.href} key={category.name}>
                        <div className="flex flex-col items-center justify-center text-center p-2 bg-muted hover:bg-primary/10 rounded-lg transition-colors h-full">
                           <div className="text-primary mb-2">{React.cloneElement(category.icon, { className: "h-8 w-8" })}</div>
                           <p className="font-semibold text-xs sm:text-sm">{category.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* Product Sections */}
        <CategorySection id="smartphones" title="Latest Smartphones" items={smartphones} />
        <CategorySection id="laptops" title="Powerful Laptops" items={laptops} />
        <CategorySection id="audio" title="Immersive Audio" items={audio} />
        <CategorySection id="pcs" title="Desktops & PCs" items={pcs} />
        <CategorySection id="home-appliances" title="Smart Home Appliances" items={homeAppliances} />
        <CategorySection id="tablets" title="Tablets & E-Readers" items={tablets} />
        <CategorySection id="tv-display" title="TV & Displays" items={tvAndDisplay} />
        <CategorySection id="gaming" title="Gaming Gear" items={gaming} />
        <CategorySection id="accessories" title="Essential Accessories" items={accessories} />

      </main>
    </div>
  );
}
