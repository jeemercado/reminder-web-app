/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      SERVER_PORT: number;
      DATABASE_USER: string;
      DATABASE_HOST: string;
      DATABASE_NAME: string;
      DATABASE_PASSWORD: string;
      DATABASE_PORT: string;
      SALT_WORK_FACTOR: string;
      JWT_PRIVATE_KEY: string;
      JWT_PUBLIC_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// Convert it into a module by adding an empty export statement
export {};
