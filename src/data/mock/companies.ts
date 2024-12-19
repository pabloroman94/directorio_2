import type { CompanyService } from '../../types/service';

const generateCompany = (
  id: string,
  name: string,
  city: string
): CompanyService => ({
  id,
  type: 'company',
  companyName: name,
  legalName: `${name} S.A.`,
  logo: 'https://example.com/company-logo.png',
  industry: ['Tecnología', 'Servicios', 'Consultoría'][Math.floor(Math.random() * 3)],
  services: ['Desarrollo Web', 'Apps Móviles', 'Cloud'],
  employeeCount: 10 + Math.floor(Math.random() * 90),
  foundedYear: 2010 + Math.floor(Math.random() * 13),
  rating: 4.5 + Math.random(),
  reviewCount: 100 + Math.floor(Math.random() * 500),
  description: `Empresa líder en ${['Desarrollo Web', 'Apps Móviles', 'Cloud'].join(', ')}.`,
  coverageAreas: [city, 'GBA', 'Remoto'],
  languages: ['Español', 'Inglés'],
  contact: {
    email: `contacto@${name.toLowerCase().replace(/\s+/g, '')}.com.ar`,
    phone: `+54 11 ${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
    website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com.ar`,
    location: {
      address: `Av. Example ${Math.floor(1000 + Math.random() * 9000)}`,
      city,
      coordinates: {
        lat: -34.6037 + (Math.random() - 0.5) * 0.1,
        lng: -58.3816 + (Math.random() - 0.5) * 0.1
      }
    }
  },
  social: {
    linkedin: `https://linkedin.com/company/${name.toLowerCase().replace(/\s+/g, '')}`,
    twitter: `https://twitter.com/${name.toLowerCase().replace(/\s+/g, '')}`,
    facebook: `https://facebook.com/${name.toLowerCase().replace(/\s+/g, '')}`,
    instagram: `https://instagram.com/${name.toLowerCase().replace(/\s+/g, '')}`
  },
  projects: [
    {
      title: 'Proyecto Destacado 1',
      description: `Implementación de ${['Desarrollo Web', 'Apps Móviles', 'Cloud'][Math.floor(Math.random() * 3)]}`,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
    },
    {
      title: 'Proyecto Destacado 2',
      description: `Desarrollo de ${['Desarrollo Web', 'Apps Móviles', 'Cloud'][Math.floor(Math.random() * 3)]}`,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c'
    }
  ],
  resources: [
    {
      type: 'pdf',
      title: 'Brochure Corporativo',
      url: 'https://example.com/brochure.pdf'
    }
  ]
});

// Generar 20 empresas
export const companies: CompanyService[] = [
  generateCompany('c1', 'TechSolutions Argentina', 'CABA'),
  generateCompany('c2', 'Digital Innovators', 'Palermo'),
  generateCompany('c3', 'Cloud Masters', 'Belgrano'),
  generateCompany('c4', 'Data Analytics Pro', 'Recoleta'),
  generateCompany('c5', 'Mobile Solutions', 'Núñez'),
  generateCompany('c6', 'Web Experts', 'Villa Urquiza'),
  generateCompany('c7', 'Security First', 'CABA'),
  generateCompany('c8', 'AI Solutions', 'Palermo'),
  generateCompany('c9', 'DevOps Masters', 'Belgrano'),
  generateCompany('c10', 'UX Studio', 'Recoleta'),
  generateCompany('c11', 'Code Factory', 'Núñez'),
  generateCompany('c12', 'Digital Marketing Pro', 'Villa Urquiza'),
  generateCompany('c13', 'Cloud Services AR', 'CABA'),
  generateCompany('c14', 'Data Solutions', 'Palermo'),
  generateCompany('c15', 'Mobile First', 'Belgrano'),
  generateCompany('c16', 'Web Factory', 'Recoleta'),
  generateCompany('c17', 'Security Plus', 'Núñez'),
  generateCompany('c18', 'AI Labs', 'Villa Urquiza'),
  generateCompany('c19', 'DevOps Solutions', 'CABA'),
  generateCompany('c20', 'Design Studio', 'Palermo')
];