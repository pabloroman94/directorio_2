/**
 * Base class for API service simulations
 * Provides common functionality for all API services
 */
export abstract class ApiService {
  protected async simulateDelay(ms: number = 500): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, ms));
  }

  protected handleError(message: string): never {
    throw new Error(message);
  }

  protected validateId(id: string | undefined): void {
    if (!id) {
      this.handleError('ID is required');
    }
  }

  protected validateRequired<T>(data: T, fields: (keyof T)[]): void {
    for (const field of fields) {
      if (!data[field]) {
        this.handleError(`${String(field)} is required`);
      }
    }
  }
}