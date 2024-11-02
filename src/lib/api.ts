import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function usingAnotherBearerRequest(
  token: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any
) {
  console.log(token)
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await api({
      method,
      url,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: method === "POST" || method === "PUT" ? data : undefined,
      signal,
    });
    return response;
  } catch (error: any) {
    if (error.code === "ECONNABORTED" || error.message === "canceled") {
      throw new Error("Request timed out");
    }
    return error.response || error;
  }
}


