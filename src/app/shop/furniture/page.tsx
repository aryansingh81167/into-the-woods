
import { ProductCard } from '@/components/ProductCard';
import { plantData } from '@/lib/data';

const plantRatings: { [key: string]: { rating: number, reviews: number } } = {
    '26': { rating: 5, reviews: 14 },
    '27': { rating: 4, reviews: 32 },
    '32': { rating: 5, reviews: 21 },
    '33': { rating: 5, reviews: 18 },
};

export default function FurniturePage() {
  const furnitureIds = ['26', '27', '32', '33'];
  const furniture = plantData.filter(p => furnitureIds.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Furniture
        </h1>
        <p className="text-lg text-foreground/80 mt-2">
          Stylish and sustainable furniture for your home and garden.
        </p>
      </div>

      {furniture.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {furniture.map((plant) => (
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
          <p>No furniture available at the moment. Please check back soon!</p>
        </div>
      )}
    </div>
  );
}
