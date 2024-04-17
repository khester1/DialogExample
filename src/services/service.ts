
const apiUrl = "https://ExampleSite.azurewebsites.net/api";

export const fetchData = (requestOptions: RequestInit | undefined) => {
  return fetch(`${apiUrl}/Example?code=123456`, requestOptions);
};
