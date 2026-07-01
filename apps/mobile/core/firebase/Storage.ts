import storage from '@react-native-firebase/storage';
import { firebaseManager } from './FirebaseApp';

export const getStorage = () => {
  // Ensure Firebase is initialized before accessing storage
  firebaseManager.getApp();
  return storage();
};
