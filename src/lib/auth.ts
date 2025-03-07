import { query } from "./strapi";

type PropLogin = {
  email: string;
  password: string;
  passwordRepeat: string;
};

export async function initSesion(data: PropLogin) {
    return query(`/auth/local`, "POST", {
      identifier: data.email,
      password: data.password,
    }, false); 
  }
  