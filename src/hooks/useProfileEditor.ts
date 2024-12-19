import { useState, useCallback, useEffect } from 'react';
import { TEST_USERS } from '../constants/auth';
import type { UserProfile } from '../types/profile';

const DEFAULT_PROFILE: UserProfile = {
  id: '',
  email: '',
  name: '',
  city: '',
  phone: '',
  skills: [],
  languages: [],
  social: {},
  privacy: {
    showEmail: true,
    showPhone: true,
    showLocation: true
  }
};

export function useProfileEditor(userId: string | undefined) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get user data from test users
        const user = TEST_USERS.professional;
        
        if (user) {
          setProfile({
            id: user.id,
            email: user.email,
            name: user.name,
            profession: user.profession,
            company: user.company,
            city: user.city,
            phone: user.phone,
            skills: user.specialties || [],
            languages: ['Spanish', 'English'], // Default languages
            social: {},
            privacy: {
              showEmail: true,
              showPhone: true,
              showLocation: true
            }
          });
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Error loading profile');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const uploadImage = useCallback(async (file: File) => {
    setIsSaving(true);
    try {
      // Simulate image upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      const imageUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, image: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const saveSection = useCallback(async (data: Partial<UserProfile>) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error('Error saving section:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, []);

  return {
    profile,
    isLoading,
    isSaving,
    error,
    updateProfile,
    uploadImage,
    saveSection
  };
}