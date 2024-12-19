import { useState } from 'react';
import { User, Briefcase, Award, Languages, Clock } from 'lucide-react';
import { Input } from '../../../../ui/Input';
import { TagInput } from '../../../../ui/TagInput';
import { ImageUpload } from '../../../../ui/ImageUpload';
import type { ProfessionalProfile } from '../../../../../types/profile';

interface BasicInfoSectionProps {
  profile: ProfessionalProfile;
  onUpdate: (data: Partial<ProfessionalProfile>) => Promise<void>;
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
    fullName: profile.fullName,
    profession: profile.profession,
    specialties: profile.specialties,
    experience: profile.experience,
    hourlyRate: profile.hourlyRate,
    languages: profile.languages,
    availability: profile.availability
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
            label="Foto de Perfil"
            value={profile.image}
            onChange={(file) => onImageUpload(file)}
            required
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Nombre Completo"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            icon={<User />}
            required
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Profesión"
            value={formData.profession}
            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
            icon={<Briefcase />}
            required
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Años de Experiencia"
            type="number"
            value={formData.experience.toString()}
            onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
            icon={<Award />}
            required
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Tarifa por Hora ($)"
            type="number"
            value={formData.hourlyRate.toString()}
            onChange={(e) => setFormData({ ...formData, hourlyRate: parseInt(e.target.value) })}
            icon={<Clock />}
            required
          />
        </div>

        <div className="col-12">
          <TagInput
            label="Especialidades"
            value={formData.specialties}
            onChange={(tags) => setFormData({ ...formData, specialties: tags })}
            icon={<Award />}
            placeholder="Agregar especialidad y presionar Enter"
            required
          />
        </div>

        <div className="col-12">
          <TagInput
            label="Idiomas"
            value={formData.languages}
            onChange={(tags) => setFormData({ ...formData, languages: tags })}
            icon={<Languages />}
            placeholder="Agregar idioma y presionar Enter"
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