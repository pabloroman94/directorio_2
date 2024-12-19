import { FormEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Buscar...'
}: SearchInputProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0">
          <Search className="text-muted" size={20} />
        </span>
        <input
          type="text"
          className="form-control border-start-0"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button 
          type="submit" 
          className="btn btn-primary px-4"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}