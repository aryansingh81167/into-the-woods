'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: This function should only be called ONCE, ideally in a client-side provider.
export function initializeFirebase() {
  if (!getApps().length) {
    // Important! initializeApp() can be called without args in specific hosting environments.
    // However, for general client-side usage, we must provide the config.
    initializeApp(firebaseConfig);
  }
  // If already initialized, return the SDKs with the existing App
  return getSdks(getApp());
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
