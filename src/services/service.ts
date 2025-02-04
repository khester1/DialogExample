export interface Order {
  stn_orderid: string;
  stn_creditreleasedby: string; // Should be the GUID of the user
  stn_creditreleaseddate: string;
  stn_creditreleasereason: number;
  statuscode: number;
}

export class Service {
  private Xrm: any;

  constructor(Xrm: any) {
    if (!Xrm) {
      throw new Error("Xrm object is required");
    }
    this.Xrm = Xrm;
  }

  public async updateOrders(updates: Order[]): Promise<void> {
    try {
      for (const update of updates) {
        // Prepare the record object
        const record: { [key: string]: any } = {
          "stn_creditreleasedby@odata.bind": `/systemusers(${update.stn_creditreleasedby})`, // Correctly format lookup field
          stn_creditreleaseddate: update.stn_creditreleaseddate,
          stn_creditreleasereason: update.stn_creditreleasereason,
          statuscode: update.statuscode,
        };

        //Possible Separeate Class to handles this for local and real testing
        await this.Xrm.WebApi.updateRecord(
          "stn_order",
          update.stn_orderid,
          record
        );
      }
    } catch (error) {
      console.error("Error updating orders:", error);
      throw error;
    }
  }
}
