import type { CompanyProfile } from '../../../../../types/profile';

interface ResourcesSectionProps {
  profile: CompanyProfile;
  onUpdate: (data: Partial<CompanyProfile>) => Promise<void>;
  isSaving: boolean;
}

export default function ResourcesSection({ profile, onUpdate, isSaving }: ResourcesSectionProps) {
  const handleAddResource = async () => {
    await onUpdate({
      resources: [...profile.resources, { type: 'pdf', title: '', url: '' }]
    });
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#resources">
          Recursos ({profile.resources.length})
        </button>
      </h2>
      <div id="resources" className="accordion-collapse collapse">
        <div className="accordion-body">
          <button className="btn btn-primary" onClick={handleAddResource} disabled={isSaving}>
            Agregar Recurso
          </button>
        </div>
      </div>
    </div>
  );
} 