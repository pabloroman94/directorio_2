import { useAuth } from '../hooks/useAuth';
import ProfileHeader from '../components/profile/editor/ProfileHeader';
import PersonalInfoSection from '../components/profile/editor/PersonalInfoSection';
import ProfessionalSection from '../components/profile/editor/ProfessionalSection';
import SocialSection from '../components/profile/editor/SocialSection';
import PrivacySection from '../components/profile/editor/PrivacySection';
import LoadingSpinner from '../components/LoadingSpinner';
import { useProfileEditor } from '../hooks/useProfileEditor';
import { TRANSLATIONS } from '../constants/translations';

export default function UserProfilePage() {
  const { user } = useAuth();
  const { 
    profile,
    isLoading,
    error,
    uploadImage,
    saveSection,
    isSaving
  } = useProfileEditor(user?.id);

  if (!user) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {TRANSLATIONS.LOGIN_REQUIRED}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <ProfileHeader 
                profile={profile}
                onImageUpload={uploadImage}
                isSaving={isSaving}
              />
            </div>
          </div>

          <div className="accordion" id="profileAccordion">
            <PersonalInfoSection
              profile={profile}
              onSave={saveSection}
              isSaving={isSaving}
            />

            <ProfessionalSection
              profile={profile}
              onSave={saveSection}
              isSaving={isSaving}
            />

            <SocialSection
              profile={profile}
              onSave={saveSection}
              isSaving={isSaving}
            />

            <PrivacySection
              profile={profile}
              onSave={saveSection}
              isSaving={isSaving}
            />
          </div>
        </div>
      </div>
    </div>
  );
}