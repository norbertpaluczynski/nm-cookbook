<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="8">
      <v-card>
        <v-img :src="recipe.image" height="100%"/>
        <v-container class="pb-0">
          <v-row>
            <v-col>
              <div class="d-flex justify-space-between">
                <v-card-title>{{ recipe.title }}</v-card-title>
                <div class="d-flex align-center px-4">
                  <TextIcon icon='mdi-eye-outline' :text="`${recipe.views}`" :tooltip="$t('tooltips.views')"/>
                  <TextIcon icon='mdi-finance' :text="`${recipe.difficultyLevel}`" :tooltip="$t('tooltips.difficultyLevel')"/>
                  <TextIcon icon='mdi-clock-outline' :text="`${recipe.preparationTime}`" :tooltip="$t('tooltips.preparationTime')"/>
                  <TextIcon v-if="recipe.rating" icon='mdi-star' :text="`${recipe.rating}`" :tooltip="$t('tooltips.rating')"/>
                </div>
              </div>
              <v-card-subtitle class="pt-0">
                <template v-for="category in recipe.categories">
                  <v-chip
                    :key="category.categoryId"
                    outlined small
                    class="mr-2"
                  >{{ category.name }}</v-chip>
                </template>
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-container>
        <v-card-text class="pt-0">
          <v-container>
            <v-row>
              <v-col>
                {{ recipe.description }}
              </v-col>
            </v-row>
            <v-row class="mt-6">
              <v-col cols="12" class="col-md-6">
                <h3 class="text-h6 mb-3">Sposób przygotowania:</h3>
                <div>{{ recipe.preparationSteps }}</div>
              </v-col>
              <v-col cols="12" class="col-md-5 offset-md-1">
                <h3 class="text-h6">Składniki:</h3>
                <v-list>
                  <template v-for="(ingredient, index) in recipe.ingredients">
                    <v-list-item :key="ingredient.ingredientId">
                      <v-list-item-title>{{ ingredient.articleName }}</v-list-item-title>
                      <v-list-item-subtitle class="text-right">{{ ingredient.quantity }} {{ ingredient.symbol }}</v-list-item-subtitle>
                    </v-list-item>
                    <v-divider :key="index" v-if="index < recipe.ingredients.length" />
                  </template>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { onMounted, ref, Ref, useContext } from '@nuxtjs/composition-api'
import Vue from 'vue'
import useRecipe from '~/api/useRecipe'

export default Vue.extend({
  auth: false,
  setup() {
    const { route } = useContext()
    const { getRecipeDetails } = useRecipe()
    const recipeId: Ref<string> = ref('')
    const recipe: Ref<any> = ref({})

    onMounted(() => {
      recipeId.value = route.value.params['id']
      getData()
    })

    const getData = () => {
      if(recipeId.value)
        getRecipeDetails(recipeId.value)
        .then(response => {
          recipe.value = response
        })
    }

    return {
      getData,
      recipe
    }
  }
})
</script>
