<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="10">
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
        <MyRecipeCardRow
          :key="index"
          :row="row"
          :refreshData="getData"
          class="my-6"
        />
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, onMounted, ref, Ref, useContext } from '@nuxtjs/composition-api'
import Vue from 'vue'
import useRecipe from '~/api/useRecipe'
import { PagedRecipeFilter, RecipeFilter } from '~/types/filters'
import { RecipeRow } from '~/types/queries'

export default Vue.extend({
  auth: false,
  setup() {
    const { i18n } = useContext()
    const { getMyRecipeRows } = useRecipe()

    const rows: Ref<RecipeRow[]> = ref([])

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
    })

    const getData = () => {
      const filter: PagedRecipeFilter = {
        filter: {
          title: '',
          preparationTimeFrom: 1,
          preparationTimeTo: 30,
          difficultyLevelFrom: 1,
          difficultyLevelTo: 5,
          ratingFrom: 1,
          ratingTo: 5,
          categoryId: ''
        },
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
        orderBy: orderBy.value,
        isAscending: isAscending.value
      }
      getMyRecipeRows(filter)
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
      rows,
      pageNumber,
      totalCount,
      pageSize,
      orderBy,
      isAscending,
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
