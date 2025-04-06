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

    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Error en la solicitud:", error);

    // Si el error viene de una respuesta de Strapi (con su estructura de error)
    if (error.response && error.response.data?.error) {
      const { status, name, message, details } = error.response.data.error;
      return {
        success: false,
        status,
        name,
        message,
        details,
      };
    }

    // Si el error es de conexión o no tiene la estructura esperada
    return {
      error: error,
      success: false,
      status: error.response?.status || 500,
      message: error.message || "Error desconocido en la solicitud",
    };
  }
}
