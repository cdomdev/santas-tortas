import { query } from "./strapi";
import type { GoogleAuthResponse } from "@/types/types";

interface PropLogin {
  email: string;
  password: string;
  passwordRepeat: string;
}

interface RegisterProp extends PropLogin {
  nombre: string;
}

export async function login(data: PropLogin) {
  return query(
    `/auth/local`,
    "POST",
    {
      identifier: data.email,
      password: data.password,
    },
    false
  );
}

export async function register(data: RegisterProp) {
  return query(
    `/auth/local/register`,
    "POST",
    {
      username: data.nombre,
      email: data.email,
      password: data.password,
    },
    false
  );
}

export async function googleAuth(response: GoogleAuthResponse) {
  try {
    const responseServer = await query(
      `/auth/google`,
      "POST", 
      {
        token: response.access_token,
      },
     
    );
    return responseServer;
  } catch (error) {}
}
