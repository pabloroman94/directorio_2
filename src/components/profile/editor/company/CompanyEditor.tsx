import { useState } from 'react';
import { Tabs } from '../../../../components/ui/Tabs';
import BasicInfoSection from './sections/BasicInfoSection';
import ServicesSection from './sections/ServicesSection';
import TeamSection from './sections/TeamSection';
import ResourcesSection from './sections/ResourcesSection';
import ContactSection from './sections/ContactSection';
import type { CompanyProfile } from '../../../../types/profile';

interface CompanyEditorProps {
  profile: CompanyProfile;
  onUpdate: (data: Partial<CompanyProfile>) => Promise<void>;
  onImageUpload: (file: File) => Promise<void>;
  isSaving: boolean;
}

export default function CompanyEditor({
  profile,
  onUpdate,
  onImageUpload,
  isSaving
}: CompanyEditorProps) {
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Información Básica' },
    { id: 'services', label: 'Servicios' },
    { id: 'team', label: 'Equipo' },
    { id: 'resources', label: 'Recursos' },
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
      case 'services':
        return (
          <ServicesSection
            profile={profile}
            onUpdate={onUpdate}
            isSaving={isSaving}
          />
        );
      case 'team':
        return (
          <TeamSection
            profile={profile}
            onUpdate={onUpdate}
            isSaving={isSaving}
          />
        );
      case 'resources':
        return (
          <ResourcesSection
            profile={profile}
            onUpdate={onUpdate}
            isSaving={isSaving}
          />
        );
      case 'contact':
        return (
          <ContactSection
            profile={profile}
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
        <h2 className="card-title mb-4">Editar Perfil Empresarial</h2>
        
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