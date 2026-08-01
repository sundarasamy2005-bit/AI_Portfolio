import { useState } from 'react';
import { createMessage } from '../services/messageService';
import { validateContactForm } from '../utils/validators';

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const sendMessage = async (formData) => {
    setLoading(true);
    setError(null);
    setStatus(null);

    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setError(validation.error);
      setLoading(false);
      return false;
    }

    try {
      await createMessage(formData);
      setStatus('Message sent successfully!');
      setLoading(false);
      return true;
    } catch (err) {
      setError('Failed to send message. Please try again.');
      setLoading(false);
      return false;
    }
  };

  return { sendMessage, loading, status, error };
};
