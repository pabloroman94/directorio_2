import { CompanyService as CompanyType } from '../types/service';
import { companies } from '../data/mock/companies';

export const CompanyService = {
  async getAll(): Promise<CompanyType[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return companies;
  },

  async getById(id: string): Promise<CompanyType | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return companies.find(c => c.id === id) || null;
  },

  async create(company: Omit<CompanyType, 'id'>): Promise<CompanyType> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newCompany = {
      id: Date.now().toString(),
      ...company
    };
    return newCompany;
  },

  async update(id: string, data: Partial<CompanyType>): Promise<CompanyType> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const company = await this.getById(id);
    if (!company) {
      throw new Error('Company not found');
    }
    return { ...company, ...data };
  },

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const company = await this.getById(id);
    if (!company) {
      throw new Error('Company not found');
    }
  }
};