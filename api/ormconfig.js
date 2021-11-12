require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/entities/*.entity{ .ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
  // extra: {
  //   ssl:
  //     process.env.NODE_ENV === 'production'
  //       ? { rejectUnauthorized: false }
  //       : false,
  // },
};
