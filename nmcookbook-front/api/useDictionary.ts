import { useContext } from "@nuxtjs/composition-api"
import { DictionaryRow } from "~/types/common"

export const useDictionary = () => {
  const { $axios } = useContext()

  const getCategories = async (): Promise<DictionaryRow[]> => {
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
