
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, CreditCard, MapPin, Apple, Check, Award } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useInqueCart } from '@/hooks/use-inque-cart';
import { useAuth } from '@/hooks/useAuth';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

interface UserProfile {
  inquePoints?: number;
}

export default function InqueCheckoutPage() {
    const { cartItems, getCartTotal, clearCart } = useInqueCart();
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
    
    useEffect(() => {
      // Redirect to cart if it's empty
      if (cartItems.length === 0) {
        router.replace('/inque/cart');
      }
    }, [cartItems, router]);

    const handlePlaceOrder = async () => {
        if (!user || !firestore) {
            // Handle not logged in case
            return;
        }

        const pointsChange = pointsToEarn - pointsToUse;
        
        // Update points in Firestore
        const userRef = doc(firestore, 'users', user.uid);
        await updateDoc(userRef, {
            inquePoints: increment(pointsChange)
        }).catch(err => console.error("Failed to update points:", err));

        clearCart();
        router.push('/inque/order-tracking');
    }

    if (cartItems.length === 0) {
        return null;
    }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-lg px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
           <Link href="/inque/cart" className="text-primary">
             <CheckCircle className="h-7 w-7" />
          </Link>
          <h1 className="text-3xl font-bold font-headline text-primary">Checkout</h1>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2"><MapPin className="h-5 w-5" /> Delivery Address</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-4 rounded-lg bg-muted/50 border">
                        <p className="font-semibold">Home</p>
                        <p className="text-sm text-muted-foreground">123 Green Leaf Lane, The Springs, Dubai</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2"><CreditCard className="h-5 w-5" /> Payment</CardTitle>
                </CardHeader>
                <CardContent>
                    <RadioGroup defaultValue="card" className="space-y-4">
                        <Label htmlFor="card" className="flex items-center gap-4 p-4 rounded-lg border has-[:checked]:border-primary has-[:checked]:bg-primary/5 cursor-pointer">
                            <RadioGroupItem value="card" id="card" />
                            <CreditCard className="h-6 w-6 text-primary" />
                            <div className="flex-grow">
                                <p className="font-semibold">Credit/Debit Card</p>
                                <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard...</p>
                            </div>
                        </Label>
                         <Label htmlFor="applepay" className="flex items-center gap-4 p-4 rounded-lg border has-[:checked]:border-primary has-[:checked]:bg-primary/5 cursor-pointer">
                            <RadioGroupItem value="applepay" id="applepay" />
                            <Apple className="h-6 w-6 text-primary" />
                             <div className="flex-grow">
                                <p className="font-semibold">Apple Pay</p>
                                <p className="text-sm text-muted-foreground">Pay securely with your device.</p>
                            </div>
                        </Label>
                    </RadioGroup>
                </CardContent>
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
                        <span>Ð{deliveryFee.toFixed(2)}</span>
                    </div>

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
                        <span>Total to Pay</span>
                        <span>Ð{total.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handlePlaceOrder} size="lg" className="w-full text-lg h-14 bg-primary hover:bg-primary/90">
                        <Check className="mr-2 h-6 w-6"/>
                        Place Order
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
