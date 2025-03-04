import { query } from "./strapi";
// 1️⃣ obnter todas las categorias

export function getCategories() {
  return query(`categories?fields[0]=name`).then((res) => {
    return res;
  });
}

// 2️⃣ obnter cada categoria con los productos asociados


export function getCategorieBy(name: string) {
  return query(
    `categories?fields[0]=name&filters[name][$eq]=${name}&populate[products][fields][0]=title&populate[products][fields][1]=price&populate[products][fields][2]=discount&populate[products][fields][3]=stock&populate[products][fields][4]=creationDate&populate[products][fields][5]=slug&populate[products][fields][6]=description&populate[products][populate][images][fields][0]=url`
  ).then((res) => {
    return res;
  });
}
