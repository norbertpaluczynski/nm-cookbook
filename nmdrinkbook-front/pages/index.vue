<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12" lg="8">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs}">
                    <div class="d-flex">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        color="primary"
                        class="mr-2"
                      >mdi-star</v-icon>
                      <v-range-slider
                        v-model="rating"
                        :min="1"
                        :max="5"
                        hide-details
                        color="accent"
                        ticks="always"
                        tick-size="4"
                        :tick-labels="[1,2,3,4,5]"
                      ></v-range-slider>
                    </div>
                  </template>
                  <span>{{ $t('tooltips.rating') }}</span>
                </v-tooltip>
              </v-col>
              <v-col cols="12" sm="4">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs}">
                    <div class="d-flex">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        color="primary"
                        class="mr-2"
                      >mdi-finance</v-icon>
                      <v-range-slider
                        v-model="difficultyLevel"
                        :min="1"
                        :max="5"
                        hide-details
                        color="accent"
                        ticks="always"
                        tick-size="4"
                        :tick-labels="[1,2,3,4,5]"
                      ></v-range-slider>
                    </div>
                  </template>
                  <span>{{ $t('tooltips.difficultyLevel') }}</span>
                </v-tooltip>
              </v-col>
              <v-col cols="12" sm="4">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs}">
                    <div class="d-flex">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        color="primary"
                        class="mr-2"
                      >mdi-clock-outline</v-icon>
                      <v-range-slider
                        v-model="preparationTime"
                        :min="1"
                        :max="6"
                        hide-details
                        color="accent"
                        ticks="always"
                        tick-size="4"
                        :tick-labels="[1,5,10,15,20,30]"
                      ></v-range-slider>
                    </div>
                  </template>
                  <span>{{ $t('tooltips.preparationTime') }}</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-chip-group v-model="categoryIds" multiple column>
                  <template v-for="category in categories">
                    <v-chip
                      :key="category.id"
                      small
                      outlined
                      filter
                    >{{ category.value }}</v-chip>
                  </template>
                </v-chip-group>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="align-center d-flex">
                <v-text-field
                  v-model="title"
                  :label="$t('labels.name')"
                  outlined dense
                  hide-details
                ></v-text-field>
                <v-btn
                  color="primary"
                  fab tile small
                  class="ml-3"
                  @click="getData"
                >
                  <v-icon>
                    mdi-magnify
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
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
import { RecipeFilter } from '~/types/filters'
import { DictionaryRow } from '~/types/common'
import { RecipeRow } from '~/types/queries'
import useDictionary from '~/api/useDictionary'

export default Vue.extend({
  auth: false,
  setup() {
    const {} = useContext()
    const { getRecipeRows } = useRecipe()
    const { getCategories } = useDictionary()

    const rows: Ref<RecipeRow[]> = ref([])
    const categories: Ref<DictionaryRow[]> = ref([])

    const title: Ref<string> = ref('')
    const preparationTime: Ref<number[]> = ref([1,60])
    const difficultyLevel: Ref<number[]> = ref([1,5])
    const rating: Ref<number[]> = ref([1,5])
    const categoryIds: Ref<string[]> = ref([])

    const pageNumber: Ref<number> = ref(0)
    const pageSize: Ref<number> = ref(10)
    const orderBy: Ref<string> = ref('title')
    const isAscending: Ref<boolean> = ref(true)

    onMounted(() => {
      getRecipeRows(undefined)
      .then(response => {
        rows.value = response.rows
      })
      getCategories()
      .then(response => {
        categories.value = response
      })
    })

    const getData = () => {
      const filter: RecipeFilter = {
        title: title.value,
        preparationTimeFrom: preparationTime.value[0],
        preparationTimeTo: preparationTime.value[1],
        difficultyLevelFrom: difficultyLevel.value[0],
        difficultyLevelTo: difficultyLevel.value[1],
        ratingFrom: rating.value[0],
        ratingTo: rating.value[1],
        categoryIds: categoryIds.value
      }
    }

    return {
      rows,
      pageNumber,
      preparationTime,
      difficultyLevel,
      rating,
      pageSize,
      orderBy,
      isAscending,
      categoryIds,
      categories,
      getData
    }
  }
})
</script>
