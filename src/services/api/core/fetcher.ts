interface FetcherConfig {
  baseURL: string;
}

type RequestOptions = {
  headers?: Record<string, string>;
  method?: string;
  body?: string;
};

// Tipo genérico para parámetros
export type QueryParams = Record<string, string | number | boolean | undefined>;

export class Fetcher {
  private readonly baseURL: string;
  private readonly defaultHeaders: Record<string, string>;

  constructor(config: FetcherConfig) {
    this.baseURL = config.baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private createUrl(path: string): string {
    const baseUrl = this.baseURL.endsWith('/') ? this.baseURL.slice(0, -1) : this.baseURL;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }

  private createRequestOptions(method: string, data?: unknown): RequestOptions {
    const options: RequestOptions = {
      method,
      headers: this.defaultHeaders,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    return options;
  }

  private createQueryString(params: QueryParams): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    return searchParams.toString();
  }

  async get<T>(path: string, params?: QueryParams): Promise<T> {
    const queryString = params ? this.createQueryString(params) : '';
    const url = this.createUrl(path) + (queryString ? `?${queryString}` : '');
    
    const response = await fetch(url, this.createRequestOptions('GET'));
    return this.handleResponse<T>(response);
  }

  async post<T>(path: string, data?: unknown): Promise<T> {
    const response = await fetch(
      this.createUrl(path),
      this.createRequestOptions('POST', data)
    );
    return this.handleResponse<T>(response);
  }

  async put<T>(path: string, data?: unknown): Promise<T> {
    const response = await fetch(
      this.createUrl(path),
      this.createRequestOptions('PUT', data)
    );
    return this.handleResponse<T>(response);
  }
} 