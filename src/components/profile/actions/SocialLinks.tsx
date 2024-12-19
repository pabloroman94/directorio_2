import { Linkedin, Facebook, Twitter, Instagram, Github, Globe } from 'lucide-react';
import type { SocialLinks as SocialLinksType } from '../../../types/service';
import './SocialLinks.css';
import React from 'react';

interface SocialLinksProps {
  links: SocialLinksType;
}

export function SocialLinks({ links }: SocialLinksProps) {
  const socialIcons = [
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: '#0077b5' },
    { key: 'facebook', icon: Facebook, label: 'Facebook', color: '#1877f2' },
    { key: 'twitter', icon: Twitter, label: 'Twitter', color: '#1da1f2' },
    { key: 'instagram', icon: Instagram, label: 'Instagram', color: '#e4405f' },
    { key: 'github', icon: Github, label: 'GitHub', color: '#333333' },
    { key: 'website', icon: Globe, label: 'Website', color: '#0d6efd' }
  ];

  const availableLinks = socialIcons.filter(({ key }) => links[key as keyof SocialLinksType]);

  if (availableLinks.length === 0) return null;

  return (
    <div className="social-links">
      {availableLinks.map(({ key, icon: Icon, label, color }) => {
        const href = links[key as keyof SocialLinksType];
        if (!href) return null;

        // Definimos el estilo con una propiedad CSS custom
        const style: React.CSSProperties = { ['--hover-color' as any]: color };

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            style={style}
            title={label}
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
}
