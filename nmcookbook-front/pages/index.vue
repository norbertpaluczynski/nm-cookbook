<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <v-btn @click="call"/>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  auth: false,
  methods: {
    call () {
      this.$axios.post('localhost:8000/recipe/createEmpty', {}).then(response => console.log(response.data));
    }
  }
})
</script>
