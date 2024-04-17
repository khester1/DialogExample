import mockServiceData from "../data/mockServiceData";

export const fetchTearSheets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(mockServiceData) // Directly pass the mock data object
      };
      resolve(mockResponse);
    }, 1000); // Simulate a network delay
  });
};
