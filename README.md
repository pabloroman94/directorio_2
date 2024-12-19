```markdown
# Project Structure

This document describes the organization and purpose of each directory in the project.

## Root Directories

```
├── src/               # Source code
├── public/            # Static assets served as-is
├── docs/             # Documentation
├── tests/            # Test files
└── scripts/          # Build and utility scripts
```

## Source Code Structure (src/)

```
src/
├── assets/           # Internal application assets
├── components/       # React components
├── config/          # Configuration files and constants
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── layouts/         # Page layout components
├── lib/             # Third-party library configurations
├── pages/           # Page components
├── services/        # API and external services
├── store/           # State management
├── styles/          # Global styles and themes
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Directory Details

### src/assets/
- Application-specific assets like images, icons, and fonts
- Assets that need to be processed by the build system

### src/components/
- Reusable UI components
- Each component has its own directory with:
  - Component file (TSX)
  - Styles (CSS/SCSS)
  - Tests
  - Types
  - Documentation

### src/config/
- Environment configurations
- Feature flags
- API endpoints
- Constants and enums

### src/context/
- React Context providers
- Global state management using Context API
- Theme providers

### src/hooks/
- Custom React hooks
- Shared logic between components
- API integration hooks

### src/layouts/
- Page layout templates
- Common layout components
- Navigation structures

### src/lib/
- Third-party library configurations
- Library-specific utility functions
- Custom implementations of external libraries

### src/pages/
- Page components
- Route components
- Page-specific logic

### src/services/
- API service implementations
- External service integrations
- Service interfaces and types

### src/store/
- State management (Redux/MobX/etc.)
- Actions, reducers, and selectors
- Store configuration

### src/styles/
- Global styles
- Theme definitions
- CSS variables
- Mixins and functions

### src/types/
- TypeScript type definitions
- Interfaces
- Type utilities

### src/utils/
- Helper functions
- Common utilities
- Constants

## Other Directories

### public/
- Static files served directly
- favicon.ico
- robots.txt
- manifest.json

### docs/
- Project documentation
- API documentation
- Architecture diagrams
- Contributing guidelines

### tests/
- Test configuration
- Test utilities
- Integration tests
- E2E tests

### scripts/
- Build scripts
- Development utilities
- Database scripts
- Deployment scripts
```