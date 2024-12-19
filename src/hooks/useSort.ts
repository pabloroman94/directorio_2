import { useState, useCallback } from 'react';
import { ApiServiceFactory } from '../services/api';
import type { ServiceProvider } from '../types/service';
import type { SortOption } from '../services/api/implementations/SearchApiService';

const searchService = ApiServiceFactory.getService('search');

export const useSort = () => {
  const [sortBy, setSortBy] = useState<SortOption>('relevancia');
  const [isLoading, setIsLoading] = useState(false);

  const handleSort = useCallback(async (providers: ServiceProvider[], option: SortOption) => {
    setIsLoading(true);
    try {
      setSortBy(option);
      const response = await searchService.sort(providers, option);
      return response.data;
    } catch (error) {
      console.error('Error sorting providers:', error);
      return providers;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sortBy,
    isLoading,
    handleSort
  };
}; 