import auth from '@react-native-firebase/auth';
import { firebaseManager } from './FirebaseApp';

export const getAuth = () => {
  // Ensure Firebase is initialized before accessing auth
  firebaseManager.getApp();
  return auth();
};
