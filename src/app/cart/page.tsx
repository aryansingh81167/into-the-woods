
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingCart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <ShoppingCart className="h-8 w-8 text-primary" />
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Your Cart
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <Card>
          <CardContent className="py-20 text-center">
            <p className="text-lg text-muted-foreground mb-4">Your cart is empty.</p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead className="w-[100px] hidden md:table-cell">Image</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="w-[50px] text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {cartItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="hidden md:table-cell">
                                    <Image
                                        src={item.images[0]}
                                        alt={item.name}
                                        width={64}
                                        height={64}
                                        className="rounded-md object-cover"
                                        data-ai-hint="house plant"
                                    />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <p className="hover:underline">{item.name}</p>
                                        <p className="text-sm text-muted-foreground md:hidden">{item.size}</p>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center">
                                            <Input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                                                className="h-9 w-16 text-center"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">Ð{(item.price * item.quantity).toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
             <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                </Button>
            </div>
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline text-primary">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Ð{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg text-primary">
                    <span>Total</span>
                    <span>Ð{getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                 <Button size="lg" className="w-full mt-6">
                    Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
