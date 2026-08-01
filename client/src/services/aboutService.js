import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

// Fetch the single "profile" document from "about" collection
export const getAbout = async () => {
  const docRef = doc(db, 'about', 'profile');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};
