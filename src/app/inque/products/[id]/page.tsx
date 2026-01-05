
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Zap } from 'lucide-react';
import { InqueProductCard } from '@/components/InqueProductCard';
import { inqueProductData } from '@/lib/inque-data';
import Link from 'next/link';
import { useInqueCart } from '@/hooks/use-inque-cart';

export default function InqueProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const product = inqueProductData.find((p) => p.id === id);
  const similarItems = inqueProductData.filter(p => p.category === product?.category && p.id !== id).slice(0, 4);

  const { addToCart, updateQuantity, cartItems } = useInqueCart();
  const itemInCart = cartItems.find(item => item.id === product?.id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    notFound();
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };
  
  const handleCartIncrease = () => {
    if(itemInCart) {
        updateQuantity(itemInCart.id, itemInCart.quantity + 1);
    }
  }
  
  const handleCartDecrease = () => {
    if(itemInCart) {
        updateQuantity(itemInCart.id, itemInCart.quantity - 1);
    }
  }


  return (
    <div className="bg-background min-h-screen">
        <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Image */}
                <div className="space-y-4">
                <div className="aspect-square relative w-full overflow-hidden rounded-lg shadow-md border">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-4"
                        data-ai-hint="grocery product"
                    />
                </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                    <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-2">{product.title}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{product.weight}</p>
                    
                    <p className="text-sm text-foreground/80 leading-relaxed mb-6">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-3xl md:text-4xl font-bold font-body text-primary">Ð {product.price.toFixed(2)}</p>
                        {!itemInCart && (
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleDecreaseQuantity} disabled={quantity <= 1}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="font-bold text-lg w-6 text-center">{quantity}</span>
                                <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleIncreaseQuantity}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-green-600 font-semibold mb-6">
                        <Zap className="h-5 w-5" />
                        <span>Delivered in 10-15 minutes</span>
                    </div>

                    <div className="mt-auto space-y-4 pt-6">
                        {itemInCart ? (
                           <div className="flex items-center justify-center h-12">
                                <Button size="lg" variant="default" className="h-full rounded-r-none flex-1" onClick={handleCartDecrease}>
                                    <Minus className="h-5 w-5" />
                                </Button>
                                <div className="flex-1 text-center border-y text-lg font-medium h-full flex items-center justify-center border-primary">
                                    {itemInCart.quantity} in cart
                                d</div>
                                <Button size="lg" variant="default" className="h-full rounded-l-none flex-1" onClick={handleCartIncrease}>
                                    <Plus className="h-5 w-5" />
                                </Button>
                            </div>
                        ) : (
                             <Button size="lg" className="w-full text-lg h-12" onClick={handleAddToCart}>
                                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                            </Button>
                        )}
                    </div>
                </div>
            </div>

             {/* Similar Items */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold font-headline text-center mb-8 text-primary">You Might Also Like</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8">
                    {similarItems.map((item) => (
                       <InqueProductCard key={item.id} product={item} />
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Button variant="outline" asChild>
                        <Link href="/products">View All Products</Link>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
}
