import { query } from "./strapi";
import type { PersonalizedOrder } from "@/types";

export async function personalized(data: PersonalizedOrder) {
  const response = query("/personalized-orders-custom", "POST", {
    data,
  });
  return response;
}
