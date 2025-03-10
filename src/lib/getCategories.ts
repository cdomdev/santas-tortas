import { query } from "./strapi";
// 1️⃣ obnter todas las categorias

export async function getCategories() {
  return query(`categories?fields[0]=name`, "GET", false)
}

// 2️⃣ obnter cada categoria con los productos asociados


export async function getCategorieBy(name: string) {
  console.log('datos de la categoria', name)
  return query(
    `https://apisantastortas-production.up.railway.app/api/products?filters[category][name][$eq]=${name}&fields[0]=title&fields[1]=price&fields[2]=discount&fields[3]=stock&fields[4]=creationDate&fields[5]=description&fields[6]=slug&populate[images][fields][0]=url&populate[category][fields][0]=name`, "GET", false
  )
}
