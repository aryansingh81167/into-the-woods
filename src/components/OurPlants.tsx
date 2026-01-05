
import Link from 'next/link';
import { plantData } from '@/lib/data';
import { ProductCard } from './ProductCard';
import { Button } from './ui/button';

const plantBadges: { [key: string]: string } = {
  '1': 'Most Popular',
  '2': 'Low light',
  '4': 'Best Seller',
  '9': 'New Arrival',
};

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


export function OurPlants() {
  return (
    <section>
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Most Popular</h2>
            <p className="text-lg text-muted-foreground mt-2">
                Your favorite plants for your living room, kitchen, & bedroom.
            </p>
        </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
        {plantData.slice(0, 5).map((plant) => (
          <ProductCard 
            key={plant.id} 
            plant={plant} 
            badge={plantBadges[plant.id]} 
            rating={plantRatings[plant.id]?.rating || 5}
            reviews={plantRatings[plant.id]?.reviews || 0}
          />
        ))}
      </div>
      <div className="text-center mt-12">
        <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5 hover:text-primary">
            <Link href="/top-rated">Shop Top Rated</Link>
        </Button>
      </div>
    </section>
  );
}
