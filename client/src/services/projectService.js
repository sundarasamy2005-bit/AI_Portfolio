import { db } from '../firebase/firebase';
import { collection, getDocs, doc, getDoc, query, where, orderBy } from 'firebase/firestore';

/**
 * Fetch all projects from Firestore 'projects' collection.
 * Sorts featured projects first.
 */
export const getProjects = async () => {
  try {
    const projectsRef = collection(db, 'projects');
    const querySnapshot = await getDocs(projectsRef);
    
    if (querySnapshot.empty) {
      return [];
    }

    const projects = querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    // Sort featured projects first, then by year or title
    return projects.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.year || 0) - (a.year || 0);
    });
  } catch (error) {
    console.error('Error fetching projects from Firestore:', error);
    throw error;
  }
};

/**
 * Fetch only featured projects from Firestore.
 */
export const getFeaturedProjects = async () => {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(projectsRef, where('featured', '==', true));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    // Fallback: fetch all and filter in memory
    const all = await getProjects();
    return all.filter((p) => p.featured);
  }
};

/**
 * Fetch a single project by document ID.
 */
export const getProjectById = async (id) => {
  try {
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
};
