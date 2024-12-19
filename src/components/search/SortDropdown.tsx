import { ChevronDown } from 'lucide-react';
import type { SortOption } from '../../services/api/implementations/SearchApiService';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'relevancia', label: 'Relevancia' },
  { value: 'calificacion', label: 'Calificación' },
  { value: 'resenas', label: 'Reseñas' },
  { value: 'experiencia', label: 'Experiencia' },
  { value: 'nombre', label: 'Nombre' }
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="dropdown">
      <button 
        className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center gap-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span>Ordenar por:</span>
        <span className="text-primary">{sortOptions.find(opt => opt.value === value)?.label}</span>
        <ChevronDown size={16} />
      </button>
      <ul className="dropdown-menu">
        {sortOptions.map(option => (
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