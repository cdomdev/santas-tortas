import { query } from "./strapi";

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
