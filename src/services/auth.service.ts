import type { User, AuthResponse } from '../types/auth';
import { TEST_USERS } from '../constants/auth';
import { StorageService } from './storage.service';

export const AuthService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Credenciales de prueba
    if (email === 'admin@admin.com' && password === 'admin123') {
      return { user: TEST_USERS.admin, token: 'admin_token' };
    }
    
    if (email === 'pro@example.com' && password === 'pro123') {
      return { 
        user: { 
          ...TEST_USERS.professional, 
          specialties: Array.from(TEST_USERS.professional.specialties || [])
        }, 
        token: 'pro_token' 
      };
    }
    
    throw new Error('Credenciales inválidas');
  },

  async register(name: string, email: string, password: string, type: 'professional' | 'company'): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!password || password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      throw new Error('La contraseña debe tener al menos 6 caracteres, una mayúscula y un número');
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      isAuthenticated: true,
      isAdmin: false,
      type,
      profession: type === 'professional' ? 'Nuevo Profesional' : undefined,
      company: type === 'company' ? 'Nueva Empresa' : undefined,
      city: 'Buenos Aires',
      phone: ''
    };
    
    return { user: newUser, token: `token_${Buffer.from(password).toString('base64')}` };
  },

  async logout(): Promise<void> {
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 500));
    StorageService.clearAuth();
  },

  setAuth(token: string, user: User): void {
    StorageService.setAuth(token, user);
  },

  getToken(): string | null {
    return StorageService.getToken();
  },

  getUser(): User | null {
    return StorageService.getUser();
  },

  clearAuth(): void {
    StorageService.clearAuth();
  },

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser();
  }
};