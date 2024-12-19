import { useState } from 'react';
import { Building2, FileText, Hash, Briefcase, Users, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '../../ui/Input';
import { ImageUpload } from '../../ui/ImageUpload';
import type { CompanyRegistration } from '../../../types/registration';

interface CompanyFormProps {
  onSubmit: (data: CompanyRegistration) => void;
  isLoading?: boolean;
}

export function CompanyForm({ onSubmit, isLoading }: CompanyFormProps) {
  const [formData, setFormData] = useState<Omit<CompanyRegistration, 'logo'> & { logo?: File }>({
    type: 'company',
    contact: {
      email: '',
      phone: '',
      city: ''
    },
    commercialName: '',
    legalName: '',
    taxId: '',
    industry: '',
    employeeCount: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(formData as CompanyRegistration);
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
          label="Logo Corporativo"
          value={formData.logo ? URL.createObjectURL(formData.logo) : undefined}
          onChange={(file) => setFormData({ ...formData, logo: file })}
          required
        />
      </div>

      <div className="col-md-6">
        <Input
          label="Nombre Comercial"
          value={formData.commercialName}
          onChange={(e) => setFormData({ ...formData, commercialName: e.target.value })}
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

      <div className="col-12">
        <Input
          label="Número de Empleados"
          type="number"
          value={formData.employeeCount?.toString()}
          onChange={(e) => setFormData({ ...formData, employeeCount: parseInt(e.target.value) })}
          icon={<Users />}
          required
        />
      </div>

      <div className="col-md-6">
        <Input
          label="Email Corporativo"
          type="email"
          value={formData.contact.email}
          onChange={(e) => setFormData({
            ...formData,
            contact: {
              email: e.target.value,
              phone: formData.contact.phone,
              city: formData.contact.city
            }
          })}
          icon={<Mail />}
          required
        />
      </div>

      <div className="col-md-6">
        <Input
          label="Teléfono"
          type="tel"
          value={formData.contact.phone}
          onChange={(e) => setFormData({
            ...formData,
            contact: { 
              email: formData.contact.email,
              phone: e.target.value,
              city: formData.contact.city
            }
          })}
          icon={<Phone />}
          required
        />
      </div>

      <div className="col-12">
        <Input
          label="Ciudad"
          value={formData.contact.city}
          onChange={(e) => setFormData({
            ...formData,
            contact: {
              email: formData.contact.email,
              phone: formData.contact.phone,
              city: e.target.value
            }
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