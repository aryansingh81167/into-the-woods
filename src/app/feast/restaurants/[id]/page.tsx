
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Star, Utensils, Zap, Leaf } from 'lucide-react';
import { restaurants, type MenuItem } from '@/lib/feast-data';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useFeastCart } from '@/hooks/use-feast-cart';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function FeastRestaurantDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const restaurant = restaurants.find((r) => r.id === id);

  const { addToCart, updateQuantity, cartItems } = useFeastCart();

  if (!restaurant) {
    notFound();
  }

  const menuCategories = [...new Set(restaurant.menu.map(item => item.category))];
  
  const MenuItemCard = ({ item }: { item: MenuItem }) => {
    const itemInCart = cartItems.find(cartItem => cartItem.id === item.id);
    
    const handleAddToCart = () => {
        addToCart(item);
    }

    const handleIncrease = () => {
        if(itemInCart) {
            updateQuantity(item.id, itemInCart.quantity + 1);
        }
    }

    const handleDecrease = () => {
        if(itemInCart) {
            updateQuantity(item.id, itemInCart.quantity - 1);
        }
    }

    return (
        <div key={item.id} className="flex items-start gap-4 py-4">
            <div className="flex-grow">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-md font-bold text-primary mt-1">Ð{item.price.toFixed(2)}</p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <div className="relative w-28 h-24 rounded-md overflow-hidden border">
                    <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint="food item"/>
                </div>
                 {itemInCart ? (
                    <div className="flex items-center justify-center h-9 w-28">
                        <Button size="icon" variant="outline" className="h-full rounded-r-none" onClick={handleDecrease}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <div className="flex-1 text-center border-y text-md font-medium h-full flex items-center justify-center">
                            {itemInCart.quantity}
                        </div>
                        <Button size="icon" variant="outline" className="h-full rounded-l-none" onClick={handleIncrease}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <Button variant="outline" className="w-28" onClick={handleAddToCart}>
                        <Plus className="mr-2 h-4 w-4" /> Add
                    </Button>
                )}
            </div>
        </div>
    )
  }

  return (
    <div className="bg-background min-h-screen">
        <div className="container mx-auto max-w-lg px-4 py-8">
            <header className="mb-6">
                 <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-4">
                    <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                        data-ai-hint={restaurant.cuisine.split(',')[0]}
                    />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{restaurant.name}</h1>
                <p className="text-muted-foreground">{restaurant.cuisine}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-primary">{restaurant.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-muted-foreground">{restaurant.deliveryTime}</span>
                     <span className="text-muted-foreground">{restaurant.distance}</span>
                </div>
                {restaurant.offer && (
                    <Badge className="mt-2 bg-destructive text-destructive-foreground">{restaurant.offer}</Badge>
                )}
            </header>

            <Separator className="my-6" />

            <main>
                <h2 className="text-2xl font-bold font-headline text-primary mb-4">Menu</h2>
                <Accordion type="multiple" defaultValue={menuCategories} className="w-full">
                {menuCategories.map(category => (
                    <AccordionItem value={category} key={category}>
                        <AccordionTrigger className="text-lg font-semibold">{category}</AccordionTrigger>
                        <AccordionContent>
                           <div className="divide-y">
                             {restaurant.menu.filter(item => item.category === category).map(item => (
                                <MenuItemCard key={item.id} item={item} />
                            ))}
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </main>
        </div>
    </div>
  );
}
