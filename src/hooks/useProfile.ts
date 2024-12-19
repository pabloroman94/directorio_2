
import { useState, useCallback } from 'react';
import { ApiServiceFactory } from '../services/api';
import type { UserProfile } from '../types/profile';

const profileService = ApiServiceFactory.getService('profile');

export const useProfile = (userId: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await profileService.getUserProfile(userId);
      setProfile(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading profile');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const updateProfile = useCallback(async (data: Partial<UserProfile>) => {
    setIsLoading(true);
    try {
      const response = await profileService.updateProfile(userId, data);
      setProfile(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating profile');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  return {
    profile,
    isLoading,
    error,
    loadProfile,
    updateProfile
  };
};
