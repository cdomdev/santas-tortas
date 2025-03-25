import { query } from "./strapi";
// 1️⃣ obnter todas las categorias

export async function getCategories() {
  const response = query(`categories?fields[0]=name`, "GET", true);
  return (await response).data
}

// 2️⃣ obnter cada categoria con los productos asociados

export async function getCategorieBy(name: string) {
  const response = query(
    `products?filters[category][name][$eq]=${name}&fields[0]=title&fields[1]=price&fields[2]=discount&fields[3]=stock&fields[4]=creationDate&fields[5]=description&fields[6]=slug&populate[images][fields][0]=url&populate[category][fields][0]=name`,
    "GET",
    true
  );
  return (await response).data
}
