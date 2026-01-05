'use client';

import { useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase/provider';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { auth, firestore } = useFirebase();
  const router = useRouter();

  // This state determines if we are still checking the user's auth status.
  const [authStatus, setAuthStatus] = useState<{
    isLoading: boolean;
    isAdmin: boolean;
  }>({ isLoading: true, isAdmin: false });

  useEffect(() => {
    if (!auth || !firestore) return;

    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      // Firebase has finished restoring auth at this point
      if (!user) {
        // If no user, redirect to home.
        router.replace('/');
        return;
      }

      // User is logged in, now check for admin role in Firestore.
      try {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists() && userDocSnap.data().role === 'admin') {
          // User is confirmed admin
          setAuthStatus({ isLoading: false, isAdmin: true });
        } else {
          // User is not an admin, redirect.
          router.replace('/');
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        router.replace('/');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, firestore, router]);


  // While Firebase is resolving auth, show a loader.
  if (authStatus.isLoading) {
    return (
       <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-muted-foreground">Verifying admin access...</p>
      </div>
    );
  }
  
  // If auth has been checked and user is an admin, render the layout.
  if (authStatus.isAdmin) {
      return (
      <div className="flex min-h-screen">
        <aside className="w-64 bg-card border-r p-4">
          <h2 className="text-2xl font-bold font-headline text-primary mb-6">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/admin">Dashboard</Link>
              </Button>
               <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/admin/products">Products</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/admin/vendors">Vendors</Link>
              </Button>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    );
  }

  // Render nothing while redirecting
  return null;
}
