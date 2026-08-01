import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Fetch all internship documents from the "internships" collection
export const getInternships = async () => {
  const querySnapshot = await getDocs(collection(db, 'internships'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
