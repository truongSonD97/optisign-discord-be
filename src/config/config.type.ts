import { DatabaseConfig } from './database-config/database-config.type';
import { AppConfig } from './app-config/app-config.type';
import { AuthConfig } from './auth-config/auth-config.type';

export type AllConfigType = {
  app: AppConfig;
  auth: AuthConfig;
  database: DatabaseConfig;
};