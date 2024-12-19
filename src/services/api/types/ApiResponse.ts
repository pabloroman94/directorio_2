export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  metadata?: {
    timestamp: number;
    requestId: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  status?: number;
}