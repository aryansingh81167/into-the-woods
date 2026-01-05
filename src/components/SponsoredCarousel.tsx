
'use client';

import * as React from 'react';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Logo } from './Logo';

const sponsoredData = {
  flash: [
    {
      title: "Christmas Specials",
      subtitle: "Festive Treats & Gourmet Gifts",
      items: [
        { name: 'Festive Cookie Box', image: 'https://images.unsplash.com/photo-1610897799366-318af40adad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxmZXN0aXZlJTIwY29va2llJTIwYm94fGVufDB8fHx8MTc2NTU0NTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080', discount: 'SAVE 15%', href: '#', hint: 'christmas cookies'},
        { name: 'Italian Panettone', image: 'https://images.unsplash.com/photo-1609501885825-c286bf8010e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwYW5ldHRvbmV8ZW58MHx8fHwxNzY1NTQ1NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080', discount: '25% OFF', href: '#', hint: 'panettone'},
        { name: 'Gourmet Hot Chocolate', image: 'https://images.unsplash.com/photo-1607196707151-2db8b71294ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxob3QlMjBjaG9jb2xhdGV8ZW58MHx8fHwxNzY1NTQ2NjMwfDA&ixlib=rb-4.1.0&q=80&w=1080', discount: 'SAVE Ð15', href: '#', hint: 'hot chocolate'},
        { name: 'Spiced Nut Selection', image: 'https://images.unsplash.com/photo-1621926037410-5c727521e695?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzcGljZWQlMjBudXR8ZW58MHx8fHwxNzY1NTQ2NzAxfDA&ixlib=rb-4.1.0&q=80&w=1080', discount: 'BOGO 50% OFF', href: '#', hint: 'spiced nuts'},
      ],
    },
     {
      title: "Fresh & Fast",
      subtitle: "Groceries delivered in minutes",
      items: [
        { name: 'Organic Avocados', image: 'https://picsum.photos/seed/avocado-deal/200/200', discount: '2 for Ð15', href: '#', hint: 'avocado' },
        { name: 'Fresh Berries', image: 'https://picsum.photos/seed/berries-deal/200/200', discount: 'SAVE 20%', href: '#', hint: 'berries' },
        { name: 'Artisan Bread', image: 'https://picsum.photos/seed/bread-deal/200/200', discount: 'Freshly Baked', href: '#', hint: 'artisan bread' },
        { name: 'Free-Range Eggs', image: 'https://picsum.photos/seed/eggs-deal/200/200', discount: 'Ð18/dozen', href: '#', hint: 'eggs' },
      ],
    },
  ],
  feast: [
    {
      title: "Weekend Pizza Deals",
      subtitle: "Buy one get one free on all large pizzas",
      items: [
        { name: 'Pepperoni Pizza', image: 'https://picsum.photos/seed/pepperoni-pizza-deal/200/200', discount: 'BOGO', href: '#', hint: 'pepperoni pizza' },
        { name: 'Veggie Supreme', image: 'https://picsum.photos/seed/veggie-pizza-deal/200/200', discount: 'BOGO', href: '#', hint: 'veggie pizza' },
        { name: 'Margherita', image: 'https://picsum.photos/seed/margherita-pizza-deal/200/200', discount: 'BOGO', href: '#', hint: 'margherita pizza' },
        { name: 'BBQ Chicken', image: 'https://picsum.photos/seed/bbq-chicken-pizza-deal/200/200', discount: 'BOGO', href: '#', hint: 'bbq pizza' },
      ],
    },
     {
      title: "Burger Bonanza",
      subtitle: "Get a free side of fries with any burger",
      items: [
        { name: 'Classic Cheeseburger', image: 'https://picsum.photos/seed/cheeseburger-deal/200/200', discount: 'Free Fries', href: '#', hint: 'cheeseburger' },
        { name: 'Spicy Chicken Burger', image: 'https://picsum.photos/seed/spicy-chicken-deal/200/200', discount: 'Free Fries', href: '#', hint: 'chicken burger' },
        { name: 'Mushroom Swiss', image: 'https://picsum.photos/seed/mushroom-burger-deal/200/200', discount: 'Free Fries', href: '#', hint: 'mushroom burger' },
        { name: 'Veggie Burger', image: 'https://picsum.photos/seed/veggie-burger-deal/200/200', discount: 'Free Fries', href: '#', hint: 'veggie burger' },
      ],
    },
  ],
  volt: [
    {
      title: "Gaming Week",
      subtitle: "Up to 30% off on gaming accessories",
      items: [
        { name: 'Gaming Headset', image: 'https://picsum.photos/seed/gaming-headset-deal/200/200', discount: '30% OFF', href: '#', hint: 'gaming headset' },
        { name: 'RGB Keyboard', image: 'https://picsum.photos/seed/rgb-keyboard-deal/200/200', discount: '25% OFF', href: '#', hint: 'gaming keyboard' },
        { name: 'Wireless Mouse', image: 'https://picsum.photos/seed/gaming-mouse-deal/200/200', discount: '20% OFF', href: '#', hint: 'gaming mouse' },
        { name: 'Gaming Monitor', image: 'https://picsum.photos/seed/gaming-monitor-deal/200/200', discount: '15% OFF', href: '#', hint: 'gaming monitor' },
      ],
    },
    {
      title: "Work From Home Essentials",
      subtitle: "Upgrade your home office setup",
      items: [
        { name: '4K Webcam', image: 'https://picsum.photos/seed/webcam-deal/200/200', discount: 'SAVE Ð100', href: '#', hint: '4k webcam' },
        { name: 'Ergonomic Mouse', image: 'https://picsum.photos/seed/ergo-mouse-deal/200/200', discount: '20% OFF', href: '#', hint: 'ergonomic mouse' },
        { name: 'USB-C Hub', image: 'https://picsum.photos/seed/hub-deal/200/200', discount: '35% OFF', href: '#', hint: 'usb hub' },
        { name: 'Laptop Stand', image: 'https://picsum.photos/seed/laptop-stand-deal/200/200', discount: 'SAVE Ð50', href: '#', hint: 'laptop stand' },
      ],
    }
  ],
  space: [
    {
      title: "Decor Sale",
      subtitle: "Refresh your space with up to 40% off decor",
      items: [
        { name: 'Ceramic Vases', image: 'https://picsum.photos/seed/ceramic-vase-deal/200/200', discount: '40% OFF', href: '#', hint: 'ceramic vase' },
        { name: 'Wall Art', image: 'https://picsum.photos/seed/wall-art-abstract-deal/200/200', discount: '30% OFF', href: '#', hint: 'abstract art' },
        { name: 'Throw Pillows', image: 'https://picsum.photos/seed/throw-pillow-deal/200/200', discount: '25% OFF', href: '#', hint: 'cushion pillow' },
        { name: 'Area Rugs', image: 'https://picsum.photos/seed/area-rug-modern-deal/200/200', discount: '20% OFF', href: '#', hint: 'modern rug' },
      ],
    },
     {
      title: "New Arrivals",
      subtitle: "Discover the latest in home decor",
      items: [
        { name: 'Hanging Planters', image: 'https://picsum.photos/seed/hanging-planter-deal/200/200', discount: 'NEW', href: '#', hint: 'hanging planter' },
        { name: 'Wooden Sculptures', image: 'https://picsum.photos/seed/wood-sculpture-deal/200/200', discount: 'NEW', href: '#', hint: 'wood sculpture' },
        { name: 'Linen Throws', image: 'https://picsum.photos/seed/linen-throw-deal/200/200', discount: 'NEW', href: '#', hint: 'linen throw' },
        { name: 'Scented Candles', image: 'https://picsum.photos/seed/scented-candle-deal/200/200', discount: 'NEW', href: '#', hint: 'scented candle' },
      ],
    }
  ],
};

