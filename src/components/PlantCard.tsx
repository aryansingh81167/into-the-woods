
import Link from 'next/link';
import Image from 'next/image';
import type { Plant } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PlantCardProps {
  plant: Plant;
}

export function PlantCard({ plant }: PlantCardProps) {
  return (
    <Link href={`/listings/${plant.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
        <div className="overflow-hidden">
          <div className="aspect-[3/2] relative">
            <Image
              src={plant.images[0]}
              alt={plant.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="house plant"
            />
          </div>
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <h3 className="text-xl font-headline font-semibold text-primary mb-1 truncate">
            {plant.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 truncate">{plant.description}</p>
          <div className="mt-auto flex items-center justify-between">
            <p className="text-lg font-bold font-body text-primary">
              Ð {plant.price.toFixed(2)}
            </p>
            <Badge variant="secondary">{plant.size}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
