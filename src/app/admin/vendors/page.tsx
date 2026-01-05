'use client';

import { useCollection, useFirebase, useMemoFirebase } from '@/firebase';
import { collection, query, where, doc, updateDoc } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type VendorStatus = 'pending' | 'approved' | 'disabled';

interface VendorUser {
    id: string; // Add id to the interface
    vendorStatus: VendorStatus;
    role: 'vendor';
    photoURL?: string | null;
    displayName?: string | null;
    email?: string | null;
}

export default function AdminVendorsPage() {
    const { firestore } = useFirebase();
    const { toast } = useToast();

    const vendorsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'users'), where('role', '==', 'vendor'));
    }, [firestore]);

    const { data: vendors, isLoading } = useCollection<VendorUser>(vendorsQuery);

    const handleUpdateStatus = async (id: string, newStatus: VendorStatus) => {
        if (!firestore) return;
        const vendorRef = doc(firestore, 'users', id);
        try {
            await updateDoc(vendorRef, { vendorStatus: newStatus });
            toast({
                title: 'Success',
                description: `Vendor has been ${newStatus}.`
            })
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error updating status',
                description: error.message,
            })
        }
    };
    
    return (
        <div>
            <h1 className="text-4xl font-bold font-headline text-primary mb-8">Vendor Management</h1>
            <Card>
                <CardContent className="p-0">
                    {isLoading ? (
                         <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
                    ) : (
                         <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vendors?.map(vendor => (
                                        <TableRow key={vendor.id}>
                                            <TableCell className="flex items-center gap-4">
                                                <Avatar>
                                                    <AvatarImage src={vendor.photoURL || ''} />
                                                    <AvatarFallback>{vendor.displayName?.[0] || 'V'}</AvatarFallback>
                                                </Avatar>
                                                <span>{vendor.displayName}</span>
                                            </TableCell>
                                            <TableCell>{vendor.email}</TableCell>
                                            <TableCell>
                                                <Badge variant={vendor.vendorStatus === 'approved' ? 'default' : 'secondary'}>{vendor.vendorStatus}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {vendor.vendorStatus === 'pending' && (
                                                    <Button size="sm" onClick={() => handleUpdateStatus(vendor.id, 'approved')}>Approve</Button>
                                                )}
                                                {vendor.vendorStatus === 'approved' && (
                                                    <Button size="sm" variant="destructive" onClick={() => handleUpdateStatus(vendor.id, 'disabled')}>Disable</Button>
                                                )}
                                                {vendor.vendorStatus === 'disabled' && (
                                                    <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(vendor.id, 'approved')}>Re-enable</Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                         </div>
                    )}
                     {(!vendors || vendors.length === 0) && !isLoading && (
                        <p className="p-8 text-center text-muted-foreground">No vendors found.</p>
                     )}
                </CardContent>
            </Card>
        </div>
    )
}
