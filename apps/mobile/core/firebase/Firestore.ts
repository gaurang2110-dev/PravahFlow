import firestore from '@react-native-firebase/firestore';
import { firebaseManager } from './FirebaseApp';

export const getFirestore = () => {
  // Ensure Firebase is initialized before accessing firestore
  firebaseManager.getApp();
  return firestore();
};
