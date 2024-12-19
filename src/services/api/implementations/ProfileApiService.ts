import { ApiService } from '../base/ApiService';
import { UserProfile, ProfessionalProfile, CompanyProfile } from '../../../types/profile';
import { TEST_USERS } from '../../../constants/auth';
import { createSuccessResponse } from '../utils/apiUtils';
import type { ApiResponse } from '../types/ApiResponse';

export class ProfileApiService extends ApiService {
  async getUserProfile(userId: string): Promise<ApiResponse<UserProfile>> {
    await this.simulateDelay();
    this.validateId(userId);
    
    const user = TEST_USERS.professional;
    if (!user) {
      this.handleError('User not found');
    }

    const profile: UserProfile = {
      id: user.id,
      email: user.email,
      name: user.name,
      profession: user.profession,
      city: user.city,
      phone: user.phone,
      skills: user.specialties?.map(s => s) || [],
      languages: ['Spanish', 'English'],
      social: {},
      privacy: {
        showEmail: true,
        showPhone: true,
        showLocation: true
      }
    };

    return createSuccessResponse(profile);
  }

  async updateProfile(userId: string, data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    await this.simulateDelay();
    this.validateId(userId);
    
    const currentProfile = await this.getUserProfile(userId);
    const updatedProfile = { ...currentProfile.data, ...data };
    
    return createSuccessResponse(updatedProfile);
  }

  async uploadProfileImage(userId: string, file: File): Promise<ApiResponse<string>> {
    await this.simulateDelay();
    this.validateId(userId);
    
    const imageUrl = URL.createObjectURL(file);
    return createSuccessResponse(imageUrl);
  }

  async getProfessionalProfile(userId: string): Promise<ApiResponse<ProfessionalProfile>> {
    await this.simulateDelay();
    this.validateId(userId);
    
    const profile: ProfessionalProfile = {
      type: 'professional',
      id: userId,
      fullName: 'John Doe',
      profession: 'Software Developer',
      description: 'Experienced software developer specializing in web technologies',
      specialties: ['React', 'Node.js', 'TypeScript'],
      experience: 5,
      hourlyRate: 75,
      rating: 4.8,
      reviewCount: 12,
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

    return createSuccessResponse(profile);
  }

  async getCompanyProfile(userId: string): Promise<ApiResponse<CompanyProfile>> {
    await this.simulateDelay();
    this.validateId(userId);
    
    const profile: CompanyProfile = {
      type: 'company',
      id: userId,
      companyName: 'Tech Solutions Inc',
      legalName: 'Tech Solutions Corporation',
      taxId: '123456789',
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

    return createSuccessResponse(profile);
  }
}