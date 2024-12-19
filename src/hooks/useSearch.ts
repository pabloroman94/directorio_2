import { useState, useCallback, useEffect } from 'react';
import { ApiServiceFactory } from '../services/api';
import type { ServiceProvider } from '../types/service';
import type { FilterType } from '../services/api/implementations/SearchApiService';

const searchService = ApiServiceFactory.getService('search');

export const useSearch = () => {
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>([]);
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleSearch('', 'all');
  }, []);

  const handleSearch = useCallback(async (query: string, type: FilterType, neighborhood?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      setFilterType(type);
      const response = await searchService.search(query, type, neighborhood);
      setFilteredProviders(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error searching providers');
      setFilteredProviders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    filteredProviders,
    filterType,
    isLoading,
    error,
    handleSearch
  };
};
