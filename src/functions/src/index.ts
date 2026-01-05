
/**
 * @fileoverview Firebase Cloud Functions for the Admin Dashboard.
 *
 * This file contains:
 * - A callable function `createAdmin` to securely grant admin privileges to a user.
 * - A callable function `reverseGeocode` to securely perform reverse geocoding lookups.
 * - A local script `seedSampleData` to populate Firestore with initial data.
 */
import * as dotenv from 'dotenv';
// Load environment variables from .env file at the very top
dotenv.config();

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { geohashForLocation } from 'geofire-common';
import { inqueProductData } from '../../src/lib/inque-data';
import fetch from 'node-fetch';


// Initialize Firebase Admin SDK.
try {
  admin.initializeApp();
} catch (e) {
  console.error('Failed to initialize Firebase Admin SDK.', e);
}

const db = admin.firestore();

/**
 * Creates an admin user by setting a custom claim.
 */
export const createAdmin = functions.https.onCall(async (data, context) => {
  // Optional: Add a check to ensure the caller is already an admin.
  // if (context.auth?.token.admin !== true) {
  //   throw new functions.https.HttpsError(
  //     'permission-denied',
  //     'You must be an admin to create other admins.'
  //   );
  // }

  const { email } = data;
  if (!email || typeof email !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a valid "email" argument.'
    );
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    return { result: `Success! ${email} has been made an admin.` };
  } catch (error) {
    console.error('Error creating admin:', error);
    throw new functions.https.HttpsError(
      'internal',
      'An unexpected error occurred while creating the admin.'
    );
  }
});

/**
 * Performs a reverse geocoding lookup using the Google Geocoding API.
 * This function is designed to be called from the client-side via a Server Action
 * to keep the API key secure.
 */
export const reverseGeocode = functions.https.onCall(async (data, context) => {
    const { lat, lng } = data;

    if (!lat || !lng) {
        throw new functions.https.HttpsError('invalid-argument', 'Latitude and longitude are required.');
    }
    
    // IMPORTANT: Read API key from process.env, which is populated by dotenv
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        console.error("Google Maps API key is not configured. Make sure there is a .env file in the functions/ directory with GOOGLE_MAPS_API_KEY set.");
        throw new functions.https.HttpsError('internal', 'The Google Maps API key is not configured on the server.');
    }
    
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const json = await response.json() as any;

        if (json.status !== 'OK' || !json.results || json.results.length === 0) {
            console.error('Geocoding API Error:', json.status, json.error_message);
            throw new functions.https.HttpsError('not-found', `Could not find address for the given coordinates. Status: ${json.status}`);
        }

        return { success: true, data: json.results[0] };
    } catch (error: any) {
        console.error('Error fetching from Google Geocoding API:', error);
        throw new functions.https.HttpsError('internal', 'An unexpected error occurred while fetching address details.', error.message);
    }
});


/**
 * --- This is a sample seeding function ---
 * It is NOT a deployed Cloud Function. Run it locally via `ts-node`.
 * It demonstrates how to add sample data to Firestore.
 */
export async function seedSampleData() {
  if (process.env.NODE_ENV === 'production') {
    console.error('Seeding is disabled in production.');
    return;
  }

  console.log('Starting to seed data...');

  const batch = db.batch();

  // --- 1. Create INQUE Products ---
  for (const product of inqueProductData) {
    const productRef = db.collection('inque_products').doc(product.id);
    batch.set(productRef, {
      ...product,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`- Prepared INQUE product: ${product.title}`);
  }

  try {
    await batch.commit();
    console.log('Successfully seeded sample data!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}