interface SponsoredCarouselProps {
  store: keyof typeof sponsoredData;
}

export function SponsoredCarousel({ store }: SponsoredCarouselProps) {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    const carouselSlides = sponsoredData[store] || [];

    if (carouselSlides.length === 0) {
      return null;
    }

  return (
    <section className="my-8">
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
                loop: true,
            }}
        >
            <CarouselContent>
            {carouselSlides.map((slide, index) => (
                <CarouselItem key={index}>
                    <div className="relative rounded-xl overflow-hidden bg-secondary text-secondary-foreground p-6 md:p-8">
                        <div 
                            className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-[0.03]"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
                        ></div>

                        <div className="relative">
                            <div className="mb-4">
                                <h2 className="text-3xl font-bold tracking-tight font-headline text-primary-foreground">{slide.title}</h2>
                                <p className="text-lg text-primary-foreground/70">{slide.subtitle}</p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {slide.items.map((item) => (
                                <Link href={item.href} key={item.name} className="group">
                                    <Card className="bg-secondary/60 border-secondary/80 overflow-hidden h-full flex flex-col hover:bg-secondary/80 transition-colors duration-300">
                                        <CardContent className="p-2 flex-grow flex flex-col justify-between">
                                            <div>
                                                <div className="relative aspect-square w-full my-1">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover rounded-md group-hover:scale-105 transition-transform"
                                                        data-ai-hint={item.hint}
                                                    />
                                                </div>
                                                <p className="text-sm font-bold truncate text-secondary-foreground mt-2">{item.name}</p>
                                            </div>
                                            <div className="bg-primary text-primary-foreground text-xs font-bold rounded-sm py-0.5 px-1 mt-1 w-fit">
                                                {item.discount}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                            </div>

                            <div className="flex items-center justify-end gap-1 mt-2 text-secondary-foreground/50">
                                <p className="text-[10px] font-light">Curated by</p>
                                <Image src="/inque-logo.svg" alt="INQUE" width={16} height={16} />
                                <p className="font-bold text-[10px]">INQUE</p>
                            </div>
                        </div>
                    </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-[-1.5rem]" />
            <CarouselNext className="hidden md:flex right-[-1.5rem]" />
        </Carousel>
    </section>
  );
}
