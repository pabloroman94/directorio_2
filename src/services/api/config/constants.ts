export const API_CONFIG = {
  BASE_URL: process.env.API_URL || 'http://localhost:3000',
  TIMEOUT: 30000,
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
} as const; 