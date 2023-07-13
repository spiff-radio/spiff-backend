module.exports = ({ env }) => ([
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            env('FTP_BASE_URL'),
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            env('FTP_BASE_URL'),
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      header: '*',
      origin: [
        //TOUFIX TOUCHECK is this secure ?
        'http://localhost:3000',//dev frontend
        'http://localhost:1337',//dev backend
        'https://www.spiff-radio.org',//prod frontend
        'https://spiff-backend.fly.dev'//prod backend
      ]
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
]);
