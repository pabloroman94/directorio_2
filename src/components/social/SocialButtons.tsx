import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

interface SocialButtonsProps {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export function SocialButtons({ facebook, instagram, twitter, linkedin }: SocialButtonsProps) {
  const socialLinks = [
    { url: facebook, icon: Facebook, label: 'Facebook' },
    { url: instagram, icon: Instagram, label: 'Instagram' },
    { url: twitter, icon: Twitter, label: 'Twitter' },
    { url: linkedin, icon: Linkedin, label: 'LinkedIn' },
  ].filter(link => link.url);

  if (socialLinks.length === 0) return null;

  return (
    <div className="d-flex gap-2 mt-3">
      {socialLinks.map(({ url, icon: Icon, label }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary"
          title={label}
        >
          <Icon size={20} />
        </a>
      ))}
    </div>
  );
}