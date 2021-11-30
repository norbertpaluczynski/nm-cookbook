import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nm-drinkbook',
    title: 'nm-drinkbook',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/vuetify'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/composition-api/module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NODE_ENV || 'http://localhost:8000',
    proxy: true
  },
  auth: {
    strategies: {
      local: false,
      keycloak: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'http://localhost:28080/auth/realms/nmdrinkbook/protocol/openid-connect/auth',
          token: 'http://localhost:28080/auth/realms/nmdrinkbook/protocol/openid-connect/token',
          userInfo: 'http://localhost:28080/auth/realms/nmdrinkbook/protocol/openid-connect/userinfo',
          logout: 'http://localhost:28080/auth/realms/nmdrinkbook/protocol/openid-connect/logout?redirect_uri=' + encodeURIComponent('https://localhost:3000')
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 300
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'code',
        grantType: 'authorization_code',
        clientId: 'nmclient',
        scope: ['openid', 'profile', 'email'],
        codeChallengeMethod: 'S256'
      }
    },
    redirect: false
  },


  router: {
    middleware: ['auth', 'loginRedirect']
  },

  // I18n module configuration: https://i18n.nuxtjs.org/setup
  i18n: {
    locales: [
      { code: 'pl', iso: 'pl-PL', file: 'pl.json', dir: 'i18n' },
      { code: 'en', iso: 'en-GB', file: 'en.json', dir: 'i18n' },
    ],
    defaultLocale: 'pl',
    langDir: '~/assets/i18n/',
    vueI18n: {
      fallbackLocale: 'pl',
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['vuetify']
  }
}
