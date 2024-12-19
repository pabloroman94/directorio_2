import { ProfessionalCard } from './ProfessionalCard';
import { CompanyCard } from './CompanyCard';
import type { ProfessionalRegistration, CompanyRegistration } from '../../types/registration';

interface CardListProps {
  items: (ProfessionalRegistration | CompanyRegistration)[];
  onItemClick?: (item: ProfessionalRegistration | CompanyRegistration) => void;
}

export function CardList({ items, onItemClick }: CardListProps) {
  return (
    <div className="row g-4">
      {items.map((item) => (
        <div key={item.type === 'professional' ? item.fullName : item.commercialName} className="col-md-6 col-lg-4">
          {item.type === 'professional' ? (
            <ProfessionalCard
              professional={item}
              onClick={() => onItemClick?.(item)}
            />
          ) : (
            <CompanyCard
              company={item}
              onClick={() => onItemClick?.(item)}
            />
          )}
        </div>
      ))}
    </div>
  );
}