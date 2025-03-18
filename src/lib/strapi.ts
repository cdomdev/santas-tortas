import axios from "axios";

const HOST_STRAPI = import.meta.env.PUBLIC_HOST;
const TOKEN_STRAPI = import.meta.env.PUBLIC_TOKEN_CLIENT_APP;

const api = axios.create({
  baseURL: `${HOST_STRAPI}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function query(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any,
  useToken: boolean = true,
  withCredentials: boolean = true
) {
  try {
    const headers: Record<string, string> = {};

    if (useToken) {
      headers["Authorization"] = `Bearer ${TOKEN_STRAPI}`;
    }

    const response = await api({
      url,
      method,
      data: body,
      headers,
      withCredentials,
    });

    if (!response) return [];

    return response.data;
  } catch (error: any) {
    console.error("Error en la solicitud:", error.message);
    if (error.code === "ECONNREFUSED") {
      return { error: true, message: "El servidor no está disponible" };
    }

    return {
      error: true,
      message: error.response?.data?.message || "Error desconocido",
    };
  }
}
