import type { CompanyProfile } from '../../../../../types/profile';

interface TeamSectionProps {
  profile: CompanyProfile;
  onUpdate: (data: Partial<CompanyProfile>) => Promise<void>;
  isSaving: boolean;
}

export default function TeamSection({ profile, onUpdate, isSaving }: TeamSectionProps) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#team">
          Equipo ({profile.team.length})
        </button>
      </h2>
      <div id="team" className="accordion-collapse collapse">
        <div className="accordion-body">
          <button className="btn btn-primary" onClick={() => onUpdate({ team: [...profile.team, {}] })} disabled={isSaving}>
            Agregar Miembro
          </button>
        </div>
      </div>
    </div>
  );
} 