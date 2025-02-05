import dotenv from 'dotenv';
dotenv.config();
export const getEnv = (key, defaultValue = "") => {
    const value = process.env[key];
    console.log(key)
    if (value === undefined) {
      if (defaultValue) {
        return defaultValue;
      }
      console.error(key)
      throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
  };  