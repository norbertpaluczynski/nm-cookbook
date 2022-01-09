<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="8">
      <v-card>
        <v-card-text>

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
          console.log(response)
        })
    }

    return {
      getData
    }
  }
})
</script>
