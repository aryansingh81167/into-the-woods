'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { doc, setDoc, getDoc, serverTimestamp, Firestore } from 'firebase/firestore';
import { useFirebase } from '@/firebase';
import { v4 as uuidv4 } from 'uuid';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export interface LocationData {
  latitude: number;
  longitude: number;
  fullAddress: string;
  houseNumber: string;
  landmark: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  source: 'gps' | 'map';
}

interface LocationContextType {
  location: LocationData | null;
  setLocation: (location: LocationData) => Promise<void>;
  isLocationLoading: boolean;
  sessionId: string | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);
const SESSION_ID_KEY = 'inque_location_session_id';

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const { firestore, isUserLoading: isAuthLoading } = useFirebase();
  const [location, setLocationState] = useState<LocationData | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    let currentSessionId = localStorage.getItem(SESSION_ID_KEY);
    if (!currentSessionId) {
      currentSessionId = uuidv4();
      localStorage.setItem(SESSION_ID_KEY, currentSessionId);
    }
    setSessionId(currentSessionId);
  }, []);

  useEffect(() => {
    // Wait for auth to be resolved and for firestore/session to be available.
    if (isAuthLoading || !firestore || !sessionId) return;

    const fetchLocation = async () => {
      setIsLocationLoading(true);
      const docRef = doc(firestore, 'locations', sessionId);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLocationState(docSnap.data() as LocationData);
        }
      } catch (err) {
        console.error("Failed to fetch location from Firestore:", err);
         const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
      } finally {
        setIsLocationLoading(false);
      }
    };

    fetchLocation();
  }, [firestore, sessionId, isAuthLoading]);

  const handleSetLocation = useCallback(async (newLocation: LocationData) => {
    if (!firestore || !sessionId) {
      console.error("Firestore or Session ID not available.");
      return;
    }
    setIsLocationLoading(true);
    setLocationState(newLocation); // Optimistic update

    const locationWithTimestamp = {
      ...newLocation,
      updatedAt: serverTimestamp(),
    };

    const docRef = doc(firestore, 'locations', sessionId);
    
    setDoc(docRef, locationWithTimestamp)
      .catch((serverError) => {
        console.error("Failed to save location:", serverError);
        setLocationState(location); // Revert optimistic update on error
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'write',
          requestResourceData: locationWithTimestamp
        });
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => {
        setIsLocationLoading(false);
      });

  }, [firestore, sessionId, location]);

  return (
    <LocationContext.Provider value={{ location, setLocation: handleSetLocation, isLocationLoading, sessionId }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
