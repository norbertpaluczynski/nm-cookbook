<template>
  <div class="d-flex flex-column justify-space-between fill-height">
    <v-list>
      <v-list-item
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
      >
        <v-list-item-avatar>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-avatar>
        <v-list-item-title>{{ $t(`menuItems.${item.label}`) }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <div class="d-flex flex-column align-center mb-4">
      <v-btn width="200" rounded @click="login"
        class="my-2" v-if="!$auth.loggedIn">{{ $t('buttons.login') }}</v-btn>
      <v-btn width="200" rounded outlined @click="register"
        class="my-2" v-if="!$auth.loggedIn">{{ $t('buttons.register') }}</v-btn>
      <v-btn width="200" rounded @click="logout"
        class="my-2" v-if="$auth.loggedIn">{{ $t('buttons.logout') }}</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Ref, ref, useContext } from '@nuxtjs/composition-api'
import { MenuItem, AccesType } from '~/types/common'

export default Vue.extend({
  name: 'default',
  setup() {
    const { app, $auth, redirect } = useContext()

    const menuItems: Ref<MenuItem[]> = ref([
      {
        label: 'drinkList',
        path: '/',
        accessType: AccesType.public,
        icon: 'mdi-glass-wine'
      },
      {
        label: 'myRecipes',
        path: '/myrecipes',
        accessType: AccesType.user,
        icon: 'mdi-text-box-multiple'
      },
      {
        label: 'addRecipe',
        path: '/myrecipes/new',
        accessType: AccesType.user,
        icon: 'mdi-text-box-plus'
      },
      {
        label: 'articles',
        path: '/articles',
        accessType: AccesType.admin,
        icon: 'mdi-food-variant'
      },
      {
        label: 'units',
        path: '/units',
        accessType: AccesType.admin,
        icon: 'mdi-beaker'
      },
      {
        label: 'categories',
        path: '/categories',
        accessType: AccesType.admin,
        icon: 'mdi-shape'
      },
    ])

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
      menuItems,
      login,
      register,
      logout
    }
  }
})
</script>
