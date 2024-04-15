import mockTearSheetData from "../data/mockTearSheetData";

export const fetchTearSheets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(mockTearSheetData) // Directly pass the mock data object
      };
      resolve(mockResponse);
    }, 1000); // Simulate a network delay
  });
};
