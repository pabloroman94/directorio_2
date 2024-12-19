import { MapPin } from 'lucide-react';
import type { Location } from '../../../types/service';

interface LocationMapProps {
  location: Location;
  title: string;
}

export function LocationMap({ location, title }: LocationMapProps) {
  const { address, city, coordinates } = location;
  const formattedAddress = `${address}, ${city}`;

  const handleViewMap = () => {
    const mapsUrl = coordinates
      ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`;
    
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="bg-light rounded p-3 mt-4">
      <div className="d-flex gap-3 mb-3">
        <MapPin size={24} className="text-primary flex-shrink-0" />
        <div>
          <div className="fw-medium">{title}</div>
          <div className="text-muted small">{formattedAddress}</div>
        </div>
      </div>
      <button 
        className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
        onClick={handleViewMap}
      >
        <MapPin size={18} />
        Ver en Google Maps
      </button>
    </div>
  );
}





// --- Bloque duplicado comentado para evitar errores. ---
// --- NO se ha eliminado nada, todo el código original sigue aquí. ---

/*
import { MapPin } from 'lucide-react';
import type { Location } from '../../../types/service';

interface LocationMapProps {
  location: Location;
  title: string;
}

export function LocationMap({ location, title }: LocationMapProps) {
  const { address, city, coordinates } = location;
  const formattedAddress = `${address}, ${city}`;

  const handleViewMap = () => {
    const mapsUrl = coordinates
      ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`;
    
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="bg-light rounded p-3 mt-4">
      <div className="d-flex gap-3 mb-3">
        <MapPin size={24} className="text-primary flex-shrink-0" />
        <div>
          <div className="fw-medium">{title}</div>
          <div className="text-muted small">{formattedAddress}</div>
        </div>
      </div>
      <button 
        className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
        onClick={handleViewMap}
      >
        <MapPin size={18} />
        Ver en Google Maps
      </button>
    </div>
  );
}
*/
