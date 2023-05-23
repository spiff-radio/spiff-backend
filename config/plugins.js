module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET')
    },
  },
  'spiff-api': {
    enabled: true,
    resolve: './src/plugins/spiff-api'
  }
})
