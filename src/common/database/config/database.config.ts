import * as dotenv from 'dotenv';
dotenv.config();
import mariadb from 'mariadb';
import { registerAs } from '@nestjs/config';

export const basicSettings = {
  dialect: 'mysql',
  dialectModule: mariadb,
  logging: false,
  force: false,
  timezone: '+00:00',
  dateStrings: true,
  define: { charset: 'utf8', collate: 'utf8_general_ci' },
  pool: {
    max: 30,
    min: 0,
    idl: 10000,
    acquire: 60000,
  },
  autoLoadModels: true,
  synchronize: false,
};
export default registerAs('database', () => ({
  ...basicSettings,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
}));
