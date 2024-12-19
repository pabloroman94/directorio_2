import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useProfileEditor } from '../../../hooks/useProfileEditor';
import ProfessionalEditor from './professional/ProfessionalEditor';
import CompanyEditor from './company/CompanyEditor';
import LoadingSpinner from '../../LoadingSpinner';
import { TRANSLATIONS } from '../../../constants/translations';
import type { ProfessionalProfile, CompanyProfile } from '../../../types/profile';

function isProfessionalProfile(profile: any): profile is ProfessionalProfile {
  return profile.type === 'professional' 
    && 'fullName' in profile 
    && 'specialties' in profile;
}

function isCompanyProfile(profile: any): profile is CompanyProfile {
  return profile.type === 'company' 
    && 'companyName' in profile 
    && 'legalName' in profile;
}

export default function ProfileEditorContainer() {
  const { user } = useAuth();
  const [profileType, setProfileType] = useState<'professional' | 'company' | null>(null);
  const { profile, isLoading, updateProfile, uploadImage, isSaving } = useProfileEditor(user?.id);

  useEffect(() => {
    // Detect profile type based on user data
    if (profile) {
      setProfileType(profile.type || 'professional');
    }
  }, [profile]);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!profile) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {TRANSLATIONS.PROFILE_NOT_FOUND}
        </div>
      </div>
    );
  }

  if (profileType === 'professional' && isProfessionalProfile(profile)) {
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <ProfessionalEditor
              profile={profile}
              onUpdate={updateProfile}
              onImageUpload={uploadImage}
              isSaving={isSaving}
            />
          </div>
        </div>
      </div>
    );
  } else if (profileType === 'company' && isCompanyProfile(profile)) {
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <CompanyEditor
              profile={profile}
              onUpdate={updateProfile}
              onImageUpload={uploadImage}
              isSaving={isSaving}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}