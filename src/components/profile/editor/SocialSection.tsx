import { useState } from 'react';
import { Linkedin, Github, Twitter, Globe } from 'lucide-react';
import { Input } from '../../ui/Input';
import type { UserProfile } from '../../../types/profile';
import { TRANSLATIONS } from '../../../constants/translations';

interface SocialSectionProps {
  profile: UserProfile;
  onSave: (data: Partial<UserProfile>) => Promise<void>;
  isSaving: boolean;
}

export default function SocialSection({
  profile,
  onSave,
  isSaving
}: SocialSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    social: { ...profile.social }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    setIsEditing(false);
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#socialInfo"
        >
          {TRANSLATIONS.SOCIAL_NETWORKS}
        </button>
      </h2>
      <div id="socialInfo" className="accordion-collapse collapse">
        <div className="accordion-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{TRANSLATIONS.SOCIAL_NETWORKS}</h5>
            <button
              className={`btn btn-${isEditing ? 'success' : 'primary'} btn-sm`}
              onClick={() => !isSaving && setIsEditing(!isEditing)}
              disabled={isSaving}
            >
              {isEditing ? TRANSLATIONS.SAVE : TRANSLATIONS.EDIT}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <Input
                  label="LinkedIn"
                  value={formData.social.linkedin || ''}
                  onChange={(e) => setFormData({
                    social: { ...formData.social, linkedin: e.target.value }
                  })}
                  icon={<Linkedin size={20} />}
                  disabled={!isEditing}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="GitHub"
                  value={formData.social.github || ''}
                  onChange={(e) => setFormData({
                    social: { ...formData.social, github: e.target.value }
                  })}
                  icon={<Github size={20} />}
                  disabled={!isEditing}
                  placeholder="https://github.com/username"
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Twitter"
                  value={formData.social.twitter || ''}
                  onChange={(e) => setFormData({
                    social: { ...formData.social, twitter: e.target.value }
                  })}
                  icon={<Twitter size={20} />}
                  disabled={!isEditing}
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div className="col-md-6">
                <Input
                  label={TRANSLATIONS.WEBSITE}
                  value={formData.social.website || ''}
                  onChange={(e) => setFormData({
                    social: { ...formData.social, website: e.target.value }
                  })}
                  icon={<Globe size={20} />}
                  disabled={!isEditing}
                  placeholder="https://example.com"
                />
              </div>
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