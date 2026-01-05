
import { ProductCard } from '@/components/ProductCard';
import { plantData } from '@/lib/data';

const plantRatings: { [key: string]: { rating: number, reviews: number } } = {
    '22': { rating: 5, reviews: 10 },
    '23': { rating: 4, reviews: 7 },
    '24': { rating: 5, reviews: 15 },
    '25': { rating: 4, reviews: 12 },
};

export default function SculpturesPage() {
  const sculptureIds = ['22', '23', '24', '25'];
  const sculptures = plantData.filter(p => sculptureIds.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Sculptures
        </h1>
        <p className="text-lg text-foreground/80 mt-2">
          Artistic pieces to complement your green space.
        </p>
      </div>

      {sculptures.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {sculptures.map((plant) => (
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
          <p>No sculptures available at the moment. Please check back soon!</p>
        </div>
      )}
    </div>
  );
}
