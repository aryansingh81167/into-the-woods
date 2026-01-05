
'use client';

import {
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { InqueHotDealCard } from '@/components/inque/InqueHotDealCard';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { inqueProductData } from '@/lib/inque-data';
import { SponsoredCarousel } from '@/components/SponsoredCarousel';


const categories = [
  { name: 'Fresh Vegetables', href: '/products/vegetables', image: 'https://picsum.photos/seed/fresh-vegetables/200/200' },
  { name: 'Fresh Fruits', href: '/products/fruits', image: 'https://picsum.photos/seed/fresh-fruits/200/200' },
  { name: 'Dairy, Bread and Eggs', href: '/products/dairy', image: 'https://picsum.photos/seed/dairy-bread-eggs/200/200' },
  { name: 'Cereals and Breakfast', href: '/products/breakfast', image: 'https://picsum.photos/seed/cereals-breakfast/200/200' },
  { name: 'Atta, Rice and Dal', href: '/products/staples', image: 'https://picsum.photos/seed/atta-rice-dal/200/200' },
  { name: 'Oils and Ghee', href: '/products/oils', image: 'https://picsum.photos/seed/oils-ghee/200/200' },
  { name: 'Masalas', href: '/products/masalas', image: 'https://picsum.photos/seed/masalas/200/200' },
  { name: 'Dry Fruits and Seeds Mix', href: '/products/dry-fruits', image: 'https://picsum.photos/seed/dry-fruits-seeds/200/200' },
  { name: 'Biscuits and Cakes', href: '/products/biscuits', image: 'https://picsum.photos/seed/biscuits-cakes/200/200' },
  { name: 'Tea, Coffee and Milk drinks', href: '/products/beverages', image: 'https://picsum.photos/seed/tea-coffee-milk/200/200' },
  { name: 'Sauces and Spreads', href: '/products/sauces', image: 'https://picsum.photos/seed/sauces-spreads/200/200' },
  { name: 'Meat and Seafood', href: '/products/meat', image: 'https://picsum.photos/seed/meat-seafood/200/200' },
];

const snacksAndDrinksCategories = [
    { name: 'Cold Drinks & Juices', href: '/products/drinks', image: 'https://picsum.photos/seed/cold-drinks/200/200' },
    { name: 'Ice Cream & Desserts', href: '/products/frozen', image: 'https://picsum.photos/seed/ice-cream/200/200' },
    { name: 'Chips & Namkeen', href: '/products/snacks', image: 'https://picsum.photos/seed/chips-snacks/200/200' },
    { name: 'Chocolates', href: '/products/snacks', image: 'https://picsum.photos/seed/chocolates/200/200' },
    { name: 'Noodles & Pasta', href: '/products/groceries', image: 'https://picsum.photos/seed/noodles-pasta/200/200' },
    { name: 'Frozen Food', href: '/products/frozen', image: 'https://picsum.photos/seed/frozen-food-cat/200/200' },
    { name: 'Sweet Corner', href: '/products/bakery', image: 'https://picsum.photos/seed/sweet-corner/200/200' },
    { name: 'Paan Corner', href: '/products/snacks', image: 'https://picsum.photos/seed/paan-corner/200/200' },
];

const beautyAndWellnessCategories = [
  { name: 'Bath and Body', href: '/products/bath-body', image: 'https://picsum.photos/seed/bath-body/200/200' },
  { name: 'Hair Care', href: '/products/hair-care', image: 'https://picsum.photos/seed/hair-care/200/200' },
  { name: 'Skincare', href: '/products/skincare', image: 'https://picsum.photos/seed/skincare/200/200' },
  { name: 'Makeup', href: '/products/makeup', image: 'https://picsum.photos/seed/makeup/200/200' },
  { name: 'Oral Care', href: '/products/oral-care', image: 'https://picsum.photos/seed/oral-care/200/200' },
  { name: 'Grooming', href: '/products/grooming', image: 'https://picsum.photos/seed/grooming/200/200' },
  { name: 'Baby Care', href: '/products/baby-care', image: 'https://picsum.photos/seed/baby-care/200/200' },
  { name: 'Fragrances', href: '/products/fragrances', image: 'https://picsum.photos/seed/fragrances/200/200' },
  { name: 'Protein and Supplements', href: '/products/supplements', image: 'https://picsum.photos/seed/protein-supplements/200/200' },
  { name: 'Feminine Hygiene', href: '/products/feminine-hygiene', image: 'https://picsum.photos/seed/feminine-hygiene/200/200' },
  { name: 'Sexual Wellness', href: '/products/sexual-wellness', image: 'https://picsum.photos/seed/sexual-wellness/200/200' },
  { name: 'Health and Pharma', href: '/products/health-pharma', image: 'https://picsum.photos/seed/health-pharma/200/200' },
];

const householdAndLifestyleCategories = [
  { name: 'Home and Furnishing', href: '/products/home-furnishing', image: 'https://picsum.photos/seed/home-furnishing/200/200' },
  { name: 'Kitchen and Dining', href: '/products/kitchen-dining', image: 'https://picsum.photos/seed/kitchen-dining/200/200' },
  { name: 'Cleaning Essentials', href: '/products/daily-essentials', image: 'https://picsum.photos/seed/cleaning-essentials/200/200' },
  { name: 'Clothing', href: '/products/clothing', image: 'https://picsum.photos/seed/clothing/200/200' },
  { name: 'Mobiles and Electronics', href: '/products/electronics', image: 'https://picsum.photos/seed/mobiles-electronics/200/200' },
  { name: 'Appliances', href: '/products/appliances', image: 'https://picsum.photos/seed/appliances/200/200' },
  { name: 'Books and Stationery', href: '/products/stationery', image: 'https://picsum.photos/seed/books-stationery/200/200' },
  { name: 'Jewellery and Accessories', href: '/products/accessories', image: 'https://picsum.photos/seed/jewellery-accessories/200/200' },
  { name: 'Puja', href: '/products/puja', image: 'https://picsum.photos/seed/puja/200/200' },
  { name: 'Toys and Games', href: '/products/toys', image: 'https://picsum.photos/seed/toys-games/200/200' },
  { name: 'Sports and Fitness', href: '/products/fitness', image: 'https://picsum.photos/seed/sports-fitness/200/200' },
  { name: 'Pet Supplies', href: '/products/pets', image: 'https://picsum.photos/seed/pet-supplies/200/200' },
];

const shopByStoreCategories = [
  { name: 'Giftables', href: '/store/giftables', image: 'https://picsum.photos/seed/gift-store/200/200' },
  { name: 'Gourmet Store', href: '/store/gourmet', image: 'https://picsum.photos/seed/gourmet-store/200/200' },
  { name: 'Travel Store', href: '/store/travel', image: 'https://picsum.photos/seed/travel-store/200/200' },
  { name: 'Puja Store', href: '/store/puja', image: 'https://picsum.photos/seed/puja-store/200/200' },
  { name: 'Pet Store', href: '/store/pets', image: 'https://picsum.photos/seed/pet-store/200/200' },
  { name: 'Local Favourites', href: '/store/local', image: 'https://picsum.photos/seed/local-store/200/200' },
];


export default function InquePage() {
  const hotDeals = inqueProductData.slice(0, 8).map(p => ({
    ...p,
    originalPrice: p.price * 1.25,
    discount: '20% OFF'
  }));

  return (
    <div className="bg-background text-foreground min-h-screen">
      
      <main className="container mx-auto max-w-6xl p-4">
        
        <SponsoredCarousel store="flash" />
        
        {/* Hot Deals Section */}
        <section className="my-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Hot deals</h2>
            <Link href="/deals" className="flex items-center text-sm font-semibold text-primary">
              See All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {hotDeals.map((product) => (
                <InqueHotDealCard key={product.id} product={product} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* Grocery & Kitchen Section */}
        <section className="my-8">
            <h2 className="text-xl font-bold mb-4">Grocery &amp; Kitchen</h2>
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {categories.map((category) => (
                    <Link href={category.href} key={category.name} className="flex flex-col items-center justify-start text-center group">
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted">
                           <Image src={category.image} alt={category.name} fill className="object-contain p-2" />
                        </div>
                        <p className="text-xs font-medium text-foreground mt-2 group-hover:text-primary">{category.name}</p>
                    </Link>
                ))}
            </div>
        </section>
        
        {/* Snacks & Drinks Section */}
        <section className="my-8">
            <h2 className="text-xl font-bold mb-4">Snacks &amp; drinks</h2>
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {snacksAndDrinksCategories.map((category) => (
                    <Link href={category.href} key={category.name} className="flex flex-col items-center justify-start text-center group">
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted">
                           <Image src={category.image} alt={category.name} fill className="object-contain p-2" />
                        </div>
                        <p className="text-xs font-medium text-foreground mt-2 group-hover:text-primary h-10 flex items-center justify-center">{category.name}</p>
                    </Link>
                ))}
            </div>
        </section>

        {/* Beauty & Wellness Section */}
        <section className="my-8">
            <h2 className="text-xl font-bold mb-4">Beauty &amp; Wellness</h2>
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {beautyAndWellnessCategories.map((category) => (
                    <Link href={category.href} key={category.name} className="flex flex-col items-center justify-start text-center group">
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted">
                           <Image src={category.image} alt={category.name} fill className="object-contain p-2" />
                        </div>
                        <p className="text-xs font-medium text-foreground mt-2 group-hover:text-primary h-10 flex items-center justify-center">{category.name}</p>
                    </Link>
                ))}
            </div>
        </section>

        {/* Household & Lifestyle Section */}
        <section className="my-8">
            <h2 className="text-xl font-bold mb-4">Household &amp; Lifestyle</h2>
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {householdAndLifestyleCategories.map((category) => (
                    <Link href={category.href} key={category.name} className="flex flex-col items-center justify-start text-center group">
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted">
                           <Image src={category.image} alt={category.name} fill className="object-contain p-2" />
                        </div>
                        <p className="text-xs font-medium text-foreground mt-2 group-hover:text-primary h-10 flex items-center justify-center">{category.name}</p>
                    </Link>
                ))}
            </div>
        </section>

        {/* Shop by Store Section */}
        <section className="my-8">
            <h2 className="text-xl font-bold mb-4">Shop by Store</h2>
            <ScrollArea>
                <div className="flex space-x-4 pb-4">
                    {shopByStoreCategories.map((category) => (
                        <Link href={category.href} key={category.name} className="flex flex-col items-center justify-start text-center group w-28">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                <Image src={category.image} alt={category.name} fill className="object-contain p-3"/>
                            </div>
                            <p className="text-xs font-medium text-foreground mt-2 group-hover:text-primary h-8">{category.name}</p>
                        </Link>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </section>
      </main>
    </div>
  );
}
