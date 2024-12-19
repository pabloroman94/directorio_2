import type { CompanyProfile } from '../../../../../types/profile';

interface ServicesSectionProps {
  profile: CompanyProfile;
  onUpdate: (data: Partial<CompanyProfile>) => Promise<void>;
  isSaving: boolean;
}

export default function ServicesSection({ profile, onUpdate, isSaving }: ServicesSectionProps) {
  const handleAddService = async () => {
    await onUpdate({
      services: [...profile.services, { name: '', description: '' }]
    });
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#services">
          Servicios ({profile.services.length})
        </button>
      </h2>
      <div id="services" className="accordion-collapse collapse">
        <div className="accordion-body">
          <button className="btn btn-primary" onClick={handleAddService} disabled={isSaving}>
            Agregar Servicio
          </button>
        </div>
      </div>
    </div>
  );
} 