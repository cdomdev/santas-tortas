import { query } from "./strapi";
export  function getProducts() {
  return query(
    "products?fields[0]=title&fields[1]=price&fields[2]=discount&fields[3]=stock&fields[4]=creationDate&fields[5]=description&fields[6]=slug&populate[images][fields][0]=url&populate[category][fields][0]=name"
  ).then((res) => {
    return res;
  });
}

export  function getProductsBy(slug: string) {
  return query(
    `products?filters[slug][$eq]=${slug}&fields[0]=title&fields[1]=price&fields[2]=discount&fields[3]=stock&fields[4]=creationDate&fields[5]=description&fields[6]=slug&populate[images][fields][0]=url&populate[category][fields][0]=name`
  ).then((res) => {
    return res;
  });
}

export function getOferts() {
  return query(
    `products?fields[0]=title&fields[1]=price&fields[2]=discount&fields[3]=stock&fields[4]=creationDate&fields[5]=description&fields[6]=slug&populate[images][fields][0]=url&populate[category][fields][0]=name&populate?&filters[discount][$gt]=0`
  ).then((res) => {
    return res;
  });
}
