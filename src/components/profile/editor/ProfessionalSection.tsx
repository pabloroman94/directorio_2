import { useState } from 'react';
import { Briefcase, Award, Languages } from 'lucide-react';
import { Input } from '../../ui/Input';
import { TagInput } from '../../ui/TagInput';
import type { UserProfile } from '../../../types/profile';
import { TRANSLATIONS } from '../../../constants/translations';

interface ProfessionalSectionProps {
  profile: UserProfile;
  onSave: (data: Partial<UserProfile>) => Promise<void>;
  isSaving: boolean;
}

export default function ProfessionalSection({
  profile,
  onSave,
  isSaving
}: ProfessionalSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    profession: profile.profession || '',
    company: profile.company || '',
    bio: profile.bio || '',
    skills: profile.skills || [],
    languages: profile.languages || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    setIsEditing(false);
  };

  const handleSkillChange = (skills: string[]) => {
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleLanguageChange = (languages: string[]) => {
    setFormData(prev => ({ ...prev, languages }));
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#professionalInfo"
        >
          {TRANSLATIONS.PROFESSIONAL_INFO}
        </button>
      </h2>
      <div id="professionalInfo" className="accordion-collapse collapse">
        <div className="accordion-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{TRANSLATIONS.PROFESSIONAL_INFO}</h5>
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
                  label={TRANSLATIONS.PROFESSION}
                  value={formData.profession}
                  onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
                  icon={<Briefcase size={20} />}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label={TRANSLATIONS.COMPANY}
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  icon={<Briefcase size={20} />}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-12">
                <TagInput
                  label={TRANSLATIONS.SKILLS}
                  value={Array.from(formData.skills)}
                  onChange={handleSkillChange}
                  icon={<Award size={20} />}
                  disabled={!isEditing}
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
              <div className="col-12">
                <TagInput
                  label={TRANSLATIONS.LANGUAGES}
                  value={Array.from(formData.languages)}
                  onChange={handleLanguageChange}
                  icon={<Languages size={20} />}
                  disabled={!isEditing}
                  placeholder="Spanish, English"
                />
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">{TRANSLATIONS.BIO}</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
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