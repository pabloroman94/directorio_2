import { MapPin, Users, Globe, Phone, Briefcase } from 'lucide-react';
import type { CompanyService } from '../../types/service';
import { useState, useEffect } from 'react';

interface CompanyCardProps {
  company: CompanyService;
  onClick?: () => void;
}

export function CompanyCard({ company, onClick }: CompanyCardProps) {
  const [logoUrl, setLogoUrl] = useState<string>('');

  useEffect(() => {
    if (company.logo instanceof File) {
      setLogoUrl(URL.createObjectURL(company.logo));
      return () => URL.revokeObjectURL(logoUrl);
    } else {
      setLogoUrl(company.logo);
    }
  }, [company.logo]);

  return (
    <div 
      className="card border-0 shadow-sm h-100 card-hover" 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="position-absolute top-0 end-0 m-3">
        <span className="badge bg-secondary rounded-pill px-3">Empresa</span>
      </div>
      
      <div className="card-body p-4">
        <div className="d-flex align-items-center gap-4">
          <div 
            className="bg-light rounded-3 p-3 d-flex align-items-center justify-content-center"
            style={{ width: '90px', height: '90px' }}
          >
            <img
              src={logoUrl}
              alt={company.companyName}
              style={{ 
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
          <div className="flex-grow-1">
            <h5 className="card-title fw-bold mb-1">{company.companyName}</h5>
            <p className="text-primary mb-2">{company.industry}</p>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2 text-muted">
                <MapPin size={16} />
                <small>{company.contact.location.city}</small>
              </div>
              <div className="d-flex align-items-center gap-2 text-muted">
                <Users size={16} />
                <small>{company.employeeCount} empleados</small>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="row g-3">
            <div className="col-6">
              <div className="p-3 rounded-3 bg-light">
                <div className="d-flex align-items-center gap-2 text-muted mb-1">
                  <Briefcase size={16} />
                  <small className="fw-medium">Sector</small>
                </div>
                <div>{company.industry}</div>
              </div>
            </div>
            <div className="col-6">
              <div className="p-3 rounded-3 bg-light">
                <div className="d-flex align-items-center gap-2 text-muted mb-1">
                  <Users size={16} />
                  <small className="fw-medium">Tamaño</small>
                </div>
                <div>{company.employeeCount} empleados</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 d-flex gap-2">
          <a 
            href={`tel:${company.contact.phone}`} 
            className="btn btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2"
          >
            <Phone size={18} />
            Contactar
          </a>
          <a 
            href={company.contact.website} 
            className="btn btn-outline-primary d-flex align-items-center justify-content-center"
            style={{ width: '46px' }}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Globe size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}