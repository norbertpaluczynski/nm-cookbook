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
                        :max="30"
                        hide-details
                        color="accent"
                        ticks="always"
                        tick-size="1"
                        :thumb-label="true"
                        :tick-labels="[1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,30]"
                      ></v-range-slider>
                    </div>
                  </template>
                  <span>{{ $t('tooltips.preparationTime') }}</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="8">
                <v-chip-group v-model="categoryId" column>
                  <template v-for="category in categories">
                    <v-chip
                      :key="category.categoryId"
                      small
                      outlined
                      filter
                    >{{ category.name }}</v-chip>
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
      <v-card class="my-6 pa-1">
        <v-card-actions>
          <v-select
            :items="orderByItems"
            v-model="orderBy"
            outlined dense
            hide-details
            :label="$t('labels.orderBy')"
            @change="getData"
          ></v-select>
          <v-btn icon tile class="ml-2" @click="changeSort">
            <v-icon>
              {{ isAscending
              ? 'mdi-sort-alphabetical-ascending'
              : 'mdi-sort-alphabetical-descending' }}
            </v-icon>
          </v-btn>
          <v-spacer/>
          <v-select
            :items=[5,10,15,25,50]
            v-model="pageSize"
            outlined dense
            hide-details
            :label="$t('labels.pageSize')"
            class="mr-6 select-width"
            @change="getData"
          ></v-select>
          <v-btn
            :disabled="pageNumber == 1"
            icon tile
            @click="goFirstPage"
          >
            <v-icon>mdi-page-first</v-icon>
          </v-btn>
          <v-btn
            :disabled="pageNumber == 1"
            icon tile
            @click="goPreviousPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <div class="mx-2 current-page">{{ currentPage }}</div>
          <v-btn
            :disabled="pageNumber * pageSize > totalCount"
            icon tile
            @click="goNextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-btn
            :disabled="pageNumber * pageSize > totalCount"
            icon tile
            @click="goLastPage"
          >
            <v-icon>mdi-page-last</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <template v-for="(row, index) in rows">
        <RecipeCardRow
          :key="index"
          :row="row"
          class="my-6"
        />
      </template>
      <v-card class="pa-1">
        <v-card-actions>
          <v-spacer/>
          <v-select
            :items=[5,10,15,25,50]
            v-model="pageSize"
            outlined dense
            hide-details
            :label="$t('labels.pageSize')"
            class="mr-6 select-width"
            @change="getData"
          ></v-select>
          <v-btn
            :disabled="pageNumber == 1"
            icon tile
            @click="goFirstPage"
          >
            <v-icon>mdi-page-first</v-icon>
          </v-btn>
          <v-btn
            :disabled="pageNumber == 1"
            icon tile
            @click="goPreviousPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <div class="mx-2 current-page">{{ currentPage }}</div>
          <v-btn
            :disabled="pageNumber * pageSize > totalCount"
            icon tile
            @click="goNextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-btn
            :disabled="pageNumber * pageSize > totalCount"
            icon tile
            @click="goLastPage"
          >
            <v-icon>mdi-page-last</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, onMounted, ref, Ref, useContext } from '@nuxtjs/composition-api'
import Vue from 'vue'
import useRecipe from '~/api/useRecipe'
import { PagedRecipeFilter, RecipeFilter } from '~/types/filters'
import { Category } from '~/types/models'
import { RecipeRow } from '~/types/queries'
import useCategory from '~/api/useCategory'

export default Vue.extend({
  auth: false,
  setup() {
    const { i18n } = useContext()
    const { getRecipeRows } = useRecipe()
    const { getCategories } = useCategory()

    const rows: Ref<RecipeRow[]> = ref([])
    const categories: Ref<Category[]> = ref([])

    const title: Ref<string> = ref('')
    const preparationTime: Ref<number[]> = ref([1,60])
    const difficultyLevel: Ref<number[]> = ref([1,5])
    const rating: Ref<number[]> = ref([1,5])
    const categoryId: Ref<number> = ref(-1)

    const pageNumber: Ref<number> = ref(1)
    const pageSize: Ref<number> = ref(10)
    const totalCount: Ref<number> = ref(0)
    const orderBy: Ref<string> = ref('title')
    const isAscending: Ref<boolean> = ref(true)
    const orderByItems = ref([
      { value: 'title', text: i18n.tc('selects.orderBy.title') },
      { value: 'views', text: i18n.tc('selects.orderBy.views') },
      { value: 'rating', text: i18n.tc('selects.orderBy.rating') },
      { value: 'difficultyLevel', text: i18n.tc('selects.orderBy.difficultyLevel') },
      { value: 'preparationTime', text: i18n.tc('selects.orderBy.preparationTime') }
    ])

    const currentPage = computed(() => `${(pageNumber.value - 1) * pageSize.value + 1}
     - ${pageNumber.value * pageSize.value > totalCount.value ? totalCount.value : pageNumber.value * pageSize.value}
     / ${totalCount.value || '-'}`)

    onMounted(() => {
      getData()
      getCategories()
      .then(response => {
        categories.value = response
      })
    })

    const getData = () => {
      const filter: PagedRecipeFilter = {
        filter: {
          title: title.value,
          preparationTimeFrom: preparationTime.value[0],
          preparationTimeTo: preparationTime.value[1],
          difficultyLevelFrom: difficultyLevel.value[0],
          difficultyLevelTo: difficultyLevel.value[1],
          ratingFrom: rating.value[0],
          ratingTo: rating.value[1],
          categoryId: categories.value[categoryId.value]?.categoryId
        },
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
        orderBy: orderBy.value,
        isAscending: isAscending.value
      }
      getRecipeRows(filter)
      .then(response => {
        rows.value = response.rows
        totalCount.value = response.count
      })
    }

    const goFirstPage = () => {
      pageNumber.value = 1
      getData()
    }

    const goPreviousPage = () => {
      if (pageSize.value > 1) {
        pageNumber.value -= 1
        getData()
      }
    }

    const goNextPage = () => {
      if (pageSize.value * pageNumber.value < totalCount.value) {
        pageNumber.value += 1
        getData()
      }
    }

    const goLastPage = () => {
      if (pageSize.value * pageNumber.value < totalCount.value) {
        pageNumber.value = Math.floor(totalCount.value / pageSize.value) + 1
        getData()
      }
    }

    const changeSort = () => {
      isAscending.value = !isAscending.value
      getData()
    }

    return {
      title,
      rows,
      pageNumber,
      preparationTime,
      difficultyLevel,
      rating,
      totalCount,
      pageSize,
      orderBy,
      isAscending,
      categoryId,
      categories,
      currentPage,
      orderByItems,
      getData,
      goFirstPage,
      goPreviousPage,
      goNextPage,
      goLastPage,
      changeSort
    }
  }
})
</script>

<style scoped>
.select-width {
  max-width: 120px;
}

.current-page {
  min-width: 60px;
}
</style>
