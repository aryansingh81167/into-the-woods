
'use client';

import Image from 'next/image';
import { plantData } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Trash2, Award } from 'lucide-react';
import Link from 'next/link';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { signOut } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  displayName: string;
  email: string;
  photoURL: string;
  inquePoints?: number;
  role?: 'user' | 'vendor' | 'admin';
  vendorStatus?: 'pending' | 'approved' | 'disabled';
}

export default function ProfilePage() {
  const { user, isUserLoading, firestore, auth } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [isRequestingVendor, setIsRequestingVendor] = useState(false);

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);


  useEffect(() => {
    if (isUserLoading) {
      return; 
    }
    if (!user) {
      router.replace('/login');
    }
  }, [user, isUserLoading, router]);

  const handleBecomeAdmin = async () => {
    if (!userDocRef) return;
    setIsUpdatingRole(true);
    try {
        await updateDoc(userDocRef, { role: 'admin' });
        toast({
            title: "Success!",
            description: "You have been granted admin privileges. You can now access the admin panel.",
        });
    } catch(error: any) {
        toast({
            variant: 'destructive',
            title: "Role update failed",
            description: "You might not have permission to perform this action. Check Firestore rules.",
        });
    } finally {
        setIsUpdatingRole(false);
    }
  };
  
  const handleBecomeVendor = async () => {
    if (!userDocRef) return;
    setIsRequestingVendor(true);
    try {
        await updateDoc(userDocRef, { 
            role: 'vendor',
            vendorStatus: 'pending' 
        });
        toast({
            title: "Request Submitted!",
            description: "Your request to become a vendor is pending admin approval.",
        });
    } catch(error: any) {
        toast({
            variant: 'destructive',
            title: "Request Failed",
            description: "Could not submit vendor request. Please try again.",
        });
    } finally {
        setIsRequestingVendor(false);
    }
  };


  if (isUserLoading || isProfileLoading || !user) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  
  const userListings = plantData.filter(p => p.seller.name === user.displayName);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
      <header className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-6 mb-10">
        <Avatar className="h-24 w-24 border-4 border-card">
          {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
          <AvatarFallback>{user.displayName ? user.displayName.charAt(0) : 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-4 justify-center md:justify-start">
             <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">{user.displayName || 'Welcome!'}</h1>
             {userProfile?.role && <Badge>{userProfile.role}</Badge>}
             {userProfile?.vendorStatus && <Badge variant="secondary">{userProfile.vendorStatus}</Badge>}
          </div>
          <p className="text-muted-foreground mt-1">Joined in {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '2024'}</p>
           <Card className="mt-4 max-w-xs mx-auto md:mx-0">
            <CardContent className="p-3 flex items-center gap-4">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <p className="font-bold text-xl text-primary">{userProfile?.inquePoints?.toFixed(0) || 0}</p>
                <p className="text-sm font-semibold text-muted-foreground">INQUE Points</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Button variant="outline" onClick={() => signOut(auth).then(() => router.push('/'))}>Log Out</Button>
      </header>

      {userProfile?.role === 'user' && (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Become a Seller</CardTitle>
                <CardDescription>Ready to sell your own plants and creations? Join our community of vendors.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleBecomeVendor} disabled={isRequestingVendor}>
                    {isRequestingVendor && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Request to Become a Vendor
                </Button>
                 <p className="text-xs text-muted-foreground mt-2">Your request will be sent to an admin for approval.</p>
            </CardContent>
        </Card>
      )}

      {userProfile?.role !== 'admin' && (
        <Card className="mb-8 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
            <CardHeader>
                <CardTitle className="text-amber-800 dark:text-amber-300">Become an Administrator (Test Only)</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-amber-700 dark:text-amber-400 mb-4">Click the button below to grant yourself admin privileges for testing purposes.</p>
                <Button 
                    onClick={handleBecomeAdmin} 
                    disabled={isUpdatingRole}
                    className="bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600"
                >
                    {isUpdatingRole && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Become an Admin
                </Button>
            </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 max-w-md mx-auto sm:mx-0 h-auto sm:h-10">
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="listings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-primary">Manage Your Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px] hidden sm:table-cell">Image</TableHead>
                      <TableHead>Plant</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden sm:table-cell">Stock</TableHead>
                      <TableHead className="hidden sm:table-cell">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userListings.map(plant => (
                      <TableRow key={plant.id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image src={plant.images[0]} alt={plant.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint="plant" />
                        </TableCell>
                        <TableCell className="font-medium">
                          <Link href={`/listings/${plant.id}`} className="hover:underline">{plant.name}</Link>
                        </TableCell>
                        <TableCell>Ð {plant.price.toFixed(2)}</TableCell>
                        <TableCell className="hidden sm:table-cell">{plant.stock}</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant={plant.stock > 0 ? 'default' : 'destructive'} className={plant.stock > 0 ? 'bg-green-600' : ''}>
                            {plant.stock > 0 ? 'Active' : 'Sold Out'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {userListings.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    <p>You haven't listed any plants yet.</p>
                    <Button asChild className="mt-4">
                        <Link href="/sell">Create a Listing</Link>
                    </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="mt-6">
          <Card>
             <CardHeader>
              <CardTitle className="font-headline text-primary">Your Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-20 text-muted-foreground">
                    <p>No orders found.</p>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="favorites" className="mt-6">
          <Card>
             <CardHeader>
              <CardTitle className="font-headline text-primary">Favorite Plants</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-20 text-muted-foreground">
                    <p>You have no favorite plants yet.</p>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    