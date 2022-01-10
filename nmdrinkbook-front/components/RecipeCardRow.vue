<template>
  <v-card
    class="rounded-lg"
  >
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <Nuxt-link :to="`/drink/${row.recipeId}`" style="text-decoration: none">
            <v-img :src="row.image" height="100%"/>
          </Nuxt-link>
        </v-col>
        <v-col cols="12" sm="6" md="8">
          <v-card-title>
            <Nuxt-link :to="`/drink/${row.recipeId}`" style="text-decoration: none">
              {{ row.title }}
            </Nuxt-link>
          </v-card-title>
          <v-card-subtitle class="pt-2">
            <template v-for="category in row.categories">
              <v-chip
                :key="category.categoryId"
                outlined small
                class="mr-2"
              >{{ category.name }}</v-chip>
            </template>
          </v-card-subtitle>
          <div class="d-flex align-center px-4">
            <TextIcon icon='mdi-eye-outline' :text="`${row.views}`" :tooltip="$t('tooltips.views')"/>
            <TextIcon icon='mdi-finance' :text="`${row.difficultyLevel}`" :tooltip="$t('tooltips.difficultyLevel')"/>
            <TextIcon icon='mdi-clock-outline' :text="`${row.preparationTime}`" :tooltip="$t('tooltips.preparationTime')"/>
            <TextIcon v-if="row.rating" icon='mdi-star' :text="`${row.rating}`" :tooltip="$t('tooltips.rating')"/>
          </div>
          <v-card-text class="text-justify">{{ row.description }}</v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'RecipeCardRow',
  props: {
    row: Object
  },
})
</script>
