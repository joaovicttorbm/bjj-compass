import { z } from 'zod';

const email = z.string().email('Invalid email format').min(3, "must be at least 3 characters long").max(255)
const password =  z.string().min(8, 'Password must be at least 8 characters long').max(255)

export const userSchemaValidation = z.object({
    username: z.string().min(5, 'Username must be at least 5 characters long').max(255),
    email: email ,
    password: password
  });

export const loginSchemaValidation = z.object({
    email: email ,
    password: password
  });
  
export const  emailSchemaValidation = z.object({
  email: email  
});

export const resetPasswordSchemaValidation = z.object({
  newPassword: password ,
  token: z.string().min(10, "Token inválido").max(500) 
});
