import { z } from 'zod';

export const userSchemaValidation = z.object({
    username: z.string().min(5, 'Username must be at least 5 characters long').max(255),
    email: z.string().email('Invalid email format').min(3, "must be at least 3 characters long").max(255),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(255)
  });