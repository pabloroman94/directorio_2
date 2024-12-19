import type { ProfessionalService } from '../../types/service';

const PROFILE_IMAGES = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956',
  // ... más URLs de imágenes profesionales
];

const CITIES = ['Palermo', 'Belgrano', 'Recoleta', 'Núñez', 'Caballito', 'Villa Urquiza'];
const STREETS = ['Av. Libertador', 'Av. Cabildo', 'Av. Santa Fe', 'Av. Corrientes'];
const TECH_STACKS = {
  frontend: ['React', 'Vue.js', 'Angular', 'TypeScript', 'Next.js'],
  backend: ['Node.js', 'Python', 'Java', 'Go', 'Ruby'],
  cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
  data: ['Python', 'R', 'SQL', 'Hadoop', 'Spark'],
  mobile: ['React Native', 'Flutter', 'iOS', 'Android', 'Kotlin']
};

const generateLocation = () => ({
  address: `${STREETS[Math.floor(Math.random() * STREETS.length)]} ${1000 + Math.floor(Math.random() * 5000)}`,
  city: CITIES[Math.floor(Math.random() * CITIES.length)],
  coordinates: {
    lat: -34.6037 + (Math.random() - 0.5) * 0.1,
    lng: -58.3816 + (Math.random() - 0.5) * 0.1
  }
});

const getRandomTechStack = () => {
  const stacks = Object.values(TECH_STACKS);
  const randomStack = stacks[Math.floor(Math.random() * stacks.length)];
  return randomStack.slice(0, 3 + Math.floor(Math.random() * 2));
};

const generateProfessional = (
  id: string,
  name: string,
  profession: string,
  specialties: string[],
  city: string,
  rating: number,
  reviewCount: number
): ProfessionalService => ({
  id,
  type: 'professional',
  fullName: name,
  profession,
  specialties: specialties.length > 0 ? specialties : getRandomTechStack(),
  experience: 5 + Math.floor(Math.random() * 15),
  hourlyRate: 75 + Math.floor(Math.random() * 75),
  rating,
  reviewCount,
  description: `${profession} con más de ${5 + Math.floor(Math.random() * 15)} años de experiencia especializado/a en ${specialties.join(', ')}. Ofrezco soluciones profesionales y personalizadas para cada cliente.`,
  coverageAreas: [city, 'GBA', 'Remoto'],
  languages: ['Español', 'Inglés', 'Portugués'],
  image: PROFILE_IMAGES[Math.floor(Math.random() * PROFILE_IMAGES.length)],
  availability: {
    days: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    hours: '09:00 - 18:00'
  },
  contact: {
    email: `${name.toLowerCase().replace(/\s+/g, '.')}@profesional.com.ar`,
    phone: `+54 11 ${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
    website: `https://www.${name.toLowerCase().replace(/\s+/g, '')}.com.ar`,
    location: generateLocation()
  },
  social: {
    linkedin: `https://linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '')}`,
    twitter: `https://twitter.com/${name.toLowerCase().replace(/\s+/g, '')}`,
    instagram: `https://instagram.com/${name.toLowerCase().replace(/\s+/g, '')}`,
    github: `https://github.com/${name.toLowerCase().replace(/\s+/g, '')}`
  },
  portfolio: [
    {
      title: 'Proyecto Destacado 1',
      description: `${profession} - Implementación exitosa de ${specialties[0]}`,
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
    },
    {
      title: 'Proyecto Destacado 2',
      description: `${profession} - Desarrollo innovador de ${specialties[1]}`,
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
    }
  ],
  certifications: [
    {
      title: `Certificación en ${specialties[0]}`,
      issuer: 'Instituto Tecnológico de Buenos Aires',
      year: 2020 + Math.floor(Math.random() * 3)
    },
    {
      title: `Especialización en ${specialties[1]}`,
      issuer: 'Universidad de Buenos Aires',
      year: 2018 + Math.floor(Math.random() * 5)
    }
  ],
  resources: [
    {
      type: 'pdf',
      title: 'Curriculum Vitae',
      url: 'https://example.com/cv.pdf'
    },
    {
      type: 'pdf',
      title: 'Portafolio Detallado',
      url: 'https://example.com/portfolio.pdf'
    }
  ]
});

