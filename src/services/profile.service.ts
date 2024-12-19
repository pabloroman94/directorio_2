import { UserProfile, ProfessionalProfile, CompanyProfile } from '../types/profile';
import { TEST_USERS } from '../constants/auth';

export const ProfileService = {
  async getUserProfile(userId: string): Promise<UserProfile> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get user data from test users
    const user = userId === TEST_USERS.professional.id 
      ? TEST_USERS.professional 
      : null;
    
    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      profession: user.profession,
      city: user.city,
      phone: user.phone,
      skills: Array.from(user.specialties || []),
      languages: ['Spanish', 'English'],
      social: {},
      privacy: {
        showEmail: true,
        showPhone: true,
        showLocation: true
      }
    };
  },

  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const currentProfile = await this.getUserProfile(userId);
    return { ...currentProfile, ...data };
  },

  async uploadProfileImage(userId: string, file: File): Promise<string> {
    if (!userId) throw new Error('User ID is required');
    await new Promise(resolve => setTimeout(resolve, 1000));
    return URL.createObjectURL(file);
  },

  async getProfessionalProfile(userId: string): Promise<ProfessionalProfile> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = TEST_USERS.professional;
    if (userId !== user.id) {
      throw new Error('Professional not found');
    }
    
    return {
      type: 'professional',
      id: userId,
      fullName: user.name,
      profession: user.profession || 'Professional',
      description: 'Professional with experience in software development',
      specialties: Array.from(user.specialties || []),
      experience: user.experience || 0,
      hourlyRate: 75,
      rating: 4.5,
      reviewCount: 10,
      languages: ['English', 'Spanish'],
      availability: 'Full-time',
      image: 'https://example.com/profile.jpg',
      portfolio: [],
      services: [],
      credentials: {
        education: [],
        certifications: []
      },
      contact: {
        email: 'john@example.com',
        phone: '123-456-7890',
        city: 'New York'
      }
    };
  },

  async getCompanyProfile(userId: string): Promise<CompanyProfile> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock company profile data
    return {
      type: 'company',
      id: userId,
      companyName: 'Tech Solutions Inc',
      legalName: 'Tech Solutions Corporation',
      taxId: '123-456-7890',
      industry: 'Software Development',
      employeeCount: 50,
      foundedYear: 2015,
      logo: 'https://example.com/logo.jpg',
      services: [],
      team: [],
      resources: [],
      contact: {
        email: 'contact@techsolutions.com',
        phone: '123-456-7890',
        city: 'New York'
      }
    };
  }
};