
import { ProductCard } from '@/components/ProductCard';
import { plantData } from '@/lib/data';

const plantRatings: { [key:string]: { rating: number, reviews: number } } = {
    '30': { rating: 5, reviews: 18 },
    '31': { rating: 5, reviews: 7 },
    '36': { rating: 4, reviews: 22 },
    '37': { rating: 5, reviews: 9 },
};

export default function PaintingsPage() {
  const paintingIds = ['30', '31', '36', '37'];
  const paintings = plantData.filter(p => paintingIds.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Paintings
        </h1>
        <p className="text-lg text-foreground/80 mt-2">
          Botanical and nature-inspired art.
        </p>
      </div>

      {paintings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {paintings.map((plant) => (
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
          <p>No paintings available at the moment. Please check back soon!</p>
        </div>
      )}
    </div>
  );
}
