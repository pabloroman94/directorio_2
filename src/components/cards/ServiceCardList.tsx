import { ServiceCard } from './ServiceCard';
import type { ServiceProvider } from '../../types/service';

interface ServiceCardListProps {
  providers: ServiceProvider[];
  onProviderClick?: (provider: ServiceProvider) => void;
}

export function ServiceCardList({ providers, onProviderClick }: ServiceCardListProps) {
  return (
    <div className="row g-4">
      {providers.map((provider) => (
        <div key={provider.id} className="col-md-6 col-lg-4">
          <ServiceCard
            provider={provider}
            onClick={() => onProviderClick?.(provider)}
          />
        </div>
      ))}
    </div>
  );
}