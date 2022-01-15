<template>
  <v-container>
    <v-row justify="left" align="center">
      <v-col cols="12" sm="6" md="6" lg="4">
        <v-card>
          <v-toolbar>
            <v-toolbar-title>{{ $t('headers.mostPopularArticles') }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-list>
              <v-list-item v-for="article in articles" :key="article.article">
                <v-list-item-title>{{article.article}}</v-list-item-title>
                <v-list-item-subtitle class="text-right">{{article.count}}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
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
import { ArticleStat } from '~/types/models'

export default Vue.extend({
  auth: false,
  setup() {
    const { getMostPopularArticle } = useStat()
    const articles: Ref<ArticleStat[]> = ref([])

    onMounted(() => {
      getMostPopularArticle()
      .then(response => {
        articles.value = response
      })
    })

    return {
      articles,
    }
  }
})
</script>
