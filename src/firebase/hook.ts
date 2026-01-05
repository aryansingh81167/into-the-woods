// src/firebase/hooks.ts

export function useFirebase() {
  return {
    loading: false,
    user: null,
    error: null,
  };
}
