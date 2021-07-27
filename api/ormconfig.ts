import * as dotenv from 'dotenv';

dotenv.config();
console.log(process.env.POSTGRES_HOST);
export = {
  type: 'postgres' as const,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/**/entities/*.entity.ts'],
  migrations: ['migrations/*.{ts,js}'],
  cli: {
    migrationsDir: 'migrations/',
  },
  extra: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  },
};
