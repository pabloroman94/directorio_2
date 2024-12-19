import { useState, useCallback } from 'react';
import { TRANSLATIONS } from '../../constants/translations';
import { SearchFilters } from './SearchFilters';
import { SearchInput } from './SearchInput';
import NeighborhoodSearch from './NeighborhoodSearch';
import type { FilterType } from '../../hooks/useSearch';

interface SearchHeroProps {
  onSearch: (query: string, type: FilterType, neighborhood?: string) => void;
}

export default function SearchHero({ onSearch }: SearchHeroProps) {
  const [activeTab, setActiveTab] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');

  const handleSubmit = useCallback(() => {
    onSearch(searchQuery, activeTab, selectedNeighborhood);
  }, [searchQuery, activeTab, selectedNeighborhood, onSearch]);

  return (
    <div className="search-hero py-5" style={{ 
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1497366216548-37526070297c)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="container">
        <div className="text-center mb-4">
          <h1 className="display-4 text-white mb-2">{TRANSLATIONS.HOME_TITLE}</h1>
          <p className="lead text-white mb-5">{TRANSLATIONS.HOME_SUBTITLE}</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg">
              <div className="card-body p-4">
                <SearchFilters
                  activeTab={activeTab}
                  onChange={setActiveTab}
                />

                <div className="row g-3">
                  <div className="col-md-4">
                    <NeighborhoodSearch
                      onSelect={setSelectedNeighborhood}
                      placeholder="Seleccionar barrio"
                    />
                  </div>
                  <div className="col-md-8">
                    <SearchInput
                      value={searchQuery}
                      onChange={setSearchQuery}
                      onSubmit={handleSubmit}
                      placeholder={TRANSLATIONS.SEARCH_PLACEHOLDER}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}