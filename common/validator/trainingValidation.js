  import { z } from 'zod';

export const trainingSchemaValidation = z.object({
    date: z
      .date()
      .optional() 
      .default(() => new Date()), 
    
    techniques: z
      .array(z.string())
      .min(1, 'At least one technique must be provided')
      .max(10, 'Cannot have more than 10 techniques'),
  
    durationMinutes: z
      .number()
      .int('Duration must be an integer')
      .positive('Duration must be a positive number')
      .min(1, 'Duration must be at least 1 minute')
      .max(240, 'Duration cannot exceed 240 minutes'), 
  
    intensityLevel: z
      .string()
      .refine(value => ['low', 'medium', 'high'].includes(value), {
        message: 'Intensity level must be one of ["low", "medium", or "high"]',
      }),
  
    notes: z
      .string()
      .max(500, 'Notes cannot exceed 500 characters')
      .optional(),
  
    user_id: z
      .string()
      .min(24, 'User ID must be at least 24 characters long')  
      .max(24, 'User ID cannot exceed 24 characters')
      .refine(value => /^[0-9a-fA-F]{24}$/.test(value), {
        message: 'Invalid User ID format', 
      }),
  });