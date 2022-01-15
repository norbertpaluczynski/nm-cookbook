<template>
  <div class="d-flex flex-column justify-space-between fill-height">
    <v-list>
      <v-list-item v-if="$auth.loggedIn">
        <v-list-item-icon class="ml-2">
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <v-list-item
        v-for="item in menuItems"
        v-show="item.isVisible"
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
import { onMounted, Ref, ref, useContext } from '@nuxtjs/composition-api'
import { MenuItem } from '~/types/common'
import jwt from 'jwt-decode'

export default Vue.extend({
  name: 'default',
  setup() {
    const { app, $auth, redirect } = useContext()
    const token: Ref<any> = ref({})

    onMounted(() => {
      if($auth.loggedIn) {
        // @ts-ignore
        token.value = jwt($auth.strategies['keycloak'].token.get())
      }
    })

    const menuItems: Ref<MenuItem[]> = ref([
      {
        label: 'drinkList',
        path: '/',
        icon: 'mdi-glass-wine',
        isVisible: true
      },
      {
        label: 'myRecipes',
        path: '/myrecipes',
        icon: 'mdi-text-box-multiple',
        isVisible: $auth.loggedIn
      },
      {
        label: 'addRecipe',
        path: '/myrecipes/new',
        icon: 'mdi-text-box-plus',
        isVisible: $auth.loggedIn
      },
      {
        label: 'articles',
        path: '/articles',
        icon: 'mdi-food-variant',
        isVisible: $auth.loggedIn && token.value?.resource_access?.nmclient?.roles?.includes('admin')
      },
      {
        label: 'units',
        path: '/units',
        icon: 'mdi-beaker',
        isVisible: $auth.loggedIn && token.value?.resource_access?.nmclient?.roles?.includes('admin')
      },
      {
        label: 'categories',
        path: '/categories',
        icon: 'mdi-shape',
        isVisible: $auth.loggedIn && token.value?.resource_access?.nmclient?.roles?.includes('admin')
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
