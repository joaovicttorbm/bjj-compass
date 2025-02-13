import { z } from 'zod';

const dateSchema = z
  .date()
  .optional()
  .default(() => new Date());

const techniquesSchema = z
  .array(z.string())
  .min(1, 'At least one technique must be provided')
  .max(10, 'Cannot have more than 10 techniques');

const durationMinutesSchema = z
  .number()
  .int('Duration must be an integer')
  .positive('Duration must be a positive number')
  .min(1, 'Duration must be at least 1 minute')
  .max(240, 'Duration cannot exceed 240 minutes');

const intensityLevelSchema = z.enum(['low', 'medium', 'high']);

const notesSchema = z
  .string()
  .max(500, 'Notes cannot exceed 500 characters')
  .optional();

const userIdSchema = z
  .string()
  .length(24, 'User ID must be exactly 24 characters long')
  .refine(value => /^[0-9a-fA-F]{24}$/.test(value), {
    message: 'Invalid User ID format',
  });

// Validação para criação de treinamento
export const trainingSchemaValidation = z.object({
  date: dateSchema,
  techniques: techniquesSchema,
  durationMinutes: durationMinutesSchema,
  intensityLevel: intensityLevelSchema,
  notes: notesSchema,
  user_id: userIdSchema,
});

export const trainingUpdateSchemaValidation = z
  .object({
    date: dateSchema.optional(),
    techniques: techniquesSchema.optional(),
    durationMinutes: durationMinutesSchema.optional(),
    intensityLevel: intensityLevelSchema.optional(),
    notes: notesSchema.optional(),
  })
  .refine(data => {
    if (data.intensityLevel === 'high' && data.durationMinutes !== undefined && data.durationMinutes < 10) {
      return false;
    }
    return true;
  }, {
    message: 'If intensity level is "high", duration must be at least 10 minutes',
    path: ['durationMinutes'],
  });
