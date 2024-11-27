const BASE_URL = import.meta.env.VITE_API_URL;

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: unknown = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(BASE_URL + url, options).then((response) => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: unknown) => request<T>(url, 'POST', data),
  put: <T>(url: string, data: unknown) => request<T>(url, 'PUT', data),
  delete: (url: string) => request(url, 'DELETE'),
};
