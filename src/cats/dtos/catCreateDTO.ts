import { z } from 'zod';

export const catCreateDTO = z.object({
  name: z.string(),
  breed: z.string(),
  ageInYears: z.coerce.number(),
});

export type CatCreateDTO = z.infer<typeof catCreateDTO>;
