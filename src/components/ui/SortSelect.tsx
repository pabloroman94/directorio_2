import { ChevronDown } from 'lucide-react';

interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
  className?: string;
}

export function SortSelect({ value, onChange, options, className = '' }: SortSelectProps) {
  return (
    <div className={`dropdown ${className}`}>
      <button 
        className="btn btn-outline-secondary d-flex align-items-center gap-2" 
        type="button"
        data-bs-toggle="dropdown"
      >
        <span>Ordenar por:</span>
        <span className="text-primary">
          {options.find(opt => opt.value === value)?.label}
        </span>
        <ChevronDown size={16} />
      </button>
      <ul className="dropdown-menu">
        {options.map(option => (
          <li key={option.value}>
            <button
              className={`dropdown-item ${value === option.value ? 'active' : ''}`}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}