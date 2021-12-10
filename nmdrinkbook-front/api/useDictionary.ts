import { useContext } from "@nuxtjs/composition-api"
import { DictionaryRow } from "~/types/common"

export const useDictionary = () => {
  const { $axios } = useContext()

  const getCategories = async (): Promise<DictionaryRow[]> => {
    return [
      { id: '1', value: 'Kategoria 1' },
      { id: '2', value: 'Kategoria 2' },
      { id: '3', value: 'Kategoria 3' },
      { id: '4', value: 'Kategoria 4' },
      { id: '5', value: 'Kategoria 5' },
      { id: '6', value: 'Kategoria 6' },
      { id: '7', value: 'Kategoria 7' },
      { id: '8', value: 'Kategoria 8' },
      { id: '9', value: 'Kategoria 9' },
    ]

    const response = await $axios.get<DictionaryRow[]>('/categories')
    return response.data
  }

  const getArticles = async (): Promise<DictionaryRow[]> => {
    const response = await $axios.get<DictionaryRow[]>('/articles')
    return response.data
  }

  const getUnits = async (): Promise<DictionaryRow[]> => {
    const response = await $axios.get<DictionaryRow[]>('/units')
    return response.data
  }

  const getStates = async (): Promise<DictionaryRow[]> => {
    const response = await $axios.get<DictionaryRow[]>('/states')
    return response.data
  }

  return {
    getCategories,
    getArticles,
    getUnits,
    getStates
  }
}

export default useDictionary
