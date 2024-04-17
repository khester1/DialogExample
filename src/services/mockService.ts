import mockServiceData from "../data/mockServiceData";

export const fetchTearSheets = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve(mockServiceData)
      };
      resolve(mockResponse);
    }, 1000); 
  });
};
