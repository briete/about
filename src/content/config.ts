import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      author: z.string().default("briete"),
      pubDatetime: z
        .union([z.date(), z.string()])
        .transform(value => (value instanceof Date ? value : new Date(value))),
      updatedDatetime: z
        .union([z.date(), z.string()])
        .optional()
        .transform(value => {
          if (!value) return value;
          return value instanceof Date ? value : new Date(value);
        }),
      postSlug: z.string().optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
      heroImage: z.union([z.string(), image()]).optional(),
    }),
});

export const collections = {
  blog,
};
