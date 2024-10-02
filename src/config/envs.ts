import { z } from 'zod';

const envsSchema = z.object({
  PORT: z.coerce.number(),
  DEV: z.coerce.boolean().default(true),
});

export const envs = envsSchema.parse({
  PORT: process.env.PORT,
  DEV: process.env.DEV,
});
