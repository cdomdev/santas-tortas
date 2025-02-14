import { defineCollection, z } from "astro:content";

const content = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {content};
