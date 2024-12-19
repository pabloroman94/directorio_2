
import { useState, useCallback } from 'react';
import { ApiServiceFactory } from '../services/api';
import type { Professional } from '../types';

const professionalService = ApiServiceFactory.getService('professional');

export const useAdmin = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfessionals = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await professionalService.getAll();
      setProfessionals(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading professionals');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteProfessional = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      await professionalService.delete(id);
      setProfessionals(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting professional');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfessional = useCallback(async (professional: Professional) => {
    setIsLoading(true);
    try {
      const response = await professionalService.update(professional.id, professional);
      setProfessionals(prev => 
        prev.map(p => p.id === professional.id ? response.data : p)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating professional');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addProfessional = useCallback(async (professional: Omit<Professional, 'id'>) => {
    setIsLoading(true);
    try {
      const response = await professionalService.create(professional);
      setProfessionals(prev => [...prev, response.data]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error adding professional');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    professionals,
    isLoading,
    error,
    loadProfessionals,
    deleteProfessional,
    updateProfessional,
    addProfessional
  };
};
