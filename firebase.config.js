import { cert, getApps } from "firebase-admin/app"
import admin from "firebase-admin";

if(!getApps().length){
  admin.initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    })
  });
}

export const adminDb = admin.firestore();