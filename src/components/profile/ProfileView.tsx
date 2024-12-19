import { MapPin, Mail, Phone, Globe, MessageCircle, Calendar, Share2 } from 'lucide-react';
import { PhotoGallery } from '../gallery/PhotoGallery';
import { SocialButtons } from '../social/SocialButtons';
import { DownloadCV } from './DownloadCV';
import type { ProfessionalProfile as Professional } from '../../types/profile';

interface ProfileViewProps {
  professional: Professional;
  onClose?: () => void;
}

export default function ProfileView({ professional }: ProfileViewProps) {
  const handleEmailClick = () => {
    window.location.href = `mailto:${professional.contact.email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${professional.contact.phone}`;
  };

  const handleWhatsAppClick = () => {
    const message = `Hola ${professional.fullName}, encontré tu perfil en el Directorio Profesional y me gustaría ponerme en contacto contigo.`;
    const whatsappUrl = `https://wa.me/${professional.contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleScheduleClick = () => {
    // En una aplicación real, esto abriría un modal de programación o redireccionaría a un servicio de calendario
    alert('La funcionalidad de agenda se implementará próximamente');
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: professional.fullName,
          text: `Mira el perfil profesional de ${professional.fullName}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error al compartir:', err);
      }
    } else {
      // Fallback para navegadores que no soportan Web Share API
      alert('Funcionalidad de compartir no disponible');
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Left Column - Contact Info */}
        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: '1rem' }}>
            <div className="card-body">
              <div className="text-center mb-4">
                <img
                  src={professional.image}
                  alt={professional.fullName}
                  className="rounded-circle mb-3"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <h4 className="card-title mb-1">{professional.fullName}</h4>
                <p className="text-muted mb-0">{professional.profession}</p>
              </div>

              {/* Quick Contact Buttons */}
              <div className="d-grid gap-2 mb-4">
                <button 
                  className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                  onClick={handleEmailClick}
                >
                  <Mail size={20} />
                  Enviar Email
                </button>
                <button 
                  className="btn btn-success d-flex align-items-center justify-content-center gap-2"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </button>
                <button 
                  className="btn btn-info text-white d-flex align-items-center justify-content-center gap-2"
                  onClick={handleScheduleClick}
                >
                  <Calendar size={20} />
                  Agendar Reunión
                </button>
                <DownloadCV professional={professional} />
              </div>

              {/* Contact Information */}
              <div className="mb-4">
                <h5 className="mb-3">Información de Contacto</h5>
                <div className="d-flex flex-column gap-3">
                  <a 
                    href={`tel:${professional.contact.phone}`}
                    className="text-decoration-none text-body d-flex align-items-center gap-2"
                    onClick={handlePhoneClick}
                  >
                    <Phone size={20} className="text-primary" />
                    {professional.contact.phone}
                  </a>
                  <a 
                    href={`mailto:${professional.contact.email}`}
                    className="text-decoration-none text-body d-flex align-items-center gap-2"
                  >
                    <Mail size={20} className="text-primary" />
                    {professional.contact.email}
                  </a>
                  <div className="d-flex align-items-center gap-2">
                    <MapPin size={20} className="text-primary" />
                    {professional.contact.city}
                  </div>
                  {professional.contact.website && (
                    <a 
                      href={professional.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-body d-flex align-items-center gap-2"
                    >
                      <Globe size={20} className="text-primary" />
                      Sitio Web
                    </a>
                  )}
                </div>
              </div>

              {/* Social Media */}
              <div className="mb-4">
                <h5 className="mb-3">Redes Sociales</h5>
                <SocialButtons
                  facebook="https://facebook.com"
                  instagram="https://instagram.com"
                  linkedin="https://linkedin.com"
                />
              </div>

              {/* Share Profile */}
              <button 
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={handleShareClick}
              >
                <Share2 size={20} />
                Compartir Perfil
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Main Content */}
        <div className="col-lg-8">
          {/* Rating and Reviews */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="display-4 fw-bold text-primary">{professional.rating}</div>
                <div>
                  <div className="d-flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i}
                        className={`bi bi-star-fill ${i < Math.floor(professional.rating) ? 'text-warning' : 'text-muted'}`}
                      ></i>
                    ))}
                  </div>
                  <div className="text-muted">Basado en {professional.reviewCount} reseñas</div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Sobre mí</h5>
              <p className="card-text text-muted">{professional.description}</p>
            </div>
          </div>

          {/* Specialties/Tags */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Especialidades</h5>
              <div className="d-flex flex-wrap gap-2">
                {professional.specialties.map((specialty) => (
                  <span key={specialty} className="badge rounded-pill tag-badge">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Galería</h5>
              <PhotoGallery
                photos={[
                  professional.image,
                  'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0',
                  'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}