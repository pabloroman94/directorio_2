import { useState } from 'react';
import { Building2, FileText, Hash, Briefcase, Users, Calendar } from 'lucide-react';
import { Input } from '../../../../ui/Input';
import { ImageUpload } from '../../../../ui/ImageUpload';
import type { CompanyProfile } from '../../../../../types/profile';

interface BasicInfoSectionProps {
  profile: CompanyProfile;
  onUpdate: (data: Partial<CompanyProfile>) => Promise<void>;
  onImageUpload: (file: File) => Promise<void>;
  isSaving: boolean;
}

export default function BasicInfoSection({
  profile,
  onUpdate,
  onImageUpload,
  isSaving
}: BasicInfoSectionProps) {
  const [formData, setFormData] = useState({
    companyName: profile.companyName,
    legalName: profile.legalName,
    taxId: profile.taxId,
    industry: profile.industry,
    employeeCount: profile.employeeCount,
    foundedYear: profile.foundedYear
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-4">
        <div className="col-12">
          <ImageUpload
            label="Logo Corporativo"
            value={profile.logo}
            onChange={(file) => onImageUpload(file)}
            required
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Nombre Comercial"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            icon={<Building2 />}
            required
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Razón Social"
            value={formData.legalName}
            onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
            icon={<FileText />}
            required
          />
        </div>

        <div className="col-md-6">
          <Input
            label="RUT/NIT"
            value={formData.taxId}
            onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
            icon={<Hash />}
            required
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Sector Industrial"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            icon={<Briefcase />}
            required
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Número de Empleados"
            type="number"
            value={formData.employeeCount.toString()}
            onChange={(e) => setFormData({ ...formData, employeeCount: parseInt(e.target.value) })}
            icon={<Users />}
            required
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Año de Fundación"
            type="number"
            value={formData.foundedYear.toString()}
            onChange={(e) => setFormData({ ...formData, foundedYear: parseInt(e.target.value) })}
            icon={<Calendar />}
            required
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </div>
    </form>
  );
}