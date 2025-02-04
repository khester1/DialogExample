// src/services/FetchApiService.ts
import { IApiService } from "./IApiService";

export class FetchApiService {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor(baseUrl: string, headers?: HeadersInit) {
    this.baseUrl = baseUrl;
    this.headers = Object.assign(
      { "Content-Type": "application/json" },
      headers
    );
  }

  public async updateRecord(
    entity: string,
    id: string,
    record: any
  ): Promise<any> {
    const url = `${this.baseUrl}/${entity}(${id})`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(record),
    });
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.statusText}`);
    }
    return response.json();
  }
}
