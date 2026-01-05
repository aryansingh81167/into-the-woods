
'use server';

import { getFunctions, httpsCallable } from 'firebase/functions';
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

// Initialize Firebase app if it hasn't been already
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

/**
 * Calls the `reverseGeocode` Cloud Function to get address details for given coordinates.
 * This acts as a secure bridge between the client and the Google Geocoding API.
 */
export async function reverseGeocodeAction(lat: number, lng: number): Promise<google.maps.GeocoderResult | null> {
    try {
        const functions = getFunctions(getApps()[0]);
        const reverseGeocode = httpsCallable(functions, 'reverseGeocode');
        const result = await reverseGeocode({ lat, lng });

        const data = result.data as { success: boolean; data?: any; error?: string };

        if (data.success && data.data) {
            return data.data as google.maps.GeocoderResult;
        } else {
            console.error('Reverse geocoding failed:', data.error);
            return null;
        }
    } catch (error) {
        console.error('Error calling reverseGeocode action:', error);
        return null;
    }
}

    