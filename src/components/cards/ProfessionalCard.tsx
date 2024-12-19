import { MapPin, Star } from 'lucide-react';
import type { ProfessionalService as Professional } from '../../types/service';
import { useState } from 'react';

interface ProfessionalCardProps {
  professional: Professional;
  onClick?: () => void;
}

export function ProfessionalCard({ professional, onClick }: ProfessionalCardProps) {
  const [imageError, setImageError] = useState(false);
  const defaultImage = '/assets/default-profile.png';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="card h-100 shadow-sm hover-effect" 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={imageError ? defaultImage : professional.image}
            onError={handleImageError}
            alt={professional.fullName}
            className="rounded-circle me-3"
            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
          />
          <div>
            <h5 className="card-title mb-1">{professional.fullName}</h5>
            <p className="text-muted small mb-0">{professional.profession}</p>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="d-flex align-items-center text-muted small mb-2">
            <MapPin size={16} className="me-2" />
            <span>{professional.contact.location.city}</span>
          </div>
          <div className="d-flex align-items-center">
            <Star size={16} className="text-warning me-1" />
            <span className="fw-bold me-1">{professional.rating}</span>
            <span className="text-muted small">({professional.reviewCount} reseñas)</span>
          </div>
        </div>

        <div className="mb-3">
          {professional.specialties.slice(0, 3).map((specialty, index) => (
            <span 
              key={index}
              className="badge bg-light text-dark me-1 mb-1"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}