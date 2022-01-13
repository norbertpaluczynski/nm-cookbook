<template>
  <v-row justify="center" align="start">
    <v-col cols="12" sm="12" md="12" lg="8">
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
    <v-col cols="12" sm="12" md="12" lg="4">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>{{ $t('headers.ingredients') }}</v-toolbar-title>
          <v-spacer/>
          <v-btn
            icon tile color="accent"
            @click="addItem"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="recipe.ingredients"
            :hide-default-footer="true"
          >
            <template v-slot:item.actions="{ item }">
              <div class="d-flex justify-end">
                <v-btn icon @click="editItem(item)" color="primary" class="mr-3">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="deleteItem(item)" color="accent">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
            <template v-slot:no-data>
              ...
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    >
      <v-card>
        <v-toolbar dense>
          <v-toolbar-title>{{ $t('headers.newIngredient') }}</v-toolbar-title>
        </v-toolbar>
        <v-form v-model="validIngredient" @submit.prevent="saveIngredient">
          <v-card-text class="pa-4">
            <v-autocomplete
              v-model="selectedListItem.articleId"
              :label="$t('labels.article')"
              :items="articles"
              item-text="articleName"
              item-value="articleId"
              outlined dense
              :rules="[rules.required]"
            ></v-autocomplete>
            <v-autocomplete
              v-model="selectedListItem.unitId"
              :label="$t('labels.unit')"
              :items="units"
              item-text="symbol"
              item-value="unitId"
              outlined dense
              :rules="[rules.required]"
            ></v-autocomplete>
            <v-text-field
              v-model="selectedListItem.quantity"
              type="numeric"
              :label="$t('labels.quantity')"
              outlined dense
              :rules="[rules.required]"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="pb-4 px-4">
            <v-spacer/>
            <v-btn text @click="closeDialog" class="mr-4">
              {{ $t('buttons.cancel') }}
            </v-btn>
            <v-btn color="primary" @click="saveItem" :disabled="!validIngredient">
              {{ $t('buttons.save') }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { onMounted, ref, Ref, useContext } from '@nuxtjs/composition-api'
import Vue from 'vue'
import useRecipe from '~/api/useRecipe'
import useDictionary from '~/api/useDictionary'
import { Article, Category, State, Unit } from '~/types/models'
import useIngredient from '~/api/useIngredient'
import { IngredientRow } from '~/types/queries'

export default Vue.extend({
  auth: false,
  setup() {
    const { i18n, route, app } = useContext()
    const { getCategories,
    getArticles,
    getUnits,
    getStates } = useDictionary()
    const {
      getMyRecipeDetails,
      createEmptyRecipe,
      saveRecipe } = useRecipe()
    const {
      getIngredients,
      createIngredient,
      saveIngredient,
      deleteIngredient
    } = useIngredient()

    const categories: Ref<Category[]> = ref([])
    const articles: Ref<Article[]> = ref([])
    const units: Ref<Unit[]> = ref([])

    const valid: Ref<boolean> = ref(false)
    const validIngredient: Ref<boolean> = ref(false)

    const states: Ref<State[]> = ref([])
    const recipeId: Ref<string> = ref('')
    const recipe: Ref<any> = ref({})
    const dialog: Ref<boolean> = ref(false)
    const selectedListItem: Ref<any> = ref({})

    const headers = [
      { text: i18n.tc('labels.article'), value: 'articleName', align: 'start' },
      { text: i18n.tc('labels.quantity'), value: 'quantity', align: 'start' },
      { text: i18n.tc('labels.unit'), value: 'symbol', align: 'start' },
      { text: '', value: 'actions', align: 'end', sortable: false },
    ]

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
      getArticles()
      .then(response => {
        articles.value = response
      })
      getUnits()
      .then(response => {
        units.value = response
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

    const addItem = () => {
      dialog.value = true
      selectedListItem.value = {}
    }

    const saveItem = () => {
      if (selectedListItem.value?.ingredientId) {
        saveIngredient(selectedListItem.value)
        .then(() => {
          getIngredients(recipe.value.recipeId)
          .then(response => {
            recipe.value.ingredients = response
            closeDialog()
          })
        })
      } else {
        selectedListItem.value.recipeId = recipe.value.recipeId
        createIngredient(selectedListItem.value)
        .then(() => {
          getIngredients(recipe.value.recipeId)
          .then(response => {
            recipe.value.ingredients = response
            closeDialog()
          })
        })
      }
    }

    const editItem = (item: IngredientRow) => {
      dialog.value = true
      selectedListItem.value = item
    }

    const deleteItem = (item: IngredientRow) => {
      deleteIngredient(item.ingredientId)
      .then(() => {
        getIngredients(recipe.value.recipeId)
        .then(response => {
          recipe.value.ingredients = response
          closeDialog()
        })
      })
    }

    const closeDialog = () => {
      selectedListItem.value = {}
      dialog.value = false
    }

    return {
      getData,
      recipe,
      categories,
      articles,
      units,
      states,
      valid,
      validIngredient,
      rules,
      dialog,
      save,
      addItem,
      headers,
      selectedListItem,
      saveItem,
      editItem,
      deleteItem,
      closeDialog
    }
  }
})
</script>
