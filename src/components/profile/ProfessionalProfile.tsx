import { useState } from 'react';
import { MapPin, Mail, Phone, Globe, Star, Award, Calendar, Download, Share2 } from 'lucide-react';
import type { ProfessionalService as Professional } from '../../types/service';

interface ProfessionalProfileProps {
  professional: Professional;
}

export function ProfessionalProfile({ professional }: ProfessionalProfileProps) {
  const [activeTab, setActiveTab] = useState('portfolio');

  return (
    <div className="container py-4">
      {/* Header Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-3 text-center">
              <img
                src={professional.image}
                alt={professional.fullName}
                className="rounded-circle img-thumbnail mb-3"
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
              <div className="d-flex justify-content-center gap-2 mb-3">
                <button className="btn btn-outline-primary btn-sm rounded-circle">
                  <Share2 size={18} />
                </button>
                <a 
                  href={professional.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm rounded-circle"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
            
            <div className="col-md-9">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="display-6 mb-1">{professional.fullName}</h1>
                  <h2 className="h4 text-primary mb-3">{professional.profession}</h2>
                  
                  <div className="d-flex align-items-center gap-3 text-muted mb-3">
                    <div className="d-flex align-items-center gap-1">
                      <MapPin size={16} />
                      <span>{professional.contact.location.city}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <Calendar size={16} />
                      <span>{professional.experience} años exp.</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <Star size={16} className="text-warning" />
                      <span>{professional.rating}</span>
                      <span className="text-muted">({professional.reviewCount} reseñas)</span>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <a 
                    href={`mailto:${professional.contact.email}`}
                    className="btn btn-primary d-flex align-items-center gap-2"
                  >
                    <Mail size={18} />
                    Email
                  </a>
                  <a 
                    href={`tel:${professional.contact.phone}`}
                    className="btn btn-outline-primary d-flex align-items-center gap-2"
                  >
                    <Phone size={18} />
                    Llamar
                  </a>
                  <a 
                    href={professional.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary d-flex align-items-center gap-2"
                  >
                    <Globe size={18} />
                    Web
                  </a>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="h6 mb-3">Especialidades</h3>
                <div className="d-flex flex-wrap gap-2">
                  {professional.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="badge bg-light text-dark d-flex align-items-center gap-1 p-2"
                    >
                      <Award size={14} className="text-primary" />
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-muted">{professional.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Documentos
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reseñas
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'portfolio' && (
          <div className="row g-4">
            {professional.portfolio.map((project, index) => (
              <div key={index} className="col-md-6">
                <div className="card h-100">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h4 className="h5 mb-2">{project.title}</h4>
                    <p className="text-muted">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="row g-4">
            {professional.resources.map((resource, index) => (
              <div key={index} className="col-md-6">
                <div className="card h-100">
                  <div className="card-body d-flex align-items-center gap-3">
                    <Download size={24} className="text-primary" />
                    <div className="flex-grow-1">
                      <h4 className="h6 mb-1">{resource.title}</h4>
                      <p className="text-muted small mb-0">{resource.type.toUpperCase()}</p>
                    </div>
                    <a 
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Descargar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 