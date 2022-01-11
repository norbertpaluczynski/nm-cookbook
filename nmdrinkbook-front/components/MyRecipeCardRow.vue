<template>
  <v-card
    class="rounded-lg"
  >
    <v-container>
      <v-row>
        <v-col cols="12" sm="4" md="2">
          <Nuxt-link :to="`/drink/${row.recipeId}`" style="text-decoration: none">
            <v-img :src="row.image" height="100%"/>
          </Nuxt-link>
        </v-col>
        <v-col cols="10" sm="7" md="9">
          <v-card-title class="pt-0">
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
        </v-col>
        <v-col cols="2" sm="1" md="1">
          <v-card-actions class="d-flex flex-column justify-space-between fill-height">
            <v-btn icon outlined color="success" class="ma-0" @click="editRecipe">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon outlined color="error" class="ma-0" @click="removeRecipe">
              <v-icon>mdi-delete-forever</v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { useContext } from '@nuxtjs/composition-api'
import Vue from 'vue'
import useRecipe from '~/api/useRecipe'
import { RecipeRow } from '~/types/queries'

export default Vue.extend({
  name: 'MyRecipeCardRow',
  props: {
    row: Object,
    refreshData: Function
  },
  setup(props) {
    const { app } = useContext()
    const { deleteRecipe } = useRecipe()

    const editRecipe = () => {
      app.router?.push(`/myrecipes/${(props.row as RecipeRow).recipeId}`)
    }

    const removeRecipe = () => {
      deleteRecipe((props.row as RecipeRow).recipeId)
      .then(() => {
        (props as any).refreshData()
      })
    }

    return {
      editRecipe,
      removeRecipe
    }
  }
})
</script>
