
'use client';

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { plantData } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, ShoppingCart, Sun, Snowflake, Leaf } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/hooks/use-cart';


export default function ListingDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const plant = plantData.find((p) => p.id === id);
  const { addToCart } = useCart();

  if (!plant) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={plant.images[0]}
              alt={plant.name}
              fill
              className="object-cover"
              data-ai-hint="house plant"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {plant.images.slice(1, 5).map((img, index) => (
              <div key={index} className="aspect-square relative w-full overflow-hidden rounded-md border-2 border-transparent hover:border-primary transition">
                <Image
                  src={img}
                  alt={`${plant.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                   data-ai-hint="plant leaf"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Plant Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline text-primary mb-2">{plant.name}</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">{plant.species}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="text-sm py-1 px-3">Size: {plant.size}</Badge>
            <Badge variant="secondary" className="text-sm py-1 px-3">Condition: {plant.condition}</Badge>
            <Badge variant="outline" className="text-sm py-1 px-3">{plant.stock} in stock</Badge>
          </div>

          <p className="text-3xl md:text-4xl font-bold font-body text-primary mb-6">Ð {plant.price.toFixed(2)}</p>

          <Card className="bg-primary/5 mb-6">
            <CardContent className="p-4">
              <h3 className="font-headline text-lg font-semibold mb-2 text-primary">Description</h3>
              <p className="text-foreground/80 leading-relaxed">{plant.description}</p>
            </CardContent>
          </Card>

          <div className="mt-auto space-y-4 pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full text-lg h-12" onClick={() => addToCart(plant)}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="h-12 w-full sm:w-auto">
                 <Heart className="h-5 w-5" />
              </Button>
            </div>
             <Separator />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                     <Avatar>
                        <AvatarImage src={plant.seller.avatar} alt={plant.seller.name} />
                        <AvatarFallback>{plant.seller.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm text-muted-foreground">Seller</p>
                        <p className="font-semibold text-primary">{plant.seller.name}</p>
                    </div>
                </div>
                <Button variant="ghost" className="w-full sm:w-auto">
                    <MessageCircle className="mr-2 h-5 w-5"/> Message Seller
                </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Care Instructions Tabs */}
      <div className="mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-headline font-bold text-center mb-8 text-primary">How to Care for Your {plant.name}</h2>
        <Tabs defaultValue="summer" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 max-w-lg mx-auto h-auto sm:h-10">
                <TabsTrigger value="summer"><Sun className="mr-2 h-4 w-4"/>Summer</TabsTrigger>
                <TabsTrigger value="winter"><Snowflake className="mr-2 h-4 w-4"/>Winter</TabsTrigger>
                <TabsTrigger value="growing-season"><Leaf className="mr-2 h-4 w-4"/>Growing Season</TabsTrigger>
            </TabsList>
            <TabsContent value="summer" className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">Summer Care</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-foreground/90">
                        <p>During summer, your {plant.name} enjoys bright, indirect light. Water it thoroughly once the top 2 inches of soil feel dry, typically every 1-2 weeks. Avoid overwatering.</p>
                        <p>This is the primary growing season, so you can fertilize it every 4-6 weeks with a balanced liquid fertilizer diluted to half-strength.</p>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="winter" className="mt-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">Winter Care</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-foreground/90">
                        <p>In winter, the {plant.name} goes into a dormant phase. Reduce watering frequency, allowing the soil to dry out more between waterings. This could be every 3-4 weeks.</p>
                        <p>Do not fertilize during this period. Keep it away from cold drafts and ensure it still gets adequate light, though it can tolerate lower light levels.</p>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="growing-season" className="mt-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-primary">Spring & Autumn Care</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-foreground/90">
                        <p>During the milder growing seasons of spring and autumn, your {plant.name} will be moderately active. Water it when the top inch of soil is dry.</p>
                        <p>You can begin to introduce fertilizer in the spring and reduce it in the autumn. This is also a good time to repot if the plant has become root-bound.</p>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </div>

    </div>
  );
}
