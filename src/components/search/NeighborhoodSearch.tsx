import { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { neighborhoods } from '../../data/neighborhoods';

interface NeighborhoodSearchProps {
  onSelect: (neighborhood: string) => void;
  placeholder?: string;
}

export default function NeighborhoodSearch({ 
  onSelect, 
  placeholder = 'Search neighborhood...' 
}: NeighborhoodSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

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
      const filtered = neighborhoods.filter(neighborhood =>
        neighborhood.toLowerCase().includes(value.toLowerCase())
      );
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
        handleSelect(suggestions[selectedIndex]);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    }
  };

  const handleSelect = (neighborhood: string) => {
    setQuery(neighborhood);
    setShowSuggestions(false);
    onSelect(neighborhood);
  };

  return (
    <div className="position-relative" ref={searchRef}>
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0">
          <MapPin className="text-muted" size={20} />
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setShowSuggestions(true)}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="position-absolute w-100 mt-1 shadow-sm bg-white border rounded-3 z-3">
          {suggestions.map((neighborhood, index) => (
            <button
              key={neighborhood}
              className={`d-flex align-items-center w-100 btn btn-link text-start text-decoration-none px-3 py-2 ${
                index === selectedIndex ? 'bg-light' : ''
              }`}
              onClick={() => handleSelect(neighborhood)}
            >
              <MapPin size={16} className="text-muted me-2" />
              <span>{neighborhood}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}