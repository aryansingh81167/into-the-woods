
import { plantData } from '@/lib/data';
import { ProductCard } from './ProductCard';

const beginnerPlantIds = ['2', '5', '12', '13', '4'];

const beginnerPlantData = plantData.filter(p => beginnerPlantIds.includes(p.id));

const plantBadges: { [key: string]: string } = {
  '2': 'Near-unkillable',
  '5': 'Near-unkillable',
};

const plantRatings: { [key: string]: { rating: number, reviews: number } } = {
    '2': { rating: 5, reviews: 71 },
    '4': { rating: 4, reviews: 9 },
    '5': { rating: 5, reviews: 93 },
    '12': { rating: 5, reviews: 14 },
    '13': { rating: 5, reviews: 73 },
};

export function ForBeginners() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">For Beginners</h2>
            <p className="text-lg text-muted-foreground mt-2">
                New to plants and need to build your confidence? Start here.
            </p>
        </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10">
        {beginnerPlantData.map((plant) => (
          <ProductCard 
            key={plant.id} 
            plant={plant} 
            badge={plantBadges[plant.id]} 
            rating={plantRatings[plant.id]?.rating || 5}
            reviews={plantRatings[plant.id]?.reviews || 0}
          />
        ))}
      </div>
      </div>
    </section>
  );
}
