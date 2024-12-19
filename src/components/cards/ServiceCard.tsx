import { MapPin, Star, Users, Globe, Phone, Mail } from 'lucide-react';
import type { ServiceProvider } from '../../types/service';
import './ServiceCard.css';

interface ServiceCardProps {
  provider: ServiceProvider;
  onClick?: () => void;
}

export function ServiceCard({ provider, onClick }: ServiceCardProps) {
  if (provider.type === 'professional') {
    return (
      <div 
        className="card service-card professional-card" 
        onClick={onClick}
      >
        <div className="card-badge professional">Profesional</div>
        <div className="card-body">
          <div className="profile-section">
            <img
              src={provider.portfolio[0]?.imageUrl || 'https://via.placeholder.com/150'}
              alt={provider.fullName}
              className="profile-image"
            />
            <div className="profile-info">
              <h5 className="card-title">{provider.fullName}</h5>
              <p className="profession">{provider.profession}</p>
              <div className="location">
                <MapPin size={16} />
                <span>{provider.coverageAreas[0]}</span>
              </div>
              <div className="rating">
                <Star size={16} className="star" />
                <span className="rating-value">{provider.rating}</span>
                <span className="reviews">({provider.reviewCount} reseñas)</span>
              </div>
            </div>
          </div>

          <div className="specialties">
            {provider.specialties.map((specialty) => (
              <span key={specialty} className="specialty-tag">
                {specialty}
              </span>
            ))}
          </div>

          <div className="rate-info">
            <span className="rate">${provider.hourlyRate}/hora</span>
            <span className="experience">{provider.experience} años exp.</span>
          </div>

          <div className="contact-buttons">
            <button className="btn-contact">
              <Mail size={18} />
              Contactar
            </button>
            <button className="btn-portfolio">
              <Globe size={18} />
              Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Company Card
  return (
    <div 
      className="card service-card company-card" 
      onClick={onClick}
    >
      <div className="card-badge company">Empresa</div>
      <div className="card-body">
        <div className="company-section">
          <div className="logo-container">
            <img
              src="https://via.placeholder.com/150"
              alt={provider.companyName}
              className="company-logo"
            />
          </div>
          <div className="company-info">
            <h5 className="card-title">{provider.companyName}</h5>
            <p className="legal-name">{provider.legalName}</p>
            <div className="company-meta">
              <div className="location">
                <MapPin size={16} />
                <span>{provider.coverageAreas[0]}</span>
              </div>
              <div className="employees">
                <Users size={16} />
                <span>{provider.employeeCount} empleados</span>
              </div>
            </div>
          </div>
        </div>

        <div className="services-section">
          {provider.services.map((service) => (
            <span key={service} className="service-tag">
              {service}
            </span>
          ))}
        </div>

        <div className="company-stats">
          <div className="stat-item">
            <Star size={16} className="star" />
            <span className="rating-value">{provider.rating}</span>
            <span className="reviews">({provider.reviewCount})</span>
          </div>
          <div className="stat-item">
            <span className="founded">Desde {provider.foundedYear}</span>
          </div>
        </div>

        <div className="contact-buttons">
          <button className="btn-contact">
            <Phone size={18} />
            Contactar
          </button>
          <button className="btn-website">
            <Globe size={18} />
            Sitio Web
          </button>
        </div>
      </div>
    </div>
  );
}