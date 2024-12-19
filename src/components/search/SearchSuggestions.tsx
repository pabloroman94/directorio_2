import { Professional } from '../../types';

interface SearchSuggestionsProps {
  suggestions: Professional[];
  onSelect: (professional: Professional) => void;
  visible: boolean;
  selectedIndex: number;
}

export default function SearchSuggestions({ 
  suggestions, 
  onSelect, 
  visible,
  selectedIndex 
}: SearchSuggestionsProps) {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="position-absolute w-100 mt-1 shadow-sm bg-white border rounded-3 z-3">
      {suggestions.map((professional, index) => (
        <button
          key={professional.id}
          className={`d-flex align-items-center gap-2 w-100 btn btn-link text-start text-decoration-none px-3 py-2 border-bottom ${
            index === selectedIndex ? 'bg-light' : ''
          }`}
          onClick={() => onSelect(professional)}
        >
          <img
            src={professional.image}
            alt={professional.fullName}
            className="rounded-circle"
            width="32"
            height="32"
          />
          <div>
            <div className="fw-medium text-dark">{professional.fullName}</div>
            <small className="text-muted">{professional.profession}</small>
          </div>
        </button>
      ))}
    </div>
  );
}