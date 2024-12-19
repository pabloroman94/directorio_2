export const SEARCH_PLACEHOLDER = 'Search by skill, role, or technology...';
export const MIN_PASSWORD_LENGTH = 6;
export const MIN_NAME_LENGTH = 2;

export const AUTH_ERRORS = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
  INVALID_NAME: `Name must be at least ${MIN_NAME_LENGTH} characters long`,
} as const;