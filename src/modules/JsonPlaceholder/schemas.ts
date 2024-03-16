import { z } from 'zod';

const jsonPlaceholderPostSchema = z.object({
  body: z.string(),
  id: z.number(),
  title: z.string(),
  userId: z.number(),
});

export const jsonPlaceholderPostApiValidationSchema = z.array(jsonPlaceholderPostSchema);
