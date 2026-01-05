
import { ProductCard } from '@/components/ProductCard';
import { plantData } from '@/lib/data';

const plantRatings: { [key: string]: { rating: number, reviews: number } } = {
    '18': { rating: 5, reviews: 25 },
    '19': { rating: 4, reviews: 15 },
    '20': { rating: 4, reviews: 22 },
    '21': { rating: 5, reviews: 30 },
};

export default function TerrariumPage() {
  const terrariumPlantIds = ['18', '19', '20', '21'];
  const terrariumPlants = plantData.filter(p => terrariumPlantIds.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Terrarium Plants
        </h1>
        <p className="text-lg text-foreground/80 mt-2">
          Create your own miniature world.
        </p>
      </div>

      {terrariumPlants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {terrariumPlants.map((plant) => (
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
          <p>No terrarium plants available at the moment. Please check back soon!</p>
        </div>
      )}
    </div>
  );
}
