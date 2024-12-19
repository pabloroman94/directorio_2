// Add these to your existing types
export type UserRole = 'admin' | 'professional' | 'user';
export type UserStatus = 'active' | 'inactive';

export interface Professional {
  id: string;
  type: 'professional';
  fullName: string;
  email: string;
  profession: string;
  company: string;
  city: string;
  phone: string;
  description: string;
  tags: string[];
  image: string;
  rating: number;
  reviews: number;
  reviewCount: number;
  role: UserRole;
  status: UserStatus;
  specialties: string[];
  experience: number;
  coverageAreas: string[];
  hourlyRate: number;
  contact: {
    email: string;
    phone: string;
    website?: string;
    location: {
      address: string;
      city: string;
      country: string;
    };
  };
  portfolio: Array<{
    title: string;
    description: string;
    imageUrl: string;
  }>;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
}

import { CompanyService as CompanyType } from './service';

// Exportar el tipo para que esté disponible para otros módulos
export type { CompanyType };

export interface User {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  type: 'admin' | 'professional' | 'company';
  profession?: string;
  company?: string;
  specialties?: readonly string[];
  experience?: number;
  city: string;
  phone: string;
}