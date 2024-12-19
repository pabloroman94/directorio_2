import type { User } from '../types';

export const TEST_USERS: Record<string, User> = {
  admin: {
    id: '1',
    email: 'admin@admin.com',
    name: 'Administrator',
    isAuthenticated: true,
    isAdmin: true,
    type: 'admin',
    profession: 'Software Developer',
    company: 'Tech Company',
    city: 'Buenos Aires',
    phone: '(11) 4567-8901'
  },
  professional: {
    id: '2',
    email: 'pro@example.com',
    name: 'Ana Martínez',
    isAuthenticated: true,
    isAdmin: false,
    type: 'professional',
    profession: 'Arquitecta',
    specialties: ['Diseño Residencial', 'Remodelaciones', 'Diseño Sostenible'],
    experience: 8,
    city: 'Buenos Aires',
    phone: '(11) 4567-8902'
  }
} as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Email o contraseña inválidos',
  LOGIN_REQUIRED: 'Debes iniciar sesión para acceder',
  ADMIN_REQUIRED: 'Acceso restringido solo para administradores',
  SESSION_EXPIRED: 'Tu sesión ha expirado, por favor inicia sesión nuevamente',
  INVALID_EMAIL: 'Email inválido',
  INVALID_PASSWORD: 'La contraseña debe tener al menos 6 caracteres'
} as const;