import { z } from 'zod';

export const schemaPost = z.object({
  body: z.string(),
  id: z.number(),
  title: z.string(),
  userId: z.number(),
});

export type Post = z.infer<typeof schemaPost>;
