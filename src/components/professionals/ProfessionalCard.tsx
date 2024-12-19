import { MapPin, Star } from 'lucide-react';
import type { Professional } from '../../types';

interface ProfessionalCardProps {
  professional: Professional;
  onClick: () => void;
}

export default function ProfessionalCard({ professional, onClick }: ProfessionalCardProps) {
  return (
    <div className="card h-100 card-hover" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-body">
        <div className="d-flex gap-3">
          <img
            src={professional.image}
            alt={professional.fullName}
            className="rounded-circle"
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
          <div>
            <h5 className="card-title mb-1">{professional.fullName}</h5>
            <p className="card-text text-muted mb-1">{professional.profession}</p>
            {professional.company && (
              <small className="text-muted">{professional.company}</small>
            )}
            <div className="d-flex align-items-center gap-2 mt-2 text-muted">
              <MapPin size={16} />
              <small>{professional.city}</small>
            </div>
            <div className="d-flex align-items-center gap-1 mt-2">
              <Star size={16} className="text-warning" />
              <small className="fw-medium">{professional.rating}</small>
              <small className="text-muted">({professional.reviews} reviews)</small>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <div className="d-flex flex-wrap gap-2">
            {professional.tags.map((tag) => (
              <span key={tag} className="badge rounded-pill tag-badge">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}