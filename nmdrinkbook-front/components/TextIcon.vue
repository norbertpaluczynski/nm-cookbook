<template>
  <div>
    <v-tooltip bottom v-if="tooltip">
      <template v-slot:activator="{ on, attrs}">
        <div class="d-flex align-center justify-center mx-2"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon color="primary">{{ icon }}</v-icon>
          <span class="ml-1">{{ text }}</span>
        </div>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
    <div class="d-flex align-center justify-center mx-2" v-else>
      <v-icon color="primary">{{ icon }}</v-icon>
      <span class="ml-1">{{ text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'TextIcon',
  props: {
    icon: String,
    text: String,
    tooltip: String
  },
})
</script>
