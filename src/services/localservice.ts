export interface OptionSetValue {
  value: number;
  label: string;
}

export interface OrderUpdate {
  stn_orderid: string; // The Order ID
  stn_creditreleasedby: string; // User ID
  stn_creditreleaseddate: string; // ISO Date
  stn_creditreleasereason: number; // Option set value
  statuscode: number; // Status code
}

export class MockService {
  /**
   * Simulates fetching options for a global Option Set.
   * @param optionSetName Name of the Option Set to simulate fetching.
   * @returns A promise resolving to a list of OptionSetValue objects.
   */
  public async getGlobalChoiceOptions(
    optionSetName: string
  ): Promise<OptionSetValue[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (optionSetName === "stn_creditreleasereasons") {
          resolve([
            { value: 272280000, label: "Approved Funds" },
            { value: 272280001, label: "Automatic Release" },
            { value: 272280002, label: "Approved CAD Account" },
            { value: 272280003, label: "Approved Check On The Way" },
            {
              value: 272280004,
              label: "Approved Funds In Hand But Not Applied",
            },
            { value: 272280005, label: "Approved Per The GM" },
            { value: 272280006, label: "Approved Internal Application Issues" },
            { value: 272280007, label: "Approved Logistics Issues" },
            { value: 272280008, label: "Approved Per Senior Management" },
            {
              value: 272280009,
              label: "Approved Load # Released, Truck Waiting",
            },
            { value: 272280010, label: "Approved Replacement Load" },
            { value: 272280011, label: "Approved Rejected/Returned Load" },
            {
              value: 272280012,
              label: "Approved Load Already Shipped Prior To...",
            },
            { value: 272280013, label: "Approved Per Trader" },
          ]);
        } else {
          reject(new Error(`Option set "${optionSetName}" not found.`));
        }
      }, 1000); // Simulated 1-second delay
    });
  }

  /**
   * Simulates retrieving an array of order IDs from the custom page.
   * @returns A promise resolving to a list of order IDs.
   */
  public async getSelectedOrderIds(): Promise<string[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          "00000000-0000-0000-0000-000000000001",
          "00000000-0000-0000-0000-000000000002",
          "00000000-0000-0000-0000-000000000003",
        ]);
      }, 1000); // Simulated 1-second delay
    });
  }

  /**
   * Simulates updating order records with new data.
   * @param updates Array of order updates.
   * @returns A promise resolving when the operation is complete.
   */
  public async updateOrders(updates: OrderUpdate[]): Promise<void> {
    return new Promise((resolve) => {
      console.log("Mock updating orders with the following data:", updates);
      setTimeout(() => resolve(), 1000); // Simulated 1-second delay
    });
  }
}
