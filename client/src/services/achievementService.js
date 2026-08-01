import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Fetch all achievement documents from the "achievements" collection
export const getAchievements = async () => {
  const querySnapshot = await getDocs(collection(db, 'achievements'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
