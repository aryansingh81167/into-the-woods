
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  signUpWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from '@/firebase/auth';
import { useFirebase } from '@/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const emailSignupSchema = z.object({
  name: z.string().min(1, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});

const phoneSignupSchema = z.object({
    name: z.string().min(1, 'Please enter your name.'),
    phone: z.string().min(10, 'Please enter a valid phone number.'),
    otp: z.string().optional(),
});


type EmailSignupFormData = z.infer<typeof emailSignupSchema>;
type PhoneSignupFormData = z.infer<typeof phoneSignupSchema>;


export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const { auth, firestore } = useFirebase();

  const setupRecaptcha = () => {
    if (!auth) return;
    // It's important that this is only created once.
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      });
    }
    return (window as any).recaptchaVerifier;
  };

  const emailForm = useForm<EmailSignupFormData>({
    resolver: zodResolver(emailSignupSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const phoneForm = useForm<PhoneSignupFormData>({
    resolver: zodResolver(phoneSignupSchema),
    defaultValues: { name: '', phone: '', otp: '' },
    });

  const handleEmailSignup = async (data: EmailSignupFormData) => {
    if (!auth || !firestore) return;
    setIsLoading(true);
    try {
      await signUpWithEmailAndPassword(auth, firestore, data.email, data.password, data.name);
      toast({ title: 'Account created successfully!', description: "Redirecting to homepage..." });
      router.replace('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign-Up Failed',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSignup = async (data: PhoneSignupFormData) => {
    if (!auth || !firestore) return;
    setIsPhoneLoading(true);
    try {
        if (confirmationResult && data.otp) {
            // We have an OTP, let's verify it
            const userCredential = await confirmationResult.confirm(data.otp);
            // Manually update profile since it's not available in this flow
            if (userCredential.user) {
                await signUpWithEmailAndPassword(auth, firestore, '', '', data.name, userCredential.user);
            }
            toast({ title: 'Phone sign-up successful!', description: 'Redirecting to homepage...' });
            router.replace('/');
        } else {
            // No OTP yet, send one
            const recaptchaVerifier = setupRecaptcha();
            if (!recaptchaVerifier) throw new Error("Recaptcha not initialized");
            // The phone number must be in E.164 format
            const result = await signInWithPhoneNumber(auth, `+${data.phone}`, recaptchaVerifier);
            setConfirmationResult(result);
            toast({ title: 'OTP Sent!', description: 'Please check your phone for the verification code.' });
        }

    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Phone Sign-Up Failed',
            description: error.message,
        });
    } finally {
        setIsPhoneLoading(false);
    }
  };


  return (
    <div className="container mx-auto flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl text-primary">Create an Account</CardTitle>
          <CardDescription>Join our community of plant lovers</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
                <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(handleEmailSignup)} className="space-y-6 pt-6">
                    <FormField
                        control={emailForm.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                            <Input placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={emailForm.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={emailForm.control}
                        name="password"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Account
                    </Button>
                    </form>
                </Form>
            </TabsContent>
            <TabsContent value="phone">
                 <Form {...phoneForm}>
                    <form onSubmit={phoneForm.handleSubmit(handlePhoneSignup)} className="space-y-6 pt-6">
                        <FormField
                            control={phoneForm.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                <Input placeholder="Jane Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={phoneForm.control}
                            name="phone"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                <Input type="tel" placeholder="971501234567" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        {confirmationResult && (
                            <FormField
                                control={phoneForm.control}
                                name="otp"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>OTP Code</FormLabel>
                                    <FormControl>
                                    <Input placeholder="123456" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        )}
                        <Button type="submit" size="lg" className="w-full" disabled={isPhoneLoading}>
                            {isPhoneLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {confirmationResult ? 'Verify OTP and Register' : 'Send OTP'}
                        </Button>
                    </form>
                 </Form>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
      <div id="recaptcha-container"></div>
    </div>
  );
}
