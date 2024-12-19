import type { CompanyProfile } from '../../../../../types/profile';

interface ContactSectionProps {
  profile: CompanyProfile;
  onUpdate: (data: Partial<CompanyProfile>) => Promise<void>;
  isSaving: boolean;
}

export default function ContactSection({ profile, onUpdate, isSaving }: ContactSectionProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate({
      contact: profile.contact
    });
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#contact">
          Información de Contacto
        </button>
      </h2>
      <div id="contact" className="accordion-collapse collapse">
        <div className="accordion-body">
          <form onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 