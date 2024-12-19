export type ServiceType = 'professional' | 'company';

export interface Location {
  address: string;
  city: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface SocialLinks {
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  github?: string;
  website?: string;
}

export interface Resource {
  type: 'pdf' | 'doc';
  title: string;
  url: string;
}

export interface ServiceBase {
  id: string;
  type: ServiceType;
  rating: number;
  reviewCount: number;
  description: string;
  languages: string[];
  coverageAreas: string[];
  contact: {
    email: string;
    phone: string;
    website?: string;
    location: Location;
  };
  social: SocialLinks;
  resources: Resource[];
}

export interface ProfessionalService extends ServiceBase {
  type: 'professional';
  fullName: string;
  profession: string;
  specialties: string[];
  experience: number;
  hourlyRate: number;
  image: string;
  certifications: Array<{
    title: string;
    issuer: string;
    year: number;
  }>;
  availability: {
    days: string[];
    hours: string;
  };
  portfolio: Array<{
    title: string;
    description: string;
    imageUrl: string;
  }>;
}

export interface CompanyService extends ServiceBase {
  type: 'company';
  companyName: string;
  legalName: string;
  logo: string | File;
  services: string[];
  employeeCount: number;
  foundedYear: number;
  industry: string;
  projects: Array<{
    title: string;
    description: string;
    image: string;
  }>;
}

export type ServiceProvider = CompanyService | ProfessionalService;