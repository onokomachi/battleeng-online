// Firebase v9 modular SDK
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// battleeng-online Firebase project config (from Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyDLsEB_zROfusa19Hzy5gUFF6v5ilb8R64",
  authDomain: "battleeng-online.firebaseapp.com",
  projectId: "battleeng-online",
  storageBucket: "battleeng-online.firebasestorage.app",
  messagingSenderId: "103551205143",
  appId: "1:103551205143:web:430929a347c333bbe54152",
  measurementId: "G-WPGXMSNQN1"
};

let app: any, auth: any, db: any, storage: any, googleProvider: any, analytics: any;
let firestoreReady = false;

// Core services (auth, db, storage) - must not fail
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app, 'default');
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.error("Firebase core initialization error:", error);
}

// Firestore connectivity check (non-blocking)
const checkFirestoreConnection = async (): Promise<boolean> => {
  if (!db) return false;
  try {
    // Import getDocs/collection dynamically to test connectivity
    const { getDocs, collection, query, limit } = await import('firebase/firestore');
    await getDocs(query(collection(db, 'connectivity_check'), limit(1)));
    firestoreReady = true;
    return true;
  } catch (e: any) {
    const msg = e?.message || '';
    if (msg.includes('not found') || msg.includes('404') || e?.code === 'not-found') {
      console.error(
        '%c[BattleENG] Firestoreデータベースが見つかりません。\n' +
        'Firebase Console → Firestore Database → 「データベースを作成」を実行してください。\n' +
        'https://console.firebase.google.com/project/battleeng-online/firestore',
        'color: #ff6b6b; font-size: 14px; font-weight: bold;'
      );
    } else {
      console.warn('[BattleENG] Firestore connectivity check failed:', msg);
    }
    return false;
  }
};

// Fire connectivity check (non-blocking)
checkFirestoreConnection().then(ok => {
  if (ok) console.log('[BattleENG] Firestore connected');
});

// Analytics - optional, should not block auth
isAnalyticsSupported().then(supported => {
  if (supported && app) {
    try {
      analytics = getAnalytics(app);
    } catch (e) {
      console.warn("Analytics init skipped:", e);
    }
  }
}).catch(() => {});

export { app, auth, db, storage, googleProvider, analytics, firestoreReady, checkFirestoreConnection };
