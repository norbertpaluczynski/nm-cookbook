<template>
  <div class="login-page-wrapper">
    <v-card elevation="5" width="40%" min-width="300px">
      <v-card-title>{{ $t('headers.register') }}</v-card-title>
      <v-form v-model="valid" @submit.prevent="submit">
        <v-card-text>
          <v-text-field
            v-model="username"
            :label="$t('labels.username')"
            :rules=[rules.required]
            outlined dense
          ></v-text-field>
          <v-text-field
            v-model="email"
            :label="$t('labels.email')"
            :rules=[rules.required,rules.email]
            outlined dense
          ></v-text-field>
          <v-text-field
            v-model="password"
            :label="$t('labels.password')"
            :rules=[rules.required,rules.minLength]
            outlined dense
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="repeatPassword"
            :label="$t('labels.repeatPassword')"
            :rules=[rules.required,rules.password]
            outlined dense
            type="password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!valid"
            type="submit"
          >{{ $t('buttons.register') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import qs from 'qs'
import { Ref, ref, useContext } from '@nuxtjs/composition-api'

export default Vue.extend({
  name: 'LoginPage',
  layout: 'auth',
  setup() {
    const { i18n, redirect, app } = useContext()

    const valid: Ref<boolean> = ref(false)
    const username: Ref<string> = ref('')
    const email: Ref<string> = ref('')
    const password: Ref<string> = ref('')
    const repeatPassword: Ref<string> = ref('')

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const rules: Ref<any> = ref({
      required: (value: string) => !!value || i18n.t('input-errors.required'),
      email: (value: string) => emailRegex.test(value) || i18n.t('input-errors.email'),
      password: (value: string) => value == password.value || i18n.t('input-errors.password'),
      minLength: (value: string) => value.length >= 8 || i18n.t('input-errors.minLength'),
    })

    const submit = () => {
      console.log(username.value, password.value)
      const data = {
        'username':'admin',
        'password':'admin',
        'grant_type':'password',
        'client_id':'admin-cli'
      }
      
      app.$axios.post('http://localhost:28080/auth/realms/master/protocol/openid-connect/token', qs.stringify(data))
        .then(response => {
          const token = response.data.access_token
          const headers = {
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
          }
          const body = {
            "username": username.value,
            "enabled": true,
            "credentials": [{
              "type": "password",
              "value": password.value,
              "temporary": false
            }]
          }
          app.$axios.post('http://localhost:28080/auth/admin/realms/nmdrinkbook/users', body, {headers})
            .then(response => {
              redirect('/')
            })
        })
    }

    return {
      username,
      email,
      password,
      repeatPassword,
      rules,
      valid,
      submit
    }
  }
})
</script>

<style scoped>
.login-page-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
