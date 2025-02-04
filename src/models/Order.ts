// src/models/Order.ts

import { OrderConstants } from "../constants/OrderConstants";
import { IApiService } from "../services/IApiService";

export class Order {
  // Instance properties using a simplified naming convention.
  // These names can differ from the constants' names, which are used for API calls.
  orderId: string;
  creditReleasedBy: string; // GUID of the user
  creditReleasedDate: string;
  creditReleaseReason: number;
  statusCode: number;

  constructor(
    orderId: string,
    creditReleasedBy: string,
    creditReleasedDate: string,
    creditReleaseReason: number,
    statusCode: number
  ) {
    this.orderId = orderId;
    this.creditReleasedBy = creditReleasedBy;
    this.creditReleasedDate = creditReleasedDate;
    this.creditReleaseReason = creditReleaseReason;
    this.statusCode = statusCode;
  }

  // Validation logic (can be expanded as needed)
  public validate(): void {
    if (!this.orderId) {
      throw new Error("Order ID is required.");
    }
    // Add further validation rules here as needed.
  }

  /**
   * Static method to update multiple orders.
   *
   * @param apiService An instance of an API service that implements IApiService.
   * @param orders An array of Order objects to update.
   */
  public static async updateOrders(
    apiService: IApiService,
    orders: Order[]
  ): Promise<void> {
    try {
      for (const order of orders) {
        // Validate the order before proceeding.
        order.validate();

        // Build the payload using the constants from OrderConstants.
        const record: { [key: string]: any } = {
          // Using the constant for "CreditReleasedBy" and binding it to a systemuser.
          [`${OrderConstants.CreditReleasedBy}@odata.bind`]: `/systemusers(${order.creditReleasedBy})`,
          // Using the constants for other fields.
          [OrderConstants.CreditReleasedDate]: order.creditReleasedDate,
          [OrderConstants.CreditReleaseReason]: order.creditReleaseReason,
          // You might choose the appropriate constant for status (for example, OrderConstants.Status or OrderConstants.OrderStatus)
          [OrderConstants.OrderStatus]: order.statusCode,
        };

        // Use the API service to perform the update.
        await apiService.updateRecord(
          OrderConstants.EntityName,
          order.orderId,
          record
        );
      }
    } catch (error) {
      console.error("Error updating orders:", error);
      throw error;
    }
  }
}
