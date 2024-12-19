export type UserType = 'admin' | 'professional' | 'company';

export interface User {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
  type: UserType;
  profession?: string;
  company?: string;
  city?: string;
  phone?: string;
  specialties?: readonly string[];
  experience?: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}