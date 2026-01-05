
import { ProductCard } from '@/components/ProductCard';
import { plantData } from '@/lib/data';

const plantRatings: { [key: string]: { rating: number, reviews: number } } = {
    '28': { rating: 5, reviews: 41 },
    '29': { rating: 4, reviews: 102 },
    '34': { rating: 4, reviews: 88 },
    '35': { rating: 5, reviews: 150 },
};

export default function FishesPage() {
  const fishIds = ['28', '29', '34', '35'];
  const fishes = plantData.filter(p => fishIds.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Fishes
        </h1>
        <p className="text-lg text-foreground/80 mt-2">
          Vibrant aquatic life for your aquarium.
        </p>
      </div>

      {fishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {fishes.map((plant) => (
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
          <p>No fishes available at the moment. Please check back soon!</p>
        </div>
      )}
    </div>
  );
}
