<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="12" lg="8">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>{{ $t('headers.mostPopularArticles') }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-sheet>
              <v-sparkline
                :labels="articles"
                :value="articlesCount"
                color="primary"
                auto-line-width
                :line-width="2"
                :label-size="5"
                type="bars"
              >
                <template v-slot:label="item">
                  {{ item.value }}
                  ({{ articlesCount[item.index] }})
                </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { onMounted, ref, Ref, useContext } from '@nuxtjs/composition-api'
import Vue from 'vue'
import useStat from '~/api/useStat'

export default Vue.extend({
  auth: false,
  setup() {
    const { getMostPopularArticle } = useStat()
    const articles: Ref<string[]> = ref([])
    const articlesCount: Ref<number[]> = ref([])

    onMounted(() => {
      getMostPopularArticle()
      .then(response => {
        articles.value = response.map(a => a.article)
        articlesCount.value = response.map(a => a.count)
      })
    })

    return {
      articles,
      articlesCount
    }
  }
})
</script>
