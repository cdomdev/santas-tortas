import axios from "axios";
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

// servicion de registro utiliza una ruta externa para el envio de email ->
export async function register(data: RegisterProp) {
  const HOST_EXTERNAL = import.meta.env.PUBLIC_HOST_EXTERNAL;

  try {
    return axios.post(`${HOST_EXTERNAL}/user/external/auth/register`, {
      username: data.nombre,
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function googleAuth(response: GoogleAuthResponse) {
  try {
    const responseServer = await query(`/auth/google`, "POST", {
      token: response.access_token,
    });
    return responseServer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
