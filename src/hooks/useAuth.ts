
'use client';

import { useState, useEffect } from 'react';
import { useUser, useDoc, useFirebase, useMemoFirebase } from '@/firebase'; 
import type { User } from 'firebase/auth';
import { doc } from 'firebase/firestore';

interface UserProfile {
  role?: 'admin' | 'vendor' | 'user';
  vendorStatus?: 'pending' | 'approved' | 'disabled';
}

interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

export function useAuth(): AuthState {
  const { user, isUserLoading } = useUser();
  const { firestore } = useFirebase();

  const userDocRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const totalLoading = isUserLoading || (user && isProfileLoading);
    setLoading(totalLoading);
  }, [user, isUserLoading, isProfileLoading]);

  const isAdmin = userProfile?.role === 'admin';

  return { user, userProfile, loading, isAdmin };
}
