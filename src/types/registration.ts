export type RegistrationType = 'professional' | 'company';

export interface ContactInfo {
  email: string;
  phone: string;
  website?: string;
  address?: string;
  city: string;
  country: string;
}

export interface ProfessionalRegistration {
  type: 'professional';
  fullName: string;
  profession: string;
  professionalId?: string;
  yearsOfExperience: number;
  expertise: string[];
  profileImage: File;
  contact: {
    email: string;
    phone: string;
    city: string;
    country: string;
  };
  bio?: string;
}

export interface CompanyRegistration {
  type: 'company';
  logo: string | File;
  commercialName: string;
  legalName: string;
  taxId: string;
  industry: string;
  employeeCount: number;
  contact: {
    email: string;
    phone: string;
    city: string;
    website?: string;
  };
}

export type RegistrationData = ProfessionalRegistration | CompanyRegistration;