<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >

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
      absolute app
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
    const { app } = useContext()

    const title = 'NMdrinkbook'
    const clipped: Ref<boolean> = ref(true)
    const drawer: Ref<boolean> = ref(false)

    onMounted(() => {
      console.log(app)
    })

    const isDarkMode = computed({
      get: (): boolean => {
        let darkMode: boolean = true
        const mode = localStorage.getItem(ls.isDarkMode)
        if (app.vuetify) app.vuetify.framework.theme.dark = darkMode = (mode == 'true')
        return darkMode
      },
      set: (value: boolean) => {
        localStorage.setItem(ls.isDarkMode, `${value}`)
        if (app.vuetify)
          app.vuetify.framework.theme.dark = value
      }
    })

    return {
      title,
      clipped,
      drawer,
      isDarkMode
    }
  }
})
</script>
