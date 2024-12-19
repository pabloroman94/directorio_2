import { useState } from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter } from 'lucide-react';
import { Input } from '../../../../ui/Input';
import type { ProfessionalProfile } from '../../../../../types/profile';

interface ContactSectionProps {
  contact: ProfessionalProfile['contact'];
  onUpdate: (data: Partial<ProfessionalProfile>) => Promise<void>;
  isSaving: boolean;
}

export default function ContactSection({
  contact,
  onUpdate,
  isSaving
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    contact: { ...contact },
    social: {
      linkedin: '',
      github: '',
      twitter: '',
      website: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-4">
        <div className="col-md-6">
          <Input
            label="Email"
            type="email"
            value={formData.contact.email}
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
            value={formData.contact.phone}
            onChange={(e) => setFormData({
              ...formData,
              contact: { ...formData.contact, phone: e.target.value }
            })}
            icon={<Phone />}
            required
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Ciudad"
            value={formData.contact.city}
            onChange={(e) => setFormData({
              ...formData,
              contact: { ...formData.contact, city: e.target.value }
            })}
            icon={<MapPin />}
            required
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Sitio Web"
            type="url"
            value={formData.contact.website || ''}
            onChange={(e) => setFormData({
              ...formData,
              contact: { ...formData.contact, website: e.target.value }
            })}
            icon={<Globe />}
          />
        </div>

        <div className="col-12">
          <h5 className="mb-3">Redes Sociales</h5>
        </div>

        <div className="col-md-6">
          <Input
            label="LinkedIn"
            type="url"
            value={formData.social.linkedin}
            onChange={(e) => setFormData({
              ...formData,
              social: { ...formData.social, linkedin: e.target.value }
            })}
            icon={<Linkedin />}
          />
        </div>

        <div className="col-md-6">
          <Input
            label="GitHub"
            type="url"
            value={formData.social.github}
            onChange={(e) => setFormData({
              ...formData,
              social: { ...formData.social, github: e.target.value }
            })}
            icon={<Github />}
          />
        </div>

        <div className="col-md-6">
          <Input
            label="Twitter"
            type="url"
            value={formData.social.twitter}
            onChange={(e) => setFormData({
              ...formData,
              social: { ...formData.social, twitter: e.target.value }
            })}
            icon={<Twitter />}
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