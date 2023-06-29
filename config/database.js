// strapi-api/config/database.js
//https://forum.strapi.io/t/fly-io-deployment/22438
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST','localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME','postgres'),
      password: env('DATABASE_PASSWORD'),
      schema: env('DATABASE_SCHEMA', 'public'), // Not required
      ssl: {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),// For self-signed certificates
      },
    },
    pool: { min: 0 }, //https://community.fly.io/t/random-502-bad-gateway-errors-with-strapi-endpoints-app-deployed-on-fly-io-postgres-database-on-supabase/13791/2
    debug: false
  },
});
