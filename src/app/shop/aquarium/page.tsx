
import { ProductCard } from '@/components/ProductCard';
import { plantData } from '@/lib/data';

const plantRatings: { [key: string]: { rating: number, reviews: number } } = {
    '14': { rating: 4, reviews: 12 },
    '15': { rating: 5, reviews: 20 },
    '16': { rating: 4, reviews: 18 },
    '17': { rating: 4, reviews: 8 },
};

export default function AquariumPage() {
  const aquariumPlantIds = ['14', '15', '16', '17'];
  const aquariumPlants = plantData.filter(p => aquariumPlantIds.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Aquarium Plants
        </h1>
        <p className="text-lg text-foreground/80 mt-2">
          Bring your underwater world to life.
        </p>
      </div>

      {aquariumPlants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {aquariumPlants.map((plant) => (
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
          <p>No aquarium plants available at the moment. Please check back soon!</p>
        </div>
      )}
    </div>
  );
}
