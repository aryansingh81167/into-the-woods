'use client';

import {
  type Auth,
  type User,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  signInWithPhoneNumber as firebaseSignInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';

import {
  type Firestore,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import { initializeFirebase } from '.';
import { errorEmitter } from './error-emitter';
import { FirestorePermissionError } from './errors';

/* -----------------------------
   Helper: Add / update user
-------------------------------- */
const addUserToFirestore = async (
  db: Firestore,
  user: User,
  details: { name?: string; phone?: string } = {}
) => {
  const userRef = doc(db, 'users', user.uid);

  const userData: Record<string, any> = {
    uid: user.uid,
    email: user.email,
    displayName: details.name || user.displayName,
    photoURL: user.photoURL,
    createdAt: serverTimestamp(),
    inquePoints: 0,
    phoneNumber: details.phone || user.phoneNumber,
  };

  // Remove null / undefined values
  Object.keys(userData).forEach((key) => {
    if (userData[key] == null) {
      delete userData[key];
    }
  });

  try {
    await setDoc(userRef, userData, { merge: true });
  } catch (err) {
    const permissionError = new FirestorePermissionError({
      path: userRef.path,
      operation: 'create',
      requestResourceData: userData,
    });

    errorEmitter.emit('permission-error', permissionError);
  }
};

/* -----------------------------
   Google Sign In
-------------------------------- */
export const signInWithGoogle = async () => {
  const { auth, firestore: db } = initializeFirebase();
  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider);
  const additionalInfo = getAdditionalUserInfo(result);

  if (additionalInfo?.isNewUser) {
    await addUserToFirestore(db, result.user);
  }

  return result;
};

/* -----------------------------
   Sign Out
-------------------------------- */
export const signOut = (auth: Auth) => {
  return firebaseSignOut(auth);
};

/* -----------------------------
   Email Sign Up
-------------------------------- */
export const signUpWithEmailAndPassword = async (
  auth: Auth,
  db: Firestore,
  email: string,
  password: string,
  displayName: string,
  existingUser: User | null = null
) => {
  let userCredential;

  if (!existingUser) {
    userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, { displayName });
    await addUserToFirestore(db, userCredential.user, { name: displayName });
  } else {
    await updateProfile(existingUser, { displayName });
    await addUserToFirestore(db, existingUser, {
      name: displayName,
      phone: existingUser.phoneNumber || undefined,
    });

    userCredential = { user: existingUser } as any;
  }

  return userCredential;
};

/* -----------------------------
   Email Sign In
-------------------------------- */
export const signInWithEmailAndPassword = (
  auth: Auth,
  email: string,
  password: string
) => {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
};

/* -----------------------------
   Phone Sign In
-------------------------------- */
export const signInWithPhoneNumber = async (
  auth: Auth,
  phoneNumber: string,
  appVerifier: RecaptchaVerifier
) => {
  return firebaseSignInWithPhoneNumber(auth, phoneNumber, appVerifier);
};

export { RecaptchaVerifier };
