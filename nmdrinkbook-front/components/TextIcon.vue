<template>
  <div class="d-flex align-center justify-center mx-2">
    <v-icon color="primary">{{ icon }}</v-icon>
    <span class="ml-1">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TextIcon',
  props: {
    icon: String,
    text: String
  },
})
</script>
