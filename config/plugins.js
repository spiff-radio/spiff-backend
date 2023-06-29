module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET')
    },
  },
  upload: {
    config: {
      provider: "strapi4-ftp-provider",
      providerOptions: {
        host: env("FTP_HOST"),
        port: env("FTP_PORT",21),
        user: env("FTP_USER"),
        password: env("FTP_PASSWORD"),
        path: env("FTP_BASE_PATH"),
        baseUrl: env("FTP_BASE_URL"),
      },
    },
  },
})
