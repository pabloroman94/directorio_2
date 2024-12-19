import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { UserProfile } from '../../../types/profile';
import { TRANSLATIONS } from '../../../constants/translations';

interface PrivacySectionProps {
  profile: UserProfile;
  onSave: (data: Partial<UserProfile>) => Promise<void>;
  isSaving: boolean;
}

type PrivacyKey = 'EMAIL' | 'PHONE' | 'LOCATION';

const getTranslationKey = (key: PrivacyKey): keyof typeof TRANSLATIONS => {
  return `SHOW_${key}` as keyof typeof TRANSLATIONS;
};

const getDescriptionKey = (key: string): keyof typeof TRANSLATIONS => {
  return `SHOW_${key.toUpperCase()}_DESC` as keyof typeof TRANSLATIONS;
};

export default function PrivacySection({
  profile,
  onSave,
  isSaving
}: PrivacySectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    privacy: { ...profile.privacy }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    setIsEditing(false);
  };

  const handleToggle = (field: keyof typeof formData.privacy) => {
    setFormData({
      privacy: {
        ...formData.privacy,
        [field]: !formData.privacy[field]
      }
    });
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#privacyInfo"
        >
          {TRANSLATIONS.PRIVACY_SETTINGS}
        </button>
      </h2>
      <div id="privacyInfo" className="accordion-collapse collapse">
        <div className="accordion-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{TRANSLATIONS.PRIVACY_SETTINGS}</h5>
            <button
              className={`btn btn-${isEditing ? 'success' : 'primary'} btn-sm`}
              onClick={() => !isSaving && setIsEditing(!isEditing)}
              disabled={isSaving}
            >
              {isEditing ? TRANSLATIONS.SAVE : TRANSLATIONS.EDIT}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="list-group">
              {Object.entries(formData.privacy).map(([key, value]) => (
                <div
                  key={key}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h6 className="mb-0">{TRANSLATIONS[getTranslationKey(key as PrivacyKey)]}</h6>
                    <small className="text-muted">
                      {TRANSLATIONS[getDescriptionKey(key)]}
                    </small>
                  </div>
                  <button
                    type="button"
                    className={`btn btn-${value ? 'success' : 'outline-secondary'}`}
                    onClick={() => isEditing && handleToggle(key as keyof typeof formData.privacy)}
                    disabled={!isEditing || isSaving}
                  >
                    {value ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="mt-3">
                <button 
                  type="submit" 
                  className="btn btn-success me-2"
                  disabled={isSaving}
                >
                  {isSaving ? TRANSLATIONS.SAVING : TRANSLATIONS.SAVE}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  {TRANSLATIONS.CANCEL}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}