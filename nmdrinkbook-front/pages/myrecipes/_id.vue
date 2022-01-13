<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="10">
      <v-card>
        <v-form v-model="valid" @submit.prevent="save">
          <v-toolbar>
            <v-btn
              :disabled="!valid"
              color="primary"
              type="submit"
              class="px-8 py-1"
            >{{ $t('buttons.save') }}</v-btn>
            <v-spacer/>
            <v-select
              v-model="recipe.stateId"
              :items="states"
              item-text="name"
              item-value="stateId"
              outlined dense
              hide-details
              class="ml-2"
              :label="$t('labels.state')"
            ></v-select>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="5">
                  <v-img :src="recipe.image" width="100%" max-height="350px"/>
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    v-model="recipe.title"
                    outlined dense
                    :rules=[rules.required]
                    :label="$t('labels.name')"
                  ></v-text-field>
                  <v-select
                    v-model="recipe.categories"
                    :items="categories"
                    multiple
                    outlined dense
                    small-chips
                    item-text="name"
                    return-object
                    :rules=[rules.notEmpty]
                    :label="$t('labels.categories')"
                  ></v-select>
                  <v-text-field
                    v-model="recipe.image"
                    outlined dense
                    :rules=[rules.required]
                    :label="$t('labels.link')"
                  ></v-text-field>
                  <v-slider
                    v-model="recipe.preparationTime"
                    min="1"
                    max="30"
                    color="accent"
                    ticks="always"
                    tick-size="1"
                    :thumb-label="true"
                    :tick-labels="[1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,30]"
                    :rules=[rules.required]
                    :label="$t('labels.preparationTime')"
                  ></v-slider>
                  <v-slider
                    v-model="recipe.difficultyLevel"
                    min="1"
                    max="5"
                    color="accent"
                    ticks="always"
                    tick-size="4"
                    :tick-labels="[1,2,3,4,5]"
                    :rules=[rules.required]
                    :label="$t('labels.difficultyLevel')"
                  ></v-slider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    v-model="recipe.description"
                    outlined dense
                    :label="$t('labels.description')"
                  ></v-textarea>
                  <v-textarea
                    v-model="recipe.preparationSteps"
                    outlined dense
                    :rules=[rules.required]
                    :label="$t('labels.preparationSteps')"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { onMounted, ref, Ref, useContext } from '@nuxtjs/composition-api'
import Vue from 'vue'
import useRecipe from '~/api/useRecipe'
import useDictionary from '~/api/useDictionary'
import { Category, State } from '~/types/models'

export default Vue.extend({
  auth: false,
  setup() {
    const { i18n, route, app } = useContext()
    const { getCategories, getStates } = useDictionary()
    const {
      getMyRecipeDetails,
      createEmptyRecipe,
      saveRecipe } = useRecipe()

    const valid: Ref<boolean> = ref(false)
    const categories: Ref<Category[]> = ref([])
    const states: Ref<State[]> = ref([])
    const recipeId: Ref<string> = ref('')
    const recipe: Ref<any> = ref({})

    const rules: Ref<any> = ref({
      required: (value: string) => !!value || i18n.t('inputErrors.required'),
      notEmpty: (value: any[]) => value?.length > 0 || i18n.t('inputErrors.required'),
    })

    onMounted(() => {
      recipeId.value = route.value.params['id']
      if(recipeId.value == 'new') {
        createNew()
      }
      else {
        getData()
      }
      getCategories()
      .then(response => {
        categories.value = response
      })
      getStates()
      .then(response => {
        states.value = response
      })
    })

    const getData = () => {
      if(recipeId.value)
        getMyRecipeDetails(recipeId.value)
        .then(response => {
          recipe.value = response
        })
    }

    const createNew = () => {
      createEmptyRecipe()
      .then(response => {
        recipe.value = response
      })
    }
    const save = () => {
      saveRecipe(recipe.value)
      .then(() => {
        app.router?.push('/myrecipes')
      })
    }

    return {
      getData,
      recipe,
      categories,
      states,
      valid,
      rules,
      save
    }
  }
})
</script>
