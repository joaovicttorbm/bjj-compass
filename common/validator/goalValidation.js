import { z } from 'zod';

export const goalSchemaValidation = z.object({
  description: z
    .string()
    .min(5, 'Description must have at least 5 characters')
    .max(255, 'Description cannot exceed 255 characters')
    .nonempty('Description is required'),

  status: z
    .enum(['in_progress', 'completed', 'abandoned'])
    .default('in_progress'),

  progress: z
    .number()
    .min(0, 'Progress cannot be less than 0%')
    .max(100, 'Progress cannot exceed 100%')
    .default(0),

  notifications: z
    .boolean()
    .default(true),

  user_id: z
    .string()
    .min(24, 'User ID must be exactly 24 characters long')
    .max(24, 'User ID must be exactly 24 characters long')
    .refine(value => /^[0-9a-fA-F]{24}$/.test(value), {
      message: 'Invalid User ID format',
    }),
}).refine(
  data => !(data.status === 'completed' && data.progress < 100),
  {
    message: 'Status cannot be "completed" unless progress is 100%',
    path: ['status'],
  }
);
