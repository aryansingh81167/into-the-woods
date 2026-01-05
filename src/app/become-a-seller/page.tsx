'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase';
import { useDoc, useMemoFirebase } from '@/firebase/hooks';
import { collection, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import { fileToDataUri } from '@/lib/utils';
import { errorEmitter, FirestorePermissionError } from '@/firebase/errors';

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck, UploadCloud } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

const vendorApplicationSchema = z.object({
  businessName: z.string().min(2, 'Business name is required.'),
  businessDescription: z.string().min(20, 'Please provide a more detailed description.'),
  documents: z.any()
    .refine((files) => files?.length >= 1, 'At least one document is required.')
    .refine((files) => Array.from(files).every((file: any) => file.size <= MAX_FILE_SIZE), `Max file size is 5MB.`)
    .refine((files) => Array.from(files).every((file: any) => ALLOWED_FILE_TYPES.includes(file.type)), 'Only .jpg, .png, and .pdf files are accepted.'),
});

type VendorApplicationFormData = z.infer<typeof vendorApplicationSchema>;

interface UserProfile {
  vendorStatus?: 'pending' | 'approved' | 'disabled';
}

export default function BecomeASellerPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { firestore: db, user, isUserLoading } = useFirebase();
  
  const userDocRef = useMemoFirebase(() => {
    if (!user || !db) return null;
    return doc(db, 'users', user.uid);
  }, [user, db]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VendorApplicationFormData>({
    resolver: zodResolver(vendorApplicationSchema),
    mode: 'onChange',
  });
  
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace('/login');
    }
  }, [isUserLoading, user, router]);

  const onSubmit = async (values: VendorApplicationFormData) => {
    if (!db || !user) {
        toast({ variant: "destructive", title: "Error", description: "You must be logged in." });
        return;
    }
    setIsSubmitting(true);

    let documentUris: string[];
    try {
        documentUris = await Promise.all(
            Array.from(values.documents as FileList).map(file => fileToDataUri(file))
        );
    } catch (error) {
        toast({ variant: "destructive", title: "File Error", description: "Could not process files for upload." });
        setIsSubmitting(false);
        return;
    }

    const docData = {
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        businessName: values.businessName,
        businessDescription: values.businessDescription,
        documents: documentUris,
        status: 'pending',
        createdAt: serverTimestamp(),
    };
    
    const applicationsCollection = collection(db, 'vendorApplications');

    addDoc(applicationsCollection, docData)
      .then(() => {
          toast({
              title: 'Application Submitted!',
              description: "Your vendor application is now under review.",
          });
          router.push('/profile');
      })
      .catch((serverError) => {
          const permissionError = new FirestorePermissionError({
              path: applicationsCollection.path,
              operation: 'create',
              requestResourceData: docData
          });
          errorEmitter.emit('permission-error', permissionError);
          // The global listener will now handle showing the detailed error.
      })
      .finally(() => {
          setIsSubmitting(false);
      });
  };

  if (isUserLoading || isProfileLoading) {
      return <div className="container mx-auto flex justify-center items-center h-96"><Loader2 className="h-10 w-10 animate-spin" /></div>
  }
  
  if (userProfile?.vendorStatus === 'approved') {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
        <Alert variant="default" className="border-green-600 text-green-800 dark:text-green-300 dark:border-green-800">
          <ShieldCheck className="h-4 w-4 !text-green-600" />
          <AlertTitle>You are an Approved Vendor!</AlertTitle>
          <AlertDescription>
            Your application has been approved. You can now start adding products to your store.
             <Button asChild variant="link" className="p-1 h-auto text-green-700 dark:text-green-400">
                <a href="/sell">Go to Seller Dashboard</a>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }
  
  if (userProfile?.vendorStatus === 'pending') {
    return (
        <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
            <Alert>
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertTitle>Application Pending</AlertTitle>
                <AlertDescription>
                    Your vendor application is currently under review. We will notify you once a decision has been made.
                </AlertDescription>
            </Alert>
        </div>
    )
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card className="shadow-lg overflow-hidden">
        <CardHeader>
          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-2 text-primary">
              Become a Seller
            </h1>
            <p className="text-md text-foreground/80">
              Join our marketplace by filling out the application below.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField control={form.control} name="businessName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Business or Store Name</FormLabel>
                  <FormControl><Input placeholder="e.g., Green Leaf Emporium" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="businessDescription" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tell us about your business</FormLabel>
                  <FormControl><Textarea placeholder="Describe the products you sell and what makes your business unique." {...field} rows={5} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="documents" render={({ field: { onChange, value, ...rest }}) => (
                <FormItem>
                  <FormLabel>Verification Documents</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-muted-foreground">PDF, PNG, JPG (MAX. 5MB each)</p>
                            </div>
                            <Input id="dropzone-file" type="file" className="hidden" accept={ALLOWED_FILE_TYPES.join(',')} multiple onChange={(e) => onChange(e.target.files)} {...rest} />
                        </label>
                    </div> 
                  </FormControl>
                  <FormDescription>Please upload a copy of your trade license or personal ID.</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />
              
              <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Application
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
