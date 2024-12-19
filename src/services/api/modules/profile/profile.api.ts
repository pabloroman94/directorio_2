import { Fetcher } from '../../core/fetcher';
import { ProfileUpdateData, ProfileResponse } from './profile.types';

export class ProfileApi {
  constructor(private readonly fetcher: Fetcher) {}

  async getProfile(id: string): Promise<ProfileResponse> {
    return this.fetcher.get<ProfileResponse>(`/profiles/${id}`);
  }

  async updateProfile(id: string, data: ProfileUpdateData): Promise<ProfileResponse> {
    return this.fetcher.put<ProfileResponse>(`/profiles/${id}`, data);
  }
} 