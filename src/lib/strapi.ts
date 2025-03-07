// funcion con fecht
// export async function query(url: string) {
//   const HOST_STRAPI = import.meta.env.PUBLIC_HOST;
//   const TOKEN_STRAPI = import.meta.env.PUBLIC_TOKEN_CLIENT_APP;

//   return fetch(`${HOST_STRAPI}/api/${url}`, {
//     headers: {
//       Authorization: `Bearer ${TOKEN_STRAPI}`,
//     },
//   }).then((res) => res.json());
// }

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
  useToken: boolean = true
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
    });

    return response.data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}