// Generar 50 profesionales con datos más diversos
export const professionals: ProfessionalService[] = [
  // Desarrollo de Software
  generateProfessional('p1', 'Ana Martínez', 'Desarrolladora Full Stack', ['React', 'Node.js', 'TypeScript', 'AWS'], 'Palermo', 4.9, 47),
  generateProfessional('p2', 'Carlos López', 'DevOps Engineer', ['Docker', 'Kubernetes', 'CI/CD', 'Cloud'], 'Belgrano', 4.8, 38),
  generateProfessional('p3', 'María García', 'Mobile Developer', ['React Native', 'iOS', 'Android', 'Flutter'], 'Recoleta', 4.7, 42),
  generateProfessional('p4', 'Juan Rodríguez', 'Backend Developer', ['Java', 'Spring Boot', 'Microservices'], 'Núñez', 4.9, 35),
  generateProfessional('p5', 'Laura Fernández', 'Frontend Developer', ['React', 'Vue.js', 'Next.js', 'TypeScript'], 'Caballito', 4.8, 29),

  // Data Science & AI
  generateProfessional('p6', 'Diego Sánchez', 'Data Scientist', ['Python', 'Machine Learning', 'Deep Learning'], 'Villa Urquiza', 4.7, 31),
  generateProfessional('p7', 'Valentina Torres', 'Data Engineer', ['Spark', 'Hadoop', 'ETL', 'SQL'], 'Palermo', 4.9, 45),
  generateProfessional('p8', 'Martín Silva', 'ML Engineer', ['TensorFlow', 'PyTorch', 'Computer Vision'], 'Belgrano', 4.8, 33),
  generateProfessional('p9', 'Lucía Pérez', 'BI Analyst', ['Power BI', 'Tableau', 'Data Analytics'], 'Recoleta', 4.7, 28),
  generateProfessional('p10', 'Gabriel Morales', 'AI Researcher', ['NLP', 'Neural Networks', 'Research'], 'Núñez', 4.9, 41),

  // UX/UI & Diseño Digital
  generateProfessional('p11', 'Sofía Ruiz', 'UX/UI Designer', ['Figma', 'Design Systems', 'User Research'], 'Caballito', 4.8, 36),
  generateProfessional('p12', 'Federico Castro', 'Product Designer', ['UX Strategy', 'Wireframing', 'Prototyping'], 'Villa Urquiza', 4.7, 32),
  generateProfessional('p13', 'Carolina Díaz', 'UX Researcher', ['User Testing', 'Analytics', 'Research Methods'], 'Palermo', 4.9, 39),
  generateProfessional('p14', 'Andrés Molina', 'UI Designer', ['Design Systems', 'Visual Design', 'Animation'], 'Belgrano', 4.8, 34),
  generateProfessional('p15', 'Paula Vargas', 'Digital Product Designer', ['Design Thinking', 'UI/UX', 'Product Strategy'], 'Recoleta', 4.7, 43),

  // Cloud & DevOps
  generateProfessional('p16', 'Roberto Mendoza', 'Cloud Architect', ['AWS', 'Azure', 'GCP'], 'Núñez', 4.9, 37),
  generateProfessional('p17', 'Camila Flores', 'SRE', ['Kubernetes', 'Terraform', 'Monitoring'], 'Caballito', 4.8, 30),
  generateProfessional('p18', 'Lucas Herrera', 'DevOps Engineer', ['Jenkins', 'GitLab', 'CI/CD'], 'Villa Urquiza', 4.7, 35),
  generateProfessional('p19', 'Daniela Ríos', 'Platform Engineer', ['Infrastructure', 'Cloud Native', 'DevOps'], 'Palermo', 4.9, 40),
  generateProfessional('p20', 'Tomás Acosta', 'Security Engineer', ['Cybersecurity', 'DevSecOps', 'Pentesting'], 'Belgrano', 4.8, 44),

  // Product & Project Management
  generateProfessional('p21', 'Julia Sánchez', 'Product Manager', ['Product Strategy', 'Agile', 'User Stories', 'Roadmapping'], 'Palermo', 4.7, 28),
  generateProfessional('p22', 'Miguel Torres', 'Technical Project Manager', ['Scrum', 'JIRA', 'Risk Management', 'Agile'], 'Belgrano', 4.9, 42),
  generateProfessional('p23', 'Laura Rodríguez', 'Product Owner', ['Backlog Management', 'User Stories', 'Stakeholder Management'], 'Recoleta', 4.8, 35),
  generateProfessional('p24', 'Fernando García', 'Agile Coach', ['Scrum Master', 'Kanban', 'Team Facilitation'], 'Núñez', 4.7, 31),
  generateProfessional('p25', 'Carmen Díaz', 'Digital Project Manager', ['Agile', 'Digital Products', 'Team Leadership'], 'Caballito', 4.8, 39),

  // Blockchain & Web3
  generateProfessional('p26', 'Ricardo Pérez', 'Blockchain Developer', ['Solidity', 'Smart Contracts', 'DApps'], 'Villa Urquiza', 4.9, 45),
  generateProfessional('p27', 'Elena Morales', 'Smart Contract Engineer', ['Ethereum', 'Web3.js', 'DeFi'], 'Palermo', 4.7, 29),
  generateProfessional('p28', 'Pablo Silva', 'Blockchain Architect', ['Hyperledger', 'Consensus Protocols', 'Cryptography'], 'Belgrano', 4.8, 36),
  generateProfessional('p29', 'Diana Castro', 'DeFi Developer', ['Smart Contracts', 'DeFi Protocols', 'Tokenomics'], 'Recoleta', 4.7, 33),
  generateProfessional('p30', 'Andrés Ruiz', 'Web3 Developer', ['Web3.js', 'NFTs', 'Blockchain'], 'Núñez', 4.8, 37),

  // IoT & Edge Computing
  generateProfessional('p31', 'Valeria López', 'IoT Solutions Architect', ['IoT Platforms', 'Edge Computing', 'Sensors'], 'Caballito', 4.7, 28),
  generateProfessional('p32', 'Hugo Martín', 'Edge Computing Engineer', ['Edge AI', 'IoT Security', 'Embedded Systems'], 'Villa Urquiza', 4.9, 41),
  generateProfessional('p33', 'Natalia Flores', 'IoT Developer', ['Arduino', 'Raspberry Pi', 'MQTT'], 'Palermo', 4.8, 44),
  generateProfessional('p34', 'Roberto Vargas', 'Industrial IoT Specialist', ['IIoT', 'Industry 4.0', 'PLC Programming'], 'Belgrano', 4.7, 32),
  generateProfessional('p35', 'Luciana Torres', 'IoT Security Engineer', ['IoT Security', 'Network Protocols', 'Encryption'], 'Recoleta', 4.8, 35),

  // Machine Learning & AI
  generateProfessional('p36', 'Martín Soto', 'ML Engineer', ['TensorFlow', 'PyTorch', 'Deep Learning'], 'Núñez', 4.7, 38),
  generateProfessional('p37', 'Carolina Ríos', 'AI Research Scientist', ['Deep Learning', 'Computer Vision', 'NLP'], 'Caballito', 4.9, 40),
  generateProfessional('p38', 'Gabriel Mendoza', 'MLOps Engineer', ['ML Pipeline', 'Model Deployment', 'Monitoring'], 'Villa Urquiza', 4.8, 43),
  generateProfessional('p39', 'Patricia Luna', 'Computer Vision Engineer', ['OpenCV', 'Deep Learning', 'Image Processing'], 'Palermo', 4.7, 30),
  generateProfessional('p40', 'Javier Acosta', 'NLP Engineer', ['Natural Language Processing', 'BERT', 'Transformers'], 'Belgrano', 4.8, 39),

  // Cloud Native & Microservices
  generateProfessional('p41', 'Mariana Ortiz', 'Cloud Native Architect', ['Kubernetes', 'Service Mesh', 'Microservices'], 'Recoleta', 4.9, 46),
  generateProfessional('p42', 'Sebastián Paz', 'Microservices Developer', ['Spring Boot', 'Node.js', 'API Design'], 'Núñez', 4.8, 34),
  generateProfessional('p43', 'Cecilia Vega', 'Platform Engineer', ['Kubernetes', 'Service Mesh', 'GitOps'], 'Caballito', 4.7, 31),
  generateProfessional('p44', 'Ramiro Blanco', 'Site Reliability Engineer', ['SRE', 'Observability', 'Chaos Engineering'], 'Villa Urquiza', 4.9, 38),
  generateProfessional('p45', 'Victoria Paz', 'DevOps Architect', ['CI/CD', 'Infrastructure as Code', 'Cloud Native'], 'Palermo', 4.8, 42),

  // Cybersecurity & Privacy
  generateProfessional('p46', 'Leonardo Quiroga', 'Security Architect', ['Cloud Security', 'Zero Trust', 'IAM'], 'Belgrano', 4.7, 36),
  generateProfessional('p47', 'Isabel Montero', 'Application Security Engineer', ['SAST', 'DAST', 'Security Testing'], 'Recoleta', 4.8, 33),
  generateProfessional('p48', 'Gustavo Rojas', 'Cloud Security Engineer', ['AWS Security', 'Azure Security', 'GCP Security'], 'Núñez', 4.9, 41),
  generateProfessional('p49', 'Adriana Méndez', 'Security Operations Engineer', ['SOC', 'SIEM', 'Threat Detection'], 'Caballito', 4.7, 29),
  generateProfessional('p50', 'Raúl Giménez', 'Privacy Engineer', ['GDPR', 'Privacy by Design', 'Data Protection'], 'Villa Urquiza', 4.8, 37),

  // Data Engineering & Analytics
  generateProfessional('p51', 'Marcos Vega', 'Data Architect', ['Data Modeling', 'Big Data', 'Data Warehousing'], 'Palermo', 4.8, 43),
  generateProfessional('p52', 'Carla Suárez', 'Analytics Engineer', ['dbt', 'SQL', 'Data Pipelines'], 'Belgrano', 4.7, 35),
  generateProfessional('p53', 'Ignacio Ríos', 'Big Data Engineer', ['Spark', 'Kafka', 'Hadoop'], 'Recoleta', 4.9, 38),
  generateProfessional('p54', 'Romina Paz', 'Data Quality Engineer', ['Data Validation', 'ETL', 'Data Governance'], 'Núñez', 4.8, 31),
  generateProfessional('p55', 'Emilio Torres', 'Business Intelligence', ['Power BI', 'Tableau', 'Data Visualization'], 'Caballito', 4.7, 36),

  // API & Integration
  generateProfessional('p56', 'Luciano Mora', 'API Architect', ['REST', 'GraphQL', 'API Gateway'], 'Villa Urquiza', 4.8, 42),
  generateProfessional('p57', 'Celeste Ramos', 'Integration Specialist', ['ESB', 'Microservices', 'Event-Driven'], 'Palermo', 4.9, 39),
  generateProfessional('p58', 'Felipe Ortiz', 'API Security Expert', ['OAuth', 'JWT', 'API Security'], 'Belgrano', 4.7, 34),
  generateProfessional('p59', 'Marina Costa', 'API Developer', ['REST', 'OpenAPI', 'API Design'], 'Recoleta', 4.8, 37),
  generateProfessional('p60', 'Gonzalo Silva', 'Integration Architect', ['SOA', 'EAI', 'Middleware'], 'Núñez', 4.9, 45),

  // Low-Code & No-Code
  generateProfessional('p61', 'Valentín Rojas', 'Low-Code Developer', ['OutSystems', 'Mendix', 'Power Platform'], 'Caballito', 4.7, 32),
  generateProfessional('p62', 'Renata Paz', 'No-Code Expert', ['Bubble', 'Webflow', 'Zapier'], 'Villa Urquiza', 4.8, 29),
  generateProfessional('p63', 'Bruno López', 'Automation Specialist', ['Power Automate', 'Zapier', 'n8n'], 'Palermo', 4.9, 33),
  generateProfessional('p64', 'Camila Torres', 'Citizen Developer', ['AppSheet', 'Airtable', 'Retool'], 'Belgrano', 4.7, 28),
  generateProfessional('p65', 'Matías Ruiz', 'Process Automation', ['UiPath', 'Automation Anywhere', 'Blue Prism'], 'Recoleta', 4.8, 36),

  // AR/VR & Metaverse
  generateProfessional('p66', 'Lucas Peralta', 'AR Developer', ['Unity AR', 'ARKit', 'ARCore'], 'Núñez', 4.9, 34),
  generateProfessional('p67', 'Sofía Medina', 'VR Engineer', ['Unity VR', 'Unreal Engine', 'OpenXR'], 'Caballito', 4.8, 31),
  generateProfessional('p68', 'Diego Vargas', 'Metaverse Developer', ['Unity', 'WebXR', '3D Modeling'], 'Villa Urquiza', 4.7, 29),
  generateProfessional('p69', 'Ana Quiroga', 'XR Designer', ['Spatial Computing', 'UX for VR', 'Interaction Design'], 'Palermo', 4.9, 35),
  generateProfessional('p70', 'Julián Castro', '3D Developer', ['Three.js', 'WebGL', 'Babylon.js'], 'Belgrano', 4.8, 32),

  // Quantum Computing & Advanced Tech
  generateProfessional('p71', 'Leonardo Sosa', 'Quantum Developer', ['Qiskit', 'Q#', 'Quantum Algorithms'], 'Recoleta', 4.9, 38),
  generateProfessional('p72', 'Clara Vidal', 'Quantum Researcher', ['Quantum ML', 'Quantum Cryptography', 'Algorithms'], 'Núñez', 4.8, 36),
  generateProfessional('p73', 'Martín Paz', 'Quantum Engineer', ['Circuit Design', 'Quantum Computing', 'Physics'], 'Caballito', 4.7, 33),
  generateProfessional('p74', 'Victoria Luna', 'Advanced Computing', ['HPC', 'Quantum', 'Supercomputing'], 'Villa Urquiza', 4.9, 37),
  generateProfessional('p75', 'Rafael Torres', 'Research Engineer', ['Advanced Algorithms', 'Scientific Computing', 'R&D'], 'Palermo', 4.8, 35)
];