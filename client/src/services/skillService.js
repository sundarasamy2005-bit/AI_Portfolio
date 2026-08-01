import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

/**
 * Fetch all skill categories and items from Firestore 'skills' collection.
 * Expects documents with schema:
 * { title: "Frontend", skills: [{ name: "HTML5", icon: "html", level: 95 }] }
 */
export const getSkills = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'skills'));
    if (querySnapshot.empty) {
      return [];
    }

    const categories = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      title: docSnap.data().title || docSnap.id,
      skills: docSnap.data().skills || [],
      ...docSnap.data(),
    }));

    return categories;
  } catch (error) {
    console.error('Error fetching skills from Firestore:', error);
    throw error;
  }
};
