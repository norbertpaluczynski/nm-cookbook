<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="12" md="12" lg="8">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>{{ $t('headers.articles') }}</v-toolbar-title>
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
            :items="articles"
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
          <v-toolbar-title>{{ $t('labels.article') }}</v-toolbar-title>
        </v-toolbar>
        <v-form v-model="valid" @submit.prevent="saveIngredient">
          <v-card-text class="pa-4">
            <v-text-field
              v-model="selectedListItem.articleName"
              :label="$t('labels.name')"
              outlined dense
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              v-model="selectedListItem.alcoholVolume"
              type="numeric"
              :label="$t('labels.alcoholVolume')"
              outlined dense
            ></v-text-field>
            <v-text-field
              v-model="selectedListItem.description"
              :label="$t('labels.description')"
              outlined dense
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="pb-4 px-4">
            <v-spacer/>
            <v-btn text @click="closeDialog" class="mr-4">
              {{ $t('buttons.cancel') }}
            </v-btn>
            <v-btn color="primary" @click="saveItem" :disabled="!valid">
              {{ $t('buttons.save') }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { onMounted, ref, Ref, useContext } from '@nuxtjs/composition-api'
import Vue from 'vue'
import useDictionary from '~/api/useDictionary'
import useArticle from '~/api/useArticle'
import { Article } from '~/types/models'

export default Vue.extend({
  auth: false,
  setup() {
    const { i18n, route, app } = useContext()
    const { getArticles } = useDictionary()
    const { createArticle, saveArticle, deleteArticle} = useArticle()

    const articles: Ref<Article[]> = ref([])
    const dialog: Ref<boolean> = ref(false)
    const selectedListItem: Ref<any> = ref({})
    const valid: Ref<boolean> = ref(false)

    const headers = [
      { text: i18n.tc('labels.article'), value: 'articleName', align: 'start' },
      { text: i18n.tc('labels.alcoholVolume'), value: 'alcoholVolume', align: 'start' },
      { text: i18n.tc('labels.description'), value: 'description', align: 'start' },
      { text: '', value: 'actions', align: 'end', sortable: false },
    ]

    const rules: Ref<any> = ref({
      required: (value: string) => !!value || i18n.t('inputErrors.required'),
    })

    onMounted(() => {
      getData()
    })

    const getData = () => {
      getArticles()
      .then(response => {
        articles.value = response
      })
    }

    const addItem = () => {
      dialog.value = true
      selectedListItem.value = {}
    }

    const saveItem = () => {
      if (selectedListItem.value?.articleId) {
      saveArticle(selectedListItem.value)
      .then(() => {
        getData()
        closeDialog()
      })
      } else {
        createArticle(selectedListItem.value)
        .then(() => {
          getData()
          closeDialog()
        })
      }
    }

    const editItem = (item: Article) => {
      dialog.value = true
      selectedListItem.value = item
    }

    const deleteItem = (item: Article) => {
      deleteArticle(item.articleId)
      .then(() => {
          getData()
          closeDialog()
      })
    }

    const closeDialog = () => {
      selectedListItem.value = {}
      dialog.value = false
    }

    return {
      valid,
      getData,
      articles,
      rules,
      dialog,
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
