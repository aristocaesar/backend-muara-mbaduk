module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'aristocaesar',
      password: 'aristo0407',
      database: 'muarambaduk',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds',
    },
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../migrations',
    },
    seeds: {
      directory: '../seeds',
    },
  },
};
