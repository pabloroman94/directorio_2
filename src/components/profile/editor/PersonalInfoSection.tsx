import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Input } from '../../ui/Input';
import type { UserProfile } from '../../../types/profile';
import { TRANSLATIONS } from '../../../constants/translations';

interface PersonalInfoSectionProps {
  profile: UserProfile;
  onSave: (data: Partial<UserProfile>) => Promise<void>;
  isSaving: boolean;
}

export default function PersonalInfoSection({ 
  profile, 
  onSave,
  isSaving 
}: PersonalInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone || '',
    dateOfBirth: profile.dateOfBirth || '',
    city: profile.city || ''
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
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#personalInfo"
        >
          {TRANSLATIONS.PERSONAL_INFO}
        </button>
      </h2>
      <div id="personalInfo" className="accordion-collapse collapse show">
        <div className="accordion-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">{TRANSLATIONS.PERSONAL_INFO}</h5>
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
                  label={TRANSLATIONS.NAME}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  icon={<User size={20} />}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="col-md-6">
                <Input
                  label={TRANSLATIONS.EMAIL}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  icon={<Mail size={20} />}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="col-md-6">
                <Input
                  label={TRANSLATIONS.PHONE}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  icon={<Phone size={20} />}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label={TRANSLATIONS.DATE_OF_BIRTH}
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  icon={<Calendar size={20} />}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-12">
                <Input
                  label={TRANSLATIONS.CITY}
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  icon={<MapPin size={20} />}
                  disabled={!isEditing}
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