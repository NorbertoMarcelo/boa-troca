module.exports = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  migrations: ['./src/database/migrations/*.ts'],
  entities: ['./src/modules/**/entities/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
