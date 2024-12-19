import { Button } from '../ui/Button';
import { UserCircle, Building2 } from 'lucide-react';
import type { RegistrationType } from '../../types/registration';

interface RegistrationTypeSelectorProps {
  selectedType: RegistrationType | null;
  onSelect: (type: RegistrationType) => void;
}

export function RegistrationTypeSelector({ selectedType, onSelect }: RegistrationTypeSelectorProps) {
  return (
    <div className="row g-4">
      <div className="col-md-6">
        <Button
          variant={selectedType === 'professional' ? 'primary' : 'outline'}
          fullWidth
          onClick={() => onSelect('professional')}
          className="p-4 h-100 d-flex flex-column align-items-center gap-3"
        >
          <UserCircle size={48} />
          <div className="text-center">
            <h5 className="mb-2">Profesional Independiente</h5>
            <p className="text-muted mb-0">
              Para profesionales que ofrecen servicios de manera individual
            </p>
          </div>
        </Button>
      </div>
      <div className="col-md-6">
        <Button
          variant={selectedType === 'company' ? 'primary' : 'outline'}
          fullWidth
          onClick={() => onSelect('company')}
          className="p-4 h-100 d-flex flex-column align-items-center gap-3"
        >
          <Building2 size={48} />
          <div className="text-center">
            <h5 className="mb-2">Empresa</h5>
            <p className="text-muted mb-0">
              Para organizaciones y empresas que buscan presencia corporativa
            </p>
          </div>
        </Button>
      </div>
    </div>
  );
}