
'use client';

import { useState } from 'react';
import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query, where, doc, updateDoc } from 'firebase/firestore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { Plant } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

type ProductStatus = 'pending' | 'approved' | 'rejected';

const statusColors: Record<ProductStatus, string> = {
    pending: 'bg-yellow-500',
    approved: 'bg-green-500',
    rejected: 'bg-red-500',
}

const ProductTable = ({ status }: { status: ProductStatus }) => {
    const { firestore } = useFirebase();
    const { toast } = useToast();

    const productsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'plantListings'), where('status', '==', status));
    }, [firestore, status]);

    const { data: products, isLoading } = useCollection<Plant>(productsQuery);

    const handleUpdateStatus = async (id: string, newStatus: ProductStatus) => {
        if (!firestore) return;
        const productRef = doc(firestore, 'plantListings', id);
        try {
            await updateDoc(productRef, { status: newStatus });
            toast({
                title: 'Success',
                description: `Product has been ${newStatus}.`
            })
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error updating status',
                description: error.message,
            })
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }
    
    if (!products || products.length === 0) {
        return <p className="p-8 text-center text-muted-foreground">No {status} products found.</p>
    }

    return (
         <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="flex items-center gap-4">
                                {product.images && product.images.length > 0 && 
                                    <Image src={product.images[0]} alt={product.name} width={40} height={40} className="rounded-md object-cover" />
                                }
                                <span className="font-medium">{product.name}</span>
                            </TableCell>
                             <TableCell>{product.seller.name}</TableCell>
                            <TableCell>Ð{product.price.toFixed(2)}</TableCell>
                            <TableCell>
                                <Badge className={statusColors[product.status as ProductStatus]}>{product.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {status === 'pending' && (
                                    <div className="flex gap-2 justify-end">
                                        <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700" onClick={() => handleUpdateStatus(product.id, 'approved')}>
                                            <CheckCircle className="mr-2 h-4 w-4" /> Approve
                                        </Button>
                                        <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-100 hover:text-red-700" onClick={() => handleUpdateStatus(product.id, 'rejected')}>
                                            <XCircle className="mr-2 h-4 w-4" /> Reject
                                        </Button>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
         </div>
    )
}


export default function AdminProductsPage() {
    
  return (
    <div>
      <h1 className="text-4xl font-bold font-headline text-primary mb-8">Product Moderation</h1>
        <Tabs defaultValue="pending" className="w-full">
            <TabsList>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <Card className="mt-4">
                <CardContent className="p-0">
                    <TabsContent value="pending" className="m-0">
                        <ProductTable status="pending" />
                    </TabsContent>
                    <TabsContent value="approved" className="m-0">
                        <ProductTable status="approved" />
                    </TabsContent>
                    <TabsContent value="rejected" className="m-0">
                        <ProductTable status="rejected" />
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    </div>
  );
}
