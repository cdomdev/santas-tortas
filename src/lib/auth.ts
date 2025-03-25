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

// servicion de registro

export async function register(data: RegisterProp) {
  return query(`/auth/register`, "POST", {
    username: data.nombre,
    email: data.email,
    password: data.password,
  });
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

export async function sendRequestResettPassword(data: { email: string }) {
  try {
    return query(`/auth/forgot-password`, "POST", { email: data.email });
  } catch (error) {
    console.log(
      "Error en el envio de la peticion de restablecer contraseña ",
      error
    );
  }
}

export async function resetPassword(
  data: { password: string; password2: string },
 code: string
) {
  try {
    return query(`/auth/reset-password-custom`, "POST", {
      code,
      password: data.password,
      passwordConfirmation: data.password2,
    });
  } catch (error) {
    console.log("Error en el restablecimiento de la contraseña", error);
  }
}
