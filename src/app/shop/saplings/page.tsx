
import { plantData } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';

const plantRatings: { [key: string]: { rating: number, reviews: number } } = {
    '4': { rating: 4, reviews: 9 },
    '6': { rating: 4, reviews: 55 },
    '10': { rating: 4, reviews: 45 },
    '13': { rating: 5, reviews: 73 },
    '14': { rating: 4, reviews: 12 },
    '15': { rating: 5, reviews: 20 },
    '17': { rating: 4, reviews: 8 },
};


export default function SaplingsPage() {
  // For now, we'll filter for small plants to represent saplings.
  const saplings = plantData.filter(p => p.size === 'Small');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Saplings & Starters
        </h1>
        <p className="text-lg text-foreground/80 mt-2">
          Your journey into the world of plants starts here.
        </p>
      </div>

      {saplings.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {saplings.map((plant) => (
            <ProductCard 
              key={plant.id} 
              plant={plant} 
              rating={plantRatings[plant.id]?.rating || 4}
              reviews={plantRatings[plant.id]?.reviews || 5}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p>No saplings available at the moment. Please check back soon!</p>
        </div>
      )}
    </div>
  );
}
