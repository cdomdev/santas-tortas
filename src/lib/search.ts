import { query } from "./strapi";

export async function searchProducts(key: string) {
  const res = await query(
    `products?populate=*&filters[title][$containsi]=${key}`,
    "GET",
    false
  );
  return res.data;
}
