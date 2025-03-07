import { query } from "./strapi";

export async function searchProducts(key: string) {
  const res = await query(
    `products?populate=*&filters[title][$containsi]=${key}`
  );
  return res.data; 
}
