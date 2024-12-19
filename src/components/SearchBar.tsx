import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-100 mx-auto" style={{ maxWidth: '800px' }}>
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0">
          <Search className="text-muted" size={20} />
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search by name, profession, city, or skills..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );
}