```markdown
# Services Directory

This directory contains all API and external service integrations.

## Structure

```
services/
├── api/             # API service implementations
│   ├── base/        # Base classes and interfaces
│   ├── types/       # API types and interfaces
│   └── utils/       # API utilities
├── auth/            # Authentication services
├── storage/         # Storage services
└── external/        # Third-party service integrations
```

## Guidelines

1. Service Organization:
   - Each service should be in its own directory
   - Include types and interfaces
   - Include tests
   - Document API endpoints and methods

2. Implementation:
   - Use TypeScript
   - Handle errors consistently
   - Include retry logic where appropriate
   - Cache responses when possible

3. Best Practices:
   - Use dependency injection
   - Follow SOLID principles
   - Include proper error handling
   - Add comprehensive documentation
```