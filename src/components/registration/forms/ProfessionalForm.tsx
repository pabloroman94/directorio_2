import { useState } from 'react';
import { User, Briefcase, Award, Clock, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '../../ui/Input';
import { ImageUpload } from '../../ui/ImageUpload';
import { TagInput } from '../../ui/TagInput';
import type { ProfessionalRegistration } from '../../../types/registration';

interface ProfessionalFormProps {
  onSubmit: (data: ProfessionalRegistration) => void;
  isLoading?: boolean;
}

export function ProfessionalForm({ onSubmit, isLoading }: ProfessionalFormProps) {
  const [formData, setFormData] = useState<Omit<ProfessionalRegistration, 'profileImage'> & { profileImage?: File }>({
    type: 'professional',
    fullName: '',
    profession: '',
    yearsOfExperience: 0,
    expertise: [],
    contact: {
      email: '',
      phone: '',
      city: '',
      country: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid() && formData.profileImage) {
      onSubmit({
        ...formData,
        profileImage: formData.profileImage
      } as ProfessionalRegistration);
    }
  };

  const isFormValid = () => {
    // Implementar validación del formulario
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-12">
        <ImageUpload
          label="Foto de Perfil"
          value={formData.profileImage ? URL.createObjectURL(formData.profileImage) : undefined}
          onChange={(file) => setFormData({ ...formData, profileImage: file })}
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
          label="Profesión/Especialidad"
          value={formData.profession}
          onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
          icon={<Briefcase />}
          required
        />
      </div>

      <div className="col-md-6">
        <Input
          label="ID Profesional"
          value={formData.professionalId}
          onChange={(e) => setFormData({ ...formData, professionalId: e.target.value })}
          icon={<Award />}
        />
      </div>

      <div className="col-md-6">
        <Input
          label="Años de Experiencia"
          type="number"
          value={formData.yearsOfExperience?.toString()}
          onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) })}
          icon={<Clock />}
          required
        />
      </div>

      <div className="col-12">
        <TagInput
          label="Áreas de Expertise"
          value={formData.expertise || []}
          onChange={(tags) => setFormData({ ...formData, expertise: tags })}
          placeholder="Agregar habilidad y presionar Enter"
          required
        />
      </div>

      <div className="col-md-6">
        <Input
          label="Email"
          type="email"
          value={formData.contact?.email}
          onChange={(e) => setFormData({
            ...formData,
            contact: { ...formData.contact, email: e.target.value }
          })}
          icon={<Mail />}
          required
        />
      </div>

      <div className="col-md-6">
        <Input
          label="Teléfono"
          type="tel"
          value={formData.contact?.phone}
          onChange={(e) => setFormData({
            ...formData,
            contact: { ...formData.contact, phone: e.target.value }
          })}
          icon={<Phone />}
          required
        />
      </div>

      <div className="col-12">
        <Input
          label="Ciudad"
          value={formData.contact?.city}
          onChange={(e) => setFormData({
            ...formData,
            contact: { ...formData.contact, city: e.target.value }
          })}
          icon={<MapPin />}
          required
        />
      </div>

      <div className="col-12">
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading ? 'Registrando...' : 'Completar Registro'}
        </button>
      </div>
    </form>
  );
}