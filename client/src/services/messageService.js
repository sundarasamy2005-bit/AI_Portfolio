import { db } from '../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Save a new contact message to the "contacts" collection
export const createMessage = async (data) => {
  const docRef = await addDoc(collection(db, 'contacts'), {
    name: data.name,
    email: data.email,
    subject: data.subject || '',
    message: data.message || '',
    createdAt: serverTimestamp()
  });
  return { id: docRef.id, ...data };
};
