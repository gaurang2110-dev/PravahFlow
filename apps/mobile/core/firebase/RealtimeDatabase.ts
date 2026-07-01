import database from '@react-native-firebase/database';
import { firebaseManager } from './FirebaseApp';

export const getRealtimeDatabase = () => {
  // Ensure Firebase is initialized before accessing database
  firebaseManager.getApp();
  return database();
};
