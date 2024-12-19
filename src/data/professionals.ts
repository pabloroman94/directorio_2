import type { Professional } from '../types';

export const professionals: Professional[] = [
  {
    id: '1',
    type: 'professional',
    fullName: 'John Doe',
    email: 'john@example.com',
    profession: 'Software Developer',
    company: 'Tech Solutions Inc',
    city: 'New York',
    phone: '123-456-7890',
    description: 'Software Developer with expertise in modern web technologies',
    tags: ['React', 'TypeScript', 'Node.js'],
    image: 'https://example.com/image.jpg',
    rating: 4.8,
    reviews: 12,
    reviewCount: 12,
    role: 'professional',
    status: 'active',
    specialties: ['React', 'TypeScript', 'Node.js'],
    experience: 5,
    coverageAreas: ['New York', 'Remote'],
    hourlyRate: 100,
    contact: {
      email: 'john@example.com',
      phone: '123-456-7890',
      location: {
        address: '123 Main St',
        city: 'New York',
        country: 'USA'
      }
    },
    portfolio: [
      {
        title: 'Project 1',
        description: 'A React application',
        imageUrl: 'https://example.com/project1.jpg'
      }
    ],
    social: {
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      instagram: 'https://instagram.com/johndoe',
      github: 'https://github.com/johndoe'
    }
  }
];