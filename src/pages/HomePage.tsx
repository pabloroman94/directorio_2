import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchHero from '../components/search/SearchHero';
import { ServiceCardList } from '../components/cards/ServiceCardList';
import { SortSelect } from '../components/ui/SortSelect';
import Pagination from '../components/pagination/Pagination';
import { useSearch } from '../hooks/useSearch';
import { usePagination } from '../hooks/usePagination';
import { sortProviders } from '../utils/sort';
import type { ServiceProvider } from '../types/service';
import type { SortOption } from '../utils/sort';
import type { FilterType } from '../services/api/implementations/SearchApiService';

export default function HomePage() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const { filteredProviders, handleSearch } = useSearch();

  const sortedProviders = sortProviders(filteredProviders, sortBy);

  const {
    items: paginatedProviders,
    currentPage,
    totalPages,
    goToPage,
    hasNextPage,
    hasPrevPage
  } = usePagination({
    items: sortedProviders,
    itemsPerPage: 6
  });

  const handleSearchSubmit = useCallback((query: string, type: FilterType, neighborhood?: string) => {
    handleSearch(query, type, neighborhood);
  }, [handleSearch]);

  const handleProviderClick = useCallback((provider: ServiceProvider) => {
    navigate(`/profile/${provider.id}`);
  }, [navigate]);

  const sortOptions = [
    { value: 'default', label: 'Relevancia' },
    { value: 'rating', label: 'Calificación' },
    { value: 'reviews', label: 'Reseñas' },
    { value: 'experience', label: 'Experiencia' },
    { value: 'name', label: 'Nombre' }
  ];

  return (
    <>
      <SearchHero onSearch={handleSearchSubmit} />
      
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 mb-0">
            {filteredProviders.length} resultados encontrados
          </h2>
          <SortSelect
            value={sortBy}
            onChange={(value) => setSortBy(value as SortOption)}
            options={sortOptions}
          />
        </div>

        <ServiceCardList 
          providers={paginatedProviders}
          onProviderClick={handleProviderClick}
        />
        
        {filteredProviders.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        )}
      </div>
    </>
  );
}