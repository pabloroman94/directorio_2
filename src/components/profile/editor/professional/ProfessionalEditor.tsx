import { useState } from 'react';
import { Tabs } from '../../../../components/ui/Tabs';
import BasicInfoSection from './sections/BasicInfoSection';
import PortfolioSection from './sections/PortfolioSection';
import ServicesSection from './sections/ServicesSection';
import CredentialsSection from './sections/CredentialsSection';
import ContactSection from './sections/ContactSection';
import type { ProfessionalProfile } from '../../../../types/profile';

interface ProfessionalEditorProps {
  profile: ProfessionalProfile;
  onUpdate: (data: Partial<ProfessionalProfile>) => Promise<void>;
  onImageUpload: (file: File) => Promise<void>;
  isSaving: boolean;
}

export default function ProfessionalEditor({
  profile,
  onUpdate,
  onImageUpload,
  isSaving
}: ProfessionalEditorProps) {
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Información Básica' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services', label: 'Servicios' },
    { id: 'credentials', label: 'Credenciales' },
    { id: 'contact', label: 'Contacto' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <BasicInfoSection
            profile={profile}
            onUpdate={onUpdate}
            onImageUpload={onImageUpload}
            isSaving={isSaving}
          />
        );
      case 'portfolio':
        return (
          <PortfolioSection
            portfolio={profile.portfolio}
            onUpdate={onUpdate}
            isSaving={isSaving}
          />
        );
      case 'services':
        return (
          <ServicesSection
            services={profile.services}
            onUpdate={onUpdate}
            isSaving={isSaving}
          />
        );
      case 'credentials':
        return (
          <CredentialsSection
            credentials={profile.credentials}
            onUpdate={onUpdate}
            isSaving={isSaving}
          />
        );
      case 'contact':
        return (
          <ContactSection
            contact={profile.contact}
            onUpdate={onUpdate}
            isSaving={isSaving}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h2 className="card-title mb-4">Editar Perfil Profesional</h2>
        
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}