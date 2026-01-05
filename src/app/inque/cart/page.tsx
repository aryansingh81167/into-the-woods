
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingCart, Plus, Minus, MapPin, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useInqueCart } from '@/hooks/use-inque-cart';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface UserProfile {
  inquePoints?: number;
}

export default function InqueCartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useInqueCart();
  const router = useRouter();
  const { user } = useAuth();
  const { firestore } = useFirebase();
  const [applyPoints, setApplyPoints] = useState(false);

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile } = useDoc<UserProfile>(userDocRef);

  const deliveryFee = cartItems.length > 0 ? 5.00 : 0;
  const subtotal = getCartTotal();

  // New Points Logic
  const availablePoints = userProfile?.inquePoints || 0;
  const discountPercentage = applyPoints ? Math.min(availablePoints * 0.005, 1) : 0; // 0.5% per point, max 100%
  const pointsDiscount = subtotal * discountPercentage;
  const pointsToUse = applyPoints ? Math.floor(pointsDiscount / (subtotal * 0.005) || 1) : 0; // approximate points used
  const total = subtotal + deliveryFee - pointsDiscount;
  const pointsToEarn = Math.floor((subtotal + deliveryFee) / 20); // 1 point per 20 dirhams

  const handleIncrease = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrease = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity - 1); // The hook handles removal if quantity < 1
  };

  const handleCheckout = () => {
    if(cartItems.length > 0) {
      router.push('/inque/checkout');
    }
  }


  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-lg px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="text-primary">
             <ShoppingCart className="h-7 w-7" />
          </Link>
          <h1 className="text-3xl font-bold font-headline text-primary">Your Quick Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="py-20 text-center">
              <p className="text-lg text-muted-foreground mb-4">Your INQUE cart is empty.</p>
              <Button asChild>
                <Link href="/">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-grow">
                        <p className="font-semibold">Home</p>
                        <p className="text-sm text-muted-foreground">123 Green Leaf Lane, The Springs, Dubai</p>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                </div>
              </CardContent>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Order Items</CardTitle>
                </CardHeader>
              <CardContent className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="rounded-md object-cover border"
                      data-ai-hint="grocery product"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.weight}</p>
                      <p className="text-md font-bold text-primary mt-1">Ð{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleDecrease(item.id, item.quantity)}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-bold w-5 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleIncrease(item.id, item.quantity)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                     <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
               <CardFooter>
                  <Button variant="outline" size="sm" onClick={clearCart}>Clear Cart</Button>
               </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
                </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>Ð{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                   <Badge variant="secondary">Ð{deliveryFee.toFixed(2)}</Badge>
                </div>
                {pointsToEarn > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Points to Earn</span>
                        <span><Award className="inline h-4 w-4 mr-1" />{pointsToEarn}</span>
                    </div>
                )}
                {userProfile && (userProfile.inquePoints || 0) > 0 && (
                  <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary"/>
                        <Label htmlFor="apply-points" className="font-semibold">
                          Apply {userProfile.inquePoints?.toFixed(0)} INQUE Points?
                        </Label>
                      </div>
                      <Switch
                        id="apply-points"
                        checked={applyPoints}
                        onCheckedChange={setApplyPoints}
                      />
                  </div>
                )}
                {applyPoints && pointsToUse > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                        <span>Points Discount ({pointsToUse} pts)</span>
                        <span>-Ð{pointsDiscount.toFixed(2)}</span>
                    </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg text-primary">
                  <span>Total</span>
                  <span>Ð{total.toFixed(2)}</span>
                </div>
                <Alert className="mt-4">
                  <AlertTitle className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Fastest Delivery
                  </AlertTitle>
                  <AlertDescription>
                    Your order will be delivered in an estimated <strong>10-15 minutes</strong>.
                  </AlertDescription>
                </Alert>
              </CardContent>
               <CardFooter>
                 <Button onClick={handleCheckout} size="lg" className="w-full text-lg h-12">
                    Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
