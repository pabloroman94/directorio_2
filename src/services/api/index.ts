import { API_CONFIG } from './config/constants';
import { Fetcher } from './core/fetcher';

// Importar todos los módulos API
import { SearchApi } from './modules/search/search.api';
import { ProfileApi } from './modules/profile/profile.api';
import { ProfessionalApi } from './modules/professional/professional.api';
import { CompanyApi } from './modules/company/company.api';

export class ApiService {
  private readonly fetcher: Fetcher;

  // Módulos de API
  public readonly search: SearchApi;
  public readonly profile: ProfileApi;
  public readonly professional: ProfessionalApi;
  public readonly company: CompanyApi;

  constructor() {
    // Inicializar el fetcher con la configuración
    this.fetcher = new Fetcher({
      baseURL: API_CONFIG.BASE_URL,
    });

    // Inicializar todos los módulos
    this.search = new SearchApi(this.fetcher);
    this.profile = new ProfileApi(this.fetcher);
    this.professional = new ProfessionalApi(this.fetcher);
    this.company = new CompanyApi(this.fetcher);
  }
}

// Exportar una instancia única
export const api = new ApiService();
