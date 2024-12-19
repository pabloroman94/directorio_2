import { useRef } from 'react';
import { Camera } from 'lucide-react';
import type { UserProfile } from '../../../types/profile';

interface ProfileHeaderProps {
  profile: UserProfile;
  onImageUpload: (file: File) => Promise<void>;
  isSaving: boolean;
}

export default function ProfileHeader({ profile, onImageUpload, isSaving }: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="text-center">
      <div className="position-relative d-inline-block mb-3">
        <img
          src={profile.image || 'https://via.placeholder.com/150'}
          alt={profile.name}
          className="rounded-circle"
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
        <button
          className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0"
          onClick={handleImageClick}
          disabled={isSaving}
        >
          <Camera size={16} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="d-none"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <h2 className="mb-1">{profile.name}</h2>
      <p className="text-muted mb-0">{profile.profession}</p>
      {profile.company && (
        <p className="text-muted mb-0">{profile.company}</p>
      )}
    </div>
  );
}