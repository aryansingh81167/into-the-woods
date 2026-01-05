
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Star, ChevronDown, Utensils, Compass, UtensilsCrossed, Tag, History, Plus, Award } from 'lucide-react';
import { feastCategories, restaurants, popularBurgers, popularPizzas, popularIndian, popularChinese, popularHealthy, popularRolls, popularHomeCooked, popularChicken, type MenuItem, type Restaurant } from '@/lib/feast-data';
import { Badge } from '@/components/ui/badge';
import { useFeastCart } from '@/hooks/use-feast-cart';
import { SponsoredCarousel } from '@/components/SponsoredCarousel';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';


const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <Link href={`/feast/restaurants/${restaurant.id}`} className="block group mb-6">
            <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <div className="relative aspect-[16/9] w-full">
                    <Image 
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={restaurant.cuisine.split(',')[0]}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-2xl font-extrabold drop-shadow-md">{restaurant.name}</h3>
                        <p className="text-sm font-semibold drop-shadow-md">{restaurant.cuisine}</p>
                    </div>
                    {restaurant.offer && (
                        <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">{restaurant.offer}</Badge>
                    )}
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 text-white text-xs font-bold p-1 rounded-md">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{restaurant.rating.toFixed(1)}</span>
                    </div>
                </div>
                <CardContent className="p-3">
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>{restaurant.distance}</span>
                        <span>{restaurant.deliveryTime}</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

const FoodItemCard = ({ item }: { item: MenuItem }) => {
    const { addToCart } = useFeastCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(item);
    }

    return (
        <div className="w-56 flex-shrink-0">
             <Link href={`/feast/restaurants/${item.restaurantId}`} className="group">
                <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-2">
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform" data-ai-hint="food item" />
                    <Button size="icon" variant="secondary" className="absolute bottom-2 right-2 h-8 w-8 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleAddToCart}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                <p className="text-xs text-muted-foreground truncate">by {item.restaurantName}</p>
                <p className="font-bold text-primary mt-1">Ð{item.price.toFixed(2)}</p>
            </Link>
        </div>
    );
}

const FoodCategorySection = ({ title, items, id }: { title: string, items: MenuItem[], id: string }) => (
    <section id={id} className="my-10 scroll-mt-24">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
         <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-4 pb-4">
                {items.map(item => (
                    <FoodItemCard key={item.id} item={item} />
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    </section>
);


export default function FeastPage() {
  const [sortOption, setSortOption] = useState('relevance');
  const [filters, setFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  }

  const sortedAndFilteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply filters
    filters.forEach(filter => {
      switch (filter) {
        case 'fast-delivery':
          filtered = filtered.filter(r => parseInt(r.deliveryTime) <= 25);
          break;
        case 'great-offers':
          filtered = filtered.filter(r => !!r.offer);
          break;
        case 'rating-4+':
          filtered = filtered.filter(r => r.rating >= 4.0);
          break;
        default:
          break;
      }
    });

    // Apply sorting
    switch (sortOption) {
      case 'rating':
        return filtered.sort((a, b) => b.rating - a.rating);
      case 'delivery-time':
        return filtered.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
      case 'relevance':
      default:
        return filtered;
    }
  }, [restaurants, sortOption, filters]);

  return (
    <div className="bg-muted/20 min-h-screen">
        <header className="sticky top-[150px] z-30 bg-card/80 backdrop-blur-lg border-b">
             <div className="container mx-auto max-w-6xl p-4">
                <div className="mx-auto w-fit p-1 rounded-full bg-muted flex items-center">
                    <Button
                        variant="ghost"
                        className="rounded-full px-8 bg-background text-foreground shadow-sm"
                    >
                        Delivery
                    </Button>
                    <Button
                        variant="ghost"
                        className="rounded-full px-8 text-muted-foreground"
                    >
                        Self Pickup
                    </Button>
                </div>
            </div>
        </header>

      <main className="container mx-auto max-w-6xl p-4">

        <SponsoredCarousel store="feast" />
        
        {/* Category Grid */}
        <section className="my-6">
            <h2 className="text-2xl font-bold mb-4">Eat what makes you happy</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
                {feastCategories.map((category) => (
                    <Link href={`#${category.id}`} key={category.name} className="flex flex-col items-center text-center group">
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2">
                           <Image src={category.image} alt={category.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={category.name} />
                        </div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary">{category.name}</p>
                    </Link>
                ))}
            </div>
        </section>

        {/* Filter Buttons */}
        <ScrollArea className="w-full whitespace-nowrap my-6">
            <div className="flex gap-2 pb-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-lg border-dashed">
                      Sort <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
                      <DropdownMenuRadioItem value="relevance">Relevance</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="rating">Rating (High to Low)</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="delivery-time">Delivery Time (Fastest)</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant={filters.includes('fast-delivery') ? 'default' : 'outline'} className="rounded-lg" onClick={() => toggleFilter('fast-delivery')}>
                  Fast Delivery
                </Button>
                <Button variant={filters.includes('great-offers') ? 'default' : 'outline'} className="rounded-lg" onClick={() => toggleFilter('great-offers')}>
                  Great Offers
                </Button>
                <Button variant={filters.includes('rating-4+') ? 'default' : 'outline'} className="rounded-lg" onClick={() => toggleFilter('rating-4+')}>
                  Rating 4.0+
                </Button>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
        
        {/* Restaurant List */}
        <section>
             <h2 className="text-2xl font-bold mb-4">Restaurants to explore</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sortedAndFilteredRestaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
             </div>
        </section>
        
        {/* Food Sections */}
        <FoodCategorySection id="healthy" title="Healthy Choices" items={popularHealthy} />
        <FoodCategorySection id="pizza" title="Pizza Picks" items={popularPizzas} />
        <FoodCategorySection id="burger" title="Top Rated Burgers" items={popularBurgers} />
        <FoodCategorySection id="rolls" title="Delicious Rolls" items={popularRolls} />
        <FoodCategorySection id="chinese" title="Chinese Cuisine" items={popularChinese} />
        <FoodCategorySection id="home-cooked" title="Home Cooked Meals" items={popularHomeCooked} />
        <FoodCategorySection id="chicken" title="Chicken Delights" items={popularChicken} />
        <FoodCategorySection id="indian" title="Indian Favorites" items={popularIndian} />

      </main>

       {/* Bottom Navigation */}
      <footer className="sticky bottom-0 z-30 bg-card border-t md:hidden">
        <div className="container mx-auto max-w-lg grid grid-cols-5">
            <Link href="/feast" className="flex flex-col items-center justify-center p-2 text-primary">
                <UtensilsCrossed className="h-6 w-6" />
                <span className="text-xs font-semibold">Feast</span>
            </Link>
            <Link href="#" className="flex flex-col items-center justify-center p-2 text-muted-foreground">
                <Compass className="h-6 w-6" />
                <span className="text-xs">Explore</span>
            </Link>
            <Link href="/feast/cart" className="flex flex-col items-center justify-center p-2 text-muted-foreground">
                <Utensils className="h-6 w-6" />
                <span className="text-xs">Cart</span>
            </Link>
            <Link href="#" className="flex flex-col items-center justify-center p-2 text-muted-foreground">
                <Tag className="h-6 w-6" />
                <span className="text-xs">Offers</span>
            </Link>
             <Link href="#" className="flex flex-col items-center justify-center p-2 text-muted-foreground">
                <History className="h-6 w-6" />
                <span className="text-xs">History</span>
            </Link>
        </div>
      </footer>
    </div>
  );
}

    