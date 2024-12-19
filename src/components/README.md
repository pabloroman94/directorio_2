```markdown
# Components Directory

This directory contains reusable UI components organized by feature and type.

## Structure

```
components/
├── common/          # Shared components used across features
├── forms/           # Form-related components
├── layout/          # Layout components
└── feature-name/    # Feature-specific components
```

## Guidelines

1. Each component should:
   - Have its own directory
   - Include tests
   - Be well-documented
   - Have proper TypeScript types

2. Component Organization:
   ```
   ComponentName/
   ├── index.tsx           # Main component
   ├── ComponentName.tsx   # Implementation
   ├── ComponentName.css   # Styles
   ├── ComponentName.test.tsx  # Tests
   ├── types.ts           # Component types
   └── README.md          # Documentation
   ```

3. Naming Conventions:
   - Use PascalCase for component files
   - Use kebab-case for directories
   - Use .tsx extension for components
```