import { Fetcher } from '../core/fetcher';
import { Profile, ProfileUpdateData } from '../types/profile.types';
import { ApiResponse } from '../types/api.types';

export class ProfileEndpoint {
  constructor(private readonly fetcher: Fetcher) {}

  async getProfile(id: string): Promise<ApiResponse<Profile>> {
    return this.fetcher.get<ApiResponse<Profile>>(`/profiles/${id}`);
  }

  async updateProfile(id: string, data: ProfileUpdateData): Promise<ApiResponse<Profile>> {
    return this.fetcher.put<ApiResponse<Profile>>(`/profiles/${id}`, data);
  }
} 