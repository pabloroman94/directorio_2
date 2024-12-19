import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../constants/translations';
import { professionals } from '../../data/professionals';
import SearchSuggestions from './SearchSuggestions';
import NeighborhoodSearch from './NeighborhoodSearch';
import type { Professional } from '../../types';

interface SearchBarProps {
  onSearch: (query: string, neighborhood?: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [suggestions, setSuggestions] = useState<Professional[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if (value.trim()) {
      const filtered = professionals.filter(professional =>
        professional.fullName.toLowerCase().includes(value.toLowerCase()) ||
        professional.profession.toLowerCase().includes(value.toLowerCase()) ||
        professional.specialties.some(tag => tag.toLowerCase().includes(value.toLowerCase()))
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0) {
        handleSuggestionSelect(suggestions[selectedIndex]);
      } else {
        handleSubmit(e as any);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, neighborhood);
    setShowSuggestions(false);
    // Scroll to results smoothly
    const resultsElement = document.querySelector('.professionals-list');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSuggestionSelect = (professional: Professional) => {
    navigate(`/profile/${professional.id}`);
    setShowSuggestions(false);
    setQuery('');
  };

  return (
    <div className="position-relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="w-100 mx-auto" style={{ maxWidth: '800px' }}>
        <div className="row g-2">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <Search className="text-muted" size={20} />
              </span>
              <input
                ref={inputRef}
                type="text"
                className="form-control border-start-0"
                placeholder={TRANSLATIONS.SEARCH_PLACEHOLDER}
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => query.trim() && setShowSuggestions(true)}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="col-md-4">
            <NeighborhoodSearch 
              onSelect={setNeighborhood}
              placeholder={TRANSLATIONS.NEIGHBORHOOD_PLACEHOLDER}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-sm px-4">
              {TRANSLATIONS.SEARCH}
            </button>
          </div>
        </div>
      </form>

      <SearchSuggestions
        suggestions={suggestions}
        onSelect={handleSuggestionSelect}
        visible={showSuggestions}
        selectedIndex={selectedIndex}
      />
    </div>
  );
}