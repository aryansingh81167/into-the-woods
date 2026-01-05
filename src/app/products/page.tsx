
'use client';

import { OurPlants } from '@/components/OurPlants';
import { ShopBySize } from '@/components/ShopBySize';
import { ShopSets } from '@/components/ShopSets';
import { ComparisonTable } from '@/components/ComparisonTable';
import { ForBeginners } from '@/components/ForBeginners';
import { Testimonials } from '@/components/Testimonials';
import { GiftingSection } from '@/components/GiftingSection';
import { SaleCarousel } from '@/components/SaleCarousel';
import { ShopCategories } from '@/components/ShopCategories';
import { SponsoredCarousel } from '@/components/SponsoredCarousel';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import type { Plant } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { Loader2 } from 'lucide-react';


export default function ProductsPage() {
  const { firestore } = useFirebase();

  const plantsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    // Only fetch listings that have been approved
    return query(collection(firestore, 'plantListings'), where('status', '==', 'approved'));
  }, [firestore]);

  const { data: plants, isLoading } = useCollection<Plant>(plantsQuery);

  const plantRatings: { [key: string]: { rating: number, reviews: number } } = {
    '1': { rating: 5, reviews: 60 },
    '2': { rating: 5, reviews: 65 },
    '3': { rating: 5, reviews: 48 },
    '4': { rating: 4, reviews: 9 },
    '5': { rating: 5, reviews: 102 },
    '6': { rating: 4, reviews: 55 },
    '7': { rating: 4, reviews: 32 },
    '8': { rating: 5, reviews: 89 },
    '9': { rating: 5, reviews: 78 },
    '10': { rating: 4, reviews: 45 },
    '11': { rating: 5, reviews: 92 },
  };

  const plantBadges: { [key: string]: string } = {
    '1': 'Most Popular',
    '2': 'Low light',
    '4': 'Best Seller',
    '9': 'New Arrival',
  };


  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10 bg-transparent">
        <SponsoredCarousel store="space" />
      </div>
      <ShopCategories />
      <SaleCarousel />
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10 bg-transparent">
        
        <section>
          <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Our Plants</h2>
              <p className="text-lg text-muted-foreground mt-2">
                  Explore our curated collection of beautiful, healthy plants.
              </p>
          </div>
          {isLoading ? (
             <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
             </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
              {(plants || []).map((plant) => (
                <ProductCard 
                  key={plant.id} 
                  plant={plant} 
                  badge={plantBadges[plant.id]} 
                  rating={plantRatings[plant.id]?.rating || 4}
                  reviews={plantRatings[plant.id]?.reviews || 5}
                />
              ))}
            </div>
          )}
        </section>

        <ForBeginners />

        <ShopBySize />

        <GiftingSection />
        
      </div>
      <ShopSets />
      <ComparisonTable />
      <Testimonials />
    </>
  );
}
