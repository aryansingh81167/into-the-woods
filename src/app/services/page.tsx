
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Train, Fish, Home, Sparkles, Leaf, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Mobile Recharge',
    description: 'Instantly top up your mobile credit for any carrier.',
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    href: '#',
  },
  {
    title: 'NOL Card Recharge',
    description: 'Quickly and easily recharge your public transport card in the UAE.',
    icon: <Train className="h-10 w-10 text-primary" />,
    href: '#',
  },
  {
    title: 'Aquarium Cleaning',
    description: 'Professional cleaning for your aquatic pets\' home.',
    icon: <Fish className="h-10 w-10 text-primary" />,
    href: '#',
  },
  {
    title: 'Household Chores',
    description: 'Get help with daily tasks like dishwashing and laundry.',
    icon: <Home className="h-10 w-10 text-primary" />,
    href: '#',
  },
  {
    title: 'Home Cleaning',
    description: 'Book professional cleaners for a spotless home.',
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    href: '#',
  },
  {
    title: 'Gardening',
    description: 'Expert care for your garden, big or small.',
    icon: <Leaf className="h-10 w-10 text-primary" />,
    href: '#',
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
          On-Demand Services
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          From daily chores to specialized care, book trusted professionals in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col text-center transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-2">
                {service.icon}
              </div>
              <CardTitle className="font-headline text-xl text-primary">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <Button asChild variant="outline">
                <Link href={service.href}>Book Now</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
