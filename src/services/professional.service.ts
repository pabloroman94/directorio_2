import type { Professional } from '../types';

export const ProfessionalService = {
  toggleStatus(professional: Professional) {
    if (!professional) {
      throw new Error('Professional not found');
    }
    const newStatus = professional.status === 'active' ? 'inactive' : 'active';
    return { ...professional, status: newStatus };
  }
};