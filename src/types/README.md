```markdown
# Types Directory

This directory contains TypeScript type definitions used throughout the application.

## Structure

```
types/
├── api/             # API-related types
├── models/          # Data model types
├── components/      # Component prop types
└── utils/           # Utility types
```

## Guidelines

1. Type Organization:
   - Group related types together
   - Use descriptive names
   - Include documentation
   - Export all types from index files

2. Naming Conventions:
   - Use PascalCase for type names
   - Use 'I' prefix for interfaces
   - Use 'T' prefix for generic types
   - Use 'E' prefix for enums

3. Best Practices:
   - Keep types DRY
   - Use proper TypeScript features
   - Include proper JSDoc comments
   - Make types as specific as possible
```