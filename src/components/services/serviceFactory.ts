// src/services/serviceFactory.ts

import { MockService } from "./localservice"; // Import the unified MockService
import { Service } from "./service";

export const isMockEnvironment = true; // Toggle this to switch between real and mock services

export class ServiceFactory {
  static createOptionSetService(
    context: ComponentFramework.Context<any, ComponentFramework.IEventBag>
  ) {
    throw new Error("Method not implemented.");
  }
  static createService(context: ComponentFramework.Context<any>) {
    if (isMockEnvironment) {
      return new MockService(); // Mock service for local testing
    } else {
      return new Service(context); // Real service for production
    }
  }
}
