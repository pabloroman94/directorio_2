import { ApiResponse, ApiError } from '../types/ApiResponse';

export const createSuccessResponse = <T>(data: T): ApiResponse<T> => ({
  data,
  success: true,
  metadata: {
    timestamp: Date.now(),
    requestId: Math.random().toString(36).substring(7)
  }
});

export const createErrorResponse = (error: string | ApiError): ApiResponse<any> => ({
  data: null,
  success: false,
  error: typeof error === 'string' ? error : `${error.code}: ${error.message}`
});

export const createPaginatedResponse = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number
) => ({
  data,
  success: true,
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  },
  metadata: {
    timestamp: Date.now(),
    requestId: Math.random().toString(36).substring(7)
  }
});