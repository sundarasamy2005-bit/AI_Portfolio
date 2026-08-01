import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Fetch all education documents from the "education" collection
export const getEducation = async () => {
  const querySnapshot = await getDocs(collection(db, 'education'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
