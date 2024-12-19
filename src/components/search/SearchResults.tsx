import { useState, useEffect } from 'react';
import { SortDropdown } from './SortDropdown';
import { useSort } from '../../hooks/useSort';
import type { ServiceProvider } from '../../types/service';
import type { SortOption } from '../../services/api/implementations/SearchApiService';
import { ProfessionalCard } from '../cards/ProfessionalCard';
import { CompanyCard } from '../cards/CompanyCard';

interface SearchResultsProps {
  providers: ServiceProvider[];
}

export function SearchResults({ providers }: SearchResultsProps) {
  const { sortBy, handleSort } = useSort();
  const [sortedProviders, setSortedProviders] = useState(providers);

  useEffect(() => {
    setSortedProviders(providers);
  }, [providers]);

  const onSortChange = async (option: SortOption) => {
    const sorted = await handleSort(providers, option);
    setSortedProviders(sorted);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="h5 mb-0">{providers.length} resultados encontrados</h2>
        </div>
        <SortDropdown value={sortBy} onChange={onSortChange} />
      </div>

      <div className="row g-4">
        {sortedProviders.map(provider => (
          <div key={provider.id} className="col-md-6 col-lg-4">
            {provider.type === 'professional' ? (
              <ProfessionalCard professional={provider} />
            ) : (
              <CompanyCard company={provider} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 