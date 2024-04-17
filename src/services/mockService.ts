import mockServiceData from "../data/mockServiceData";

export const fetchData = (requestOptions: RequestInit | undefined) => {
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
