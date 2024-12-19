import { ProfessionalApiService } from '../implementations/ProfessionalApiService';
import { CompanyApiService } from '../implementations/CompanyApiService';
import { SearchApiService } from '../implementations/SearchApiService';
import { ProfileApiService } from '../implementations/ProfileApiService';

export type ApiServiceType = 'professional' | 'company' | 'search' | 'profile';

export class ApiServiceFactory {
  private static instances: Record<string, any> = {};

  static getService(type: ApiServiceType) {
    if (!this.instances[type]) {
      switch (type) {
        case 'professional':
          this.instances[type] = new ProfessionalApiService();
          break;
        case 'company':
          this.instances[type] = new CompanyApiService();
          break;
        case 'search':
          this.instances[type] = new SearchApiService();
          break;
        case 'profile':
          this.instances[type] = new ProfileApiService();
          break;
        default:
          throw new Error(`Invalid service type: ${type}`);
      }
    }
    return this.instances[type];
  }
}