import { RadioGroup } from '../ui/RadioGroup';
import type { FilterType } from '../../services/api/implementations/SearchApiService';

interface SearchFiltersProps {
  activeTab: FilterType;
  onChange: (value: FilterType) => void;
}

export function SearchFilters({ activeTab, onChange }: SearchFiltersProps) {
  const options = [
    { id: 'all', label: 'Todos' },
    { id: 'professional', label: 'Profesionales' },
    { id: 'company', label: 'Empresas' }
  ];

  return (
    <div className="mb-4">
      <RadioGroup
        name="searchType"
        options={options}
        value={activeTab}
        onChange={(value) => onChange(value as FilterType)}
        className="w-100"
      />
    </div>
  );
}