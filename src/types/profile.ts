export interface UserProfile {
  id: string;
  email: string;
  name: string;
  type?: 'professional' | 'company';
  profession?: string;
  company?: string;
  bio?: string;
  city: string;
  phone: string;
  image?: string;
  dateOfBirth?: string;
  skills: readonly string[];
  languages: readonly string[];
  social: Record<string, string>;
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
}

export interface ProfessionalProfile {
  type: 'professional';
  id: string;
  fullName: string;
  profession: string;
  description: string;
  specialties: string[];
  experience: number;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  languages: string[];
  availability: string;
  image: string;
  portfolio: any[];
  services: any[];
  credentials: {
    education: any[];
    certifications: any[];
  };
  contact: {
    email: string;
    phone: string;
    city: string;
    website?: string;
  };
}

export interface CompanyProfile {
  type: 'company';
  id: string;
  companyName: string;
  legalName: string;
  taxId: string;
  industry: string;
  employeeCount: number;
  foundedYear: number;
  logo: string;
  services: any[];
  team: any[];
  resources: any[];
  contact: {
    email: string;
    phone: string;
    city: string;
  };
}