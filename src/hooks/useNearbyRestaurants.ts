// src/hooks/useNearbyRestaurants.ts
'use client';

import { useState, useCallback } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useFirebase } from '@/firebase';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  location: { lat: number; lng: number };
  distanceMeters: number;
  rating: number;
  isOpenNow: boolean;
  photoUrl?: string | null;
}

interface UseNearbyRestaurantsResult {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  fetchRestaurants: (lat: number, lng: number, radiusMeters?: number) => void;
}

export function useNearbyRestaurants(): UseNearbyRestaurantsResult {
  const { firebaseApp } = useFirebase();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = useCallback(async (lat: number, lng: number, radiusMeters: number = 2500) => {
    if (!firebaseApp) {
      setError("Firebase not initialized.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const functions = getFunctions(firebaseApp);
      const nearbyRestaurantsFn = httpsCallable(functions, 'nearbyRestaurants');
      const result = await nearbyRestaurantsFn({ lat, lng, radiusMeters });
      
      const data = result.data as { success: boolean; restaurants?: Restaurant[]; error?: string };

      if (data.success && data.restaurants) {
        setRestaurants(data.restaurants);
      } else {
        throw new Error(data.error || 'Failed to fetch restaurants.');
      }
    } catch (err: any) {
      console.error('Error calling nearbyRestaurants function:', err);
      setError(err.message || 'An unknown error occurred.');
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  }, [firebaseApp]);

  return { restaurants, loading, error, fetchRestaurants };
}
