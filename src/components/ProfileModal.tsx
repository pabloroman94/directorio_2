import { MapPin, Star, Phone, Mail } from 'lucide-react';
import type { Professional } from '../types';
import { PhotoGallery } from './gallery/PhotoGallery';
import { SocialButtons } from './social/SocialButtons';

interface ProfileModalProps {
  professional: Professional;
  onClose: () => void;
}

export default function ProfileModal({ professional, onClose }: ProfileModalProps) {
  // Ejemplo de fotos - en un caso real vendrían de la API
  const photos = [
    professional.image,
    'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
  ];

  // Ejemplo de redes sociales - en un caso real vendrían de la API
  const social = {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  };

  return (
    <>
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <PhotoGallery photos={photos} />
              
              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h2 className="h3 mb-1">{professional.fullName}</h2>
                    <p className="text-muted mb-1">{professional.profession}</p>
                    {professional.company && (
                      <p className="text-muted mb-0">{professional.company}</p>
                    )}
                  </div>
                  <div className="text-end">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Star size={20} className="text-warning" />
                      <span className="fw-medium">{professional.rating}</span>
                      <span className="text-muted">({professional.reviews} reseñas)</span>
                    </div>
                  </div>
                </div>

                <hr className="my-3" />

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center gap-2 text-muted">
                      <MapPin size={20} />
                      <span>{professional.city}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center gap-2 text-muted">
                      <Phone size={20} />
                      <span>{professional.phone}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex align-items-center gap-2 text-muted">
                      <Mail size={20} />
                      <span>{professional.email}</span>
                    </div>
                  </div>
                </div>

                <hr className="my-3" />

                <div>
                  <h5>Sobre mí</h5>
                  <p className="text-muted">{professional.description}</p>
                </div>

                <div className="mt-3">
                  <h5>Especialidades</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {professional.tags.map((tag) => (
                      <span key={tag} className="badge rounded-pill tag-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <h5>Redes Sociales</h5>
                  <SocialButtons {...social} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
}