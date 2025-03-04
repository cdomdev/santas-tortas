export async function query(url: string) {
  const HOST_STRAPI = import.meta.env.PUBLIC_HOST;
  const TOKEN_STRAPI = import.meta.env.PUBLIC_TOKEN_CLIENT_APP;
  
  return fetch(`${HOST_STRAPI}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${TOKEN_STRAPI}`,
    },
  }).then((res) => res.json());
}
