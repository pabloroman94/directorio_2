import { Star, Users, Globe, Phone, Mail, Share2 } from 'lucide-react';
import { SocialLinks } from './actions/SocialLinks';
import { LocationMap } from './actions/LocationMap';
import { DownloadResume } from './actions/DownloadResume';
import type { ServiceProvider } from '../../types/service';
import './ServiceProfileView.css';

interface ServiceProfileViewProps {
  provider: ServiceProvider;
}

export function ServiceProfileView({ provider }: ServiceProfileViewProps) {
  const handleContact = (type: 'email' | 'phone' | 'website') => {
    const contact = provider.contact;
    
    switch (type) {
      case 'email': {
        const mailtoUrl = `mailto:${contact.email}`;
        window.location.href = mailtoUrl;
        break;
      }
      case 'phone': {
        const telUrl = `tel:${contact.phone}`;
        window.location.href = telUrl;
        break;
      }
      case 'website': {
        if (contact.website) {
          window.open(contact.website, '_blank');
        }
        break;
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: provider.type === 'professional' ? provider.fullName : provider.companyName,
          text: `Mira el perfil de ${
            provider.type === 'professional' ? provider.fullName : provider.companyName
          } en nuestra plataforma`,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Columna Izquierda - Información de Contacto */}
        <div className="col-lg-4">
          <div className="card sticky-top" style={{ top: '1rem' }}>
            <div className="card-body">
              <div className="text-center mb-4">
                {provider.type === 'professional' ? (
                  <>
                    <img
                      src={provider.portfolio[0]?.imageUrl}
                      alt={provider.fullName}
                      className="profile-image rounded-circle mb-3"
                    />
                    <h4 className="card-title mb-1">{provider.fullName}</h4>
                    <p className="text-primary mb-0">{provider.profession}</p>
                  </>
                ) : (
                  <>
                    <div className="bg-light rounded p-3 d-inline-block mb-3">
                      <img
                        src={provider.projects[0]?.image}
                        alt={provider.companyName}
                        className="company-logo"
                      />
                    </div>
                    <h4 className="card-title mb-1">{provider.companyName}</h4>
                    <p className="text-muted mb-0">{provider.legalName}</p>
                  </>
                )}
              </div>

              {/* Botones de Contacto Rápido */}
              <div className="contact-buttons">
                <button
                  className="btn btn-primary contact-btn"
                  onClick={() => handleContact('email')}
                >
                  <Mail size={20} />
                  Enviar Email
                </button>
                <button
                  className="btn btn-success contact-btn"
                  onClick={() => handleContact('phone')}
                >
                  <Phone size={20} />
                  Llamar
                </button>
                {provider.contact.website && (
                  <button
                    className="btn btn-info text-white contact-btn"
                    onClick={() => handleContact('website')}
                  >
                    <Globe size={20} />
                    Sitio Web
                  </button>
                )}
              </div>

              {/* Redes Sociales */}
              <SocialLinks links={provider.social} />

              {/* Mapa de Ubicación */}
              <LocationMap
                location={provider.contact.location}
                title={provider.type === 'professional' ? 'Ubicación' : 'Oficina Principal'}
              />

              {/* Descargar Recursos */}
              <DownloadResume resources={provider.resources} />

              {/* Compartir Perfil */}
              <button
                className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2 mt-3"
                onClick={handleShare}
              >
                <Share2 size={20} />
                Compartir Perfil
              </button>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Contenido Principal */}
        <div className="col-lg-8">
          {/* Calificación y Estadísticas */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="stats-container">
                <div className="stat-item">
                  <div className="h2 mb-0 d-flex align-items-center gap-2">
                    <Star size={24} className="text-warning" />
                    {provider.rating}
                  </div>
                  <small className="text-muted">
                    {provider.reviewCount} reseñas
                  </small>
                </div>
                {provider.type === 'professional' ? (
                  <div className="stat-item">
                    <div className="h2 mb-0">{provider.experience}</div>
                    <small className="text-muted">Años exp.</small>
                  </div>
                ) : (
                  <div className="stat-item">
                    <div className="h2 mb-0 d-flex align-items-center gap-2">
                      <Users size={24} />
                      {provider.employeeCount}
                    </div>
                    <small className="text-muted">Empleados</small>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Especialidades/Servicios */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">
                {provider.type === 'professional' ? 'Especialidades' : 'Servicios'}
              </h5>
              <div className="specialties-grid">
                {(provider.type === 'professional' ? provider.specialties : provider.services).map(
                  (item) => (
                    <span key={item} className="specialty-tag">
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Portafolio/Proyectos */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">
                {provider.type === 'professional' ? 'Portfolio' : 'Proyectos'}
              </h5>
              <div className="row g-4">
                {(provider.type === 'professional' ? provider.portfolio : provider.projects).map(
                  (item, index) => (
                    <div key={index} className="col-md-6">
                      <div className="portfolio-item">
                        <img
                          src={provider.type === 'professional' ? 
                            (item as { imageUrl: string }).imageUrl : 
                            (item as { image: string }).image
                          }
                          alt={item.title}
                          className="portfolio-image"
                        />
                        <div className="portfolio-content">
                          <h6>{item.title}</h6>
                          <p className="text-muted mb-0">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
