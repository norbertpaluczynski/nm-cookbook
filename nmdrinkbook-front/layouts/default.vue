<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >
      <div class="d-flex flex-column justify-center align-center">
        <v-btn width="180" rounded @click="login"
          class="my-2" v-if="!$auth.loggedIn"
        >
          Login
        </v-btn>
        <v-btn width="180" rounded outlined @click="register"
          class="my-2" v-if="!$auth.loggedIn"
        >
          Register
        </v-btn>
        <v-btn width="180" rounded @click="logout"
          class="my-2" v-if="true || $auth.loggedIn"
        >
          Logout
        </v-btn>
      </div>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      app fixed
      class="d-flex justify-space-between"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-switch
        v-model="isDarkMode"
        dense hide-details
        class="pa-0 ma-1"
        append-icon="mdi-weather-night"
        prepend-icon="mdi-weather-sunny"
      ></v-switch>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { computed, onMounted, Ref, ref, useContext } from '@nuxtjs/composition-api'
import { ls } from '~/commons/constants'

export default Vue.extend({
  name: 'default',
  setup() {
    const { app, $auth, redirect } = useContext()

    const title = 'NMdrinkbook'
    const clipped: Ref<boolean> = ref(true)
    const drawer: Ref<boolean> = ref(false)

    const isDarkMode = computed({
      get: (): boolean => {
        let darkMode: boolean = true
        const mode = localStorage.getItem(ls.isDarkMode) || 'true'
        if (app.vuetify) app.vuetify.framework.theme.dark = darkMode = (mode == 'true')
        return darkMode
      },
      set: (value: boolean) => {
        localStorage.setItem(ls.isDarkMode, `${value}`)
        if (app.vuetify)
          app.vuetify.framework.theme.dark = value
      }
    })

    const login = () => {
      $auth.loginWith('keycloak')
    }

    const register = () => {
      redirect('http://localhost:28080/auth/realms/nmdrinkbook/protocol/openid-connect/registrations?client_id=nmclient&response_type=code&scope=openid%20profile%20email&redirect_uri=http%3A%2F%2Flocalhost%3A3000&kc_locale=pl')
    }

    const logout = () => {
      $auth.logout()
    }

    return {
      title,
      clipped,
      drawer,
      isDarkMode,
      login,
      register,
      logout
    }
  }
})
</script>
