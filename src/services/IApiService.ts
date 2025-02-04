// src/services/IApiService.ts
export interface IApiService {
  updateRecord(entity: string, id: string, record: any): Promise<any>;
}
