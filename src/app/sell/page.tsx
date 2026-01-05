
'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2, Loader2, Info } from 'lucide-react';
import { productCategories } from '@/lib/categories';
import { useFirebase, useAuth, useDoc, useMemoFirebase } from '@/firebase';
import { doc, addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { fileToDataUri } from '@/lib/utils';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const productSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Product name is required.'),
    species: z.string().min(1, 'Species or item type is required.'),
    description: z.string().min(1, 'Description is required.'),
    price: z.preprocess(
      (a) => parseFloat(z.string().parse(a)),
      z.number().positive('Price must be a positive number.')
    ),
    category: z.string().min(1, 'Category is required.'),
    size: z.enum(['Small', 'Medium', 'Large']),
    condition: z.enum(['Excellent', 'Good', 'Fair']),
    stock: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().int().min(1, 'Stock must be at least 1.')
    ),
    images: z.any().refine(files => files?.length > 0, 'At least one product image is required.'),
});

const formSchema = z.object({
  products: z.array(productSchema).min(1, 'Please add at least one product.'),
});

type SellerFormData = z.infer<typeof formSchema>;

interface UserProfile {
  role?: 'admin' | 'vendor' | 'user';
  vendorStatus?: 'pending' | 'approved' | 'disabled';
}

export default function SellPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { firestore: db } = useFirebase();
  const { user, loading: isUserLoading } = useAuth();
  
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(
    useMemoFirebase(() => {
        if (!user || !db) return null;
        return doc(db, 'users', user.uid);
    }, [user, db])
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Correctly handle redirect in useEffect
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [isUserLoading, user, router]);

  const form = useForm<SellerFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      products: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const onSubmit = async (values: SellerFormData) => {
    if (!db || !user || userProfile?.role !== 'vendor') {
        toast({ variant: "destructive", title: "Error", description: "You are not an approved vendor." });
        return;
    }
    
    if (userProfile.vendorStatus !== 'approved') {
        toast({ variant: "destructive", title: "Account Not Approved", description: `Your vendor status is currently: ${userProfile.vendorStatus}. You cannot add products.` });
        return;
    }

    setIsSubmitting(true);

    try {
        const productPromises = values.products.map(async (product) => {
            const imageUrls: string[] = [];
            if (product.images && product.images.length > 0) {
                for (const file of Array.from(product.images as FileList)) {
                     const dataUri = await fileToDataUri(file);
                     imageUrls.push(dataUri);
                }
            }

            const productData = {
                ...product,
                images: imageUrls,
                sellerId: user.uid,
                seller: {
                    name: user.displayName,
                    avatar: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'V')}`,
                },
                createdAt: serverTimestamp(),
                status: 'pending', // All new products are pending approval
            };
            
            const productsCollection = collection(db, 'plantListings');
            return addDoc(productsCollection, productData).catch(serverError => {
                const permissionError = new FirestorePermissionError({
                    path: productsCollection.path,
                    operation: 'create',
                    requestResourceData: productData
                });
                errorEmitter.emit('permission-error', permissionError);
                throw permissionError;
            });
        });

        await Promise.all(productPromises);

        toast({
            title: 'Submission Successful!',
            description: "Your products have been submitted for admin review.",
        });

        router.push('/profile');

    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: error.message || "An unexpected error occurred.",
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleBecomeVendor = async () => {
    if (!user || !db) return;
    const userRef = doc(db, 'users', user.uid);
    try {
        await updateDoc(userRef, {
            role: 'vendor',
            vendorStatus: 'pending'
        });
        toast({
            title: 'Request Submitted!',
            description: 'Your request to become a vendor is pending admin approval.'
        });
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  }

  if (isUserLoading || isProfileLoading || !user) {
      return <div className="container mx-auto flex justify-center items-center h-96"><Loader2 className="h-10 w-10 animate-spin" /></div>
  }

  if (userProfile?.role !== 'vendor' && userProfile?.role !== 'admin') {
    return (
        <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl text-primary">Become a Vendor</CardTitle>
                    <CardDescription>Join our marketplace to sell your products.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-6">Click the button below to submit your request. An admin will review your profile.</p>
                    <Button onClick={handleBecomeVendor}>Request to be a Vendor</Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  if (userProfile?.vendorStatus !== 'approved') {
       return (
        <div className="container mx-auto max-w-2xl px-4 py-12">
            <Alert variant={userProfile?.vendorStatus === 'disabled' ? 'destructive' : 'default'}>
                <Info className="h-4 w-4" />
                <AlertTitle>Vendor Status: {userProfile?.vendorStatus?.toUpperCase()}</AlertTitle>
                <AlertDescription>
                    {userProfile?.vendorStatus === 'pending' && 'Your vendor application is currently under review. You will be notified once it is approved.'}
                    {userProfile?.vendorStatus === 'disabled' && 'Your vendor account has been disabled. Please contact support for more information.'}
                </AlertDescription>
            </Alert>
        </div>
       )
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Card className="shadow-lg overflow-hidden">
        <CardHeader>
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2 text-primary">
              Add Your Products
            </h1>
            <p className="text-md text-foreground/80">
              Fill out the details for the products you want to sell.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                 <div className="space-y-6">
                    {fields.map((field, index) => (
                        <Card key={field.id} className="p-4 relative">
                            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-destructive" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormItem>
                                    <FormLabel>Unique Product ID</FormLabel>
                                    <FormControl><Input value={field.id} readOnly disabled /></FormControl>
                                </FormItem>
                                <FormField control={form.control} name={`products.${index}.name`} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl><Input placeholder="e.g., Monstera Deliciosa" {...field} /></FormControl>
                                        <FormMessage />
                                </FormItem>
                                )} />
                                <FormField control={form.control} name={`products.${index}.species`} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Species / Item Type</FormLabel>
                                    <FormControl><Input placeholder="e.g., Ficus lyrata" {...field} /></FormControl>
                                        <FormMessage />
                                </FormItem>
                                )} />
                                <FormField control={form.control} name={`products.${index}.category`} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                {productCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <div className="md:col-span-2">
                                    <FormField control={form.control} name={`products.${index}.description`} render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Details</FormLabel>
                                            <FormControl><Textarea placeholder="Describe your product" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <FormField control={form.control} name={`products.${index}.price`} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price (AED)</FormLabel>
                                        <FormControl><Input type="number" placeholder="99.99" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                    <FormField control={form.control} name={`products.${index}.stock`} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stock Quantity</FormLabel>
                                        <FormControl><Input type="number" placeholder="10" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name={`products.${index}.size`} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Size</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select a size" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="Small">Small</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="Large">Large</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name={`products.${index}.condition`} render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Condition</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="Excellent">Excellent</SelectItem>
                                                <SelectItem value="Good">Good</SelectItem>
                                                <SelectItem value="Fair">Fair</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <div className="md:col-span-2">
                                    <FormField control={form.control} name={`products.${index}.images`} render={({ field: { onChange, value, ...rest }}) => (
                                    <FormItem>
                                        <FormLabel>Product Images</FormLabel>
                                        <FormControl><Input type="file" accept="image/*" multiple onChange={(e) => onChange(e.target.files)} {...rest} /></FormControl>
                                        <FormDescription>You can upload multiple images.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                </div>
                            </div>
                        </Card>
                    ))}
                        <FormMessage>{form.formState.errors.products?.message}</FormMessage>
                    <Button type="button" variant="outline" className="w-full" onClick={() => append({ id: `INQUE-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, name: '', species: '', description: '', price: 0, category: '', size: 'Medium', condition: 'Good', stock: 1, images: null })}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Another Product
                    </Button>
                </div>
                 <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Products for Review
                  </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

    