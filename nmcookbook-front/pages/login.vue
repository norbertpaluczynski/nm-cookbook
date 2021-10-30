<template>
  <div class="login-page-wrapper">
    <v-card elevation="5" width="40%" min-width="300px">
      <v-card-title>{{ $t('headers.login') }}</v-card-title>
      <v-form v-model="valid" @submit.prevent="submit">
        <v-card-text>
          <v-text-field
            v-model="username"
            :label="$t('labels.username')"
            :rules=[rules.required]
            outlined dense
          ></v-text-field>
          <v-text-field
            v-model="password"
            :label="$t('labels.password')"
            :rules=[rules.required]
            outlined dense
            type="password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!valid"
            type="submit"
          >{{ $t('buttons.login') }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Ref, ref, useContext } from '@nuxtjs/composition-api'

export default Vue.extend({
  name: 'LoginPage',
  layout: 'auth',
  setup() {
    const { i18n, redirect } = useContext()

    const valid: Ref<boolean> = ref(false)
    const username: Ref<string> = ref('')
    const password: Ref<string> = ref('')
    const rules: Ref<any> = ref({
      required: (value: string) => !!value || i18n.t('input-errors.required')
    })

    const submit = () => {
      console.log(username.value, password.value)
      redirect('/')
    }

    return {
      username,
      password,
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
