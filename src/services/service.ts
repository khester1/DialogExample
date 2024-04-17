
const apiUrl = "https://ExampleSite.azurewebsites.net/api";

export const fetchTearSheets = (requestOptions: RequestInit | undefined) => {
  return fetch(`${apiUrl}/Example?code=123456`, requestOptions);
};
