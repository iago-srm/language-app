const commonConfig = {
  type: "sqlite",
  logging: false,
  // username: process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASSWORD,
  // synchronize makes the db reflect the model's code
  // "synchronize": process.env.NODE_ENV !== 'production',
  synchronize: true,
  entities: ["src/application/ports/repository/*.ts"],
  migrations: ["src/migrations/*.ts"],
  cli: {
    migrationsDir: ["src/migrations"],
    entitiesDir: ["src/application/ports/repository/*.ts"],
  },
};

module.exports = [
  {
    ...commonConfig,
    // host: process.env.POSTGRES_HOST_DEVELOPMENT,
    // port: process.env.POSTGRES_PORT_DEVELOPMENT,
    database: `${__dirname}/dev-data/db.sqlite`,
    name: "development",
  },
  {
    ...commonConfig,
    database: `${__dirname}/prod-data/db.sqlite`,
    name: "production",
  },
  {
    ...commonConfig,
    database: `${__dirname}/test-data/db.sqlite`,
    name: "test",
  }
];
