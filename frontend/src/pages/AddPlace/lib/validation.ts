import z from 'zod';

export const schemaAddEstablishment = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long!' })
    .max(100, { message: 'Name must be at most 100 characters long!' }),
  description: z
    .string()
    .trim()
    .min(10, { message: 'Description must be at least 10 characters long!' })
    .max(1000, {
      message: 'Description must be at most 1000 characters long!',
    }),
  mainPhoto: z
    .instanceof(File, { message: 'Photo is required' })
    .refine((file) => file.size > 0, { message: 'Photo is required' }),
  terms: z.literal(true, { message: 'You must agree to the terms' }),
});

export type AddEstablishmentFormData = z.infer<typeof schemaAddEstablishment>;
