// src/services/XrmApiService.ts
import { IApiService } from "./IApiService";

export class XrmApiService implements IApiService {
  private Xrm: any;

  constructor(Xrm: any) {
    if (!Xrm) {
      throw new Error("Xrm object is required");
    }
    this.Xrm = Xrm;
  }

  public updateRecord(entity: string, id: string, record: any): Promise<any> {
    // Uses the Dynamics 365 Xrm.WebApi for the call
    return this.Xrm.WebApi.updateRecord(entity, id, record);
  }
}
