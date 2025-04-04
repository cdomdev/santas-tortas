import { query } from "./strapi";
export async function getProducts(sort?: string | undefined) {
  let url =
    "products?fields[0]=title&fields[1]=price&fields[2]=discount&fields[3]=stock&fields[4]=creationDate&fields[5]=description&fields[6]=slug&populate[images][fields][0]=url&populate[category][fields][0]=name";
  if (sort) {
    url += sort;
  }
  const response = query(url, "GET", true);
  return (await response).data;
}

export async function getProductsBy(slug: string) {
  const response = query(
    `products?filters[slug][$eq]=${slug}&fields[0]=title&fields[1]=price&fields[2]=discount&fields[3]=stock&fields[4]=creationDate&fields[5]=description&fields[6]=slug&populate[images][fields][0]=url&populate[category][fields][0]=name`,
    "GET",
    true
  );
  return (await response).data;
}

export async function getOferts() {
  const response = query(
    `products?fields[0]=title&fields[1]=price&fields[2]=discount&fields[3]=stock&fields[4]=creationDate&fields[5]=description&fields[6]=slug&populate[images][fields][0]=url&populate[category][fields][0]=name&populate?&filters[discount][$gt]=0`,
    "GET",
    true
  );
  return (await response).data;
}
