import { query } from "./strapi";

interface PropSub {
  email: string;
}

export async function susbcribre(email: PropSub) {
  try {
    return query(`/subscribers`, "POST", email, false);
  } catch (error) {
    console.log(error);
    return null;
  }
}
