// src/services/MockApiService.ts
import { IApiService } from "./IApiService";

export class MockApiService implements IApiService {
  public async updateRecord(
    entity: string,
    id: string,
    record: any
  ): Promise<any> {
    console.log(`Mock update on ${entity} with id ${id}:`, record);
    // Simulate a successful API call
    return Promise.resolve({ success: true });
  }
}
