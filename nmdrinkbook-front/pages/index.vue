<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="8">
      <template v-for="(row, index) in rows">
        <RecipeCardRow
          :key="index"
          :row="row"
          class="my-6"
        />
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { onMounted, ref, Ref, useContext } from '@nuxtjs/composition-api'
import Vue from 'vue'
import useRecipe from '~/api/useRecipe'
import { RecipeRow } from '~/types/queries'

export default Vue.extend({
  auth: false,
  setup() {
    const {} = useContext()
    const { getRecipeRows } = useRecipe()

    const rows: Ref<RecipeRow[]> = ref([])

    onMounted(() => {
      getRecipeRows(undefined)
      .then(response => {
        rows.value = response
      })
    })

    return {
      rows
    }
  }
})
</script>
