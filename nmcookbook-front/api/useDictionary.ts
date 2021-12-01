import { useContext } from "@nuxtjs/composition-api"
import { DictionaryRow } from "~/types/common"

export const useDictionary = () => {
  const { $axios } = useContext()

  const getCategories = (): Promise<DictionaryRow[]> => {
    return $axios.get<DictionaryRow[]>('/').then(response => response.data)
  }

  const getArticles = (): Promise<DictionaryRow[]> => {
    return $axios.get<DictionaryRow[]>('/').then(response => response.data)
  }

  const getUnits = (): Promise<DictionaryRow[]> => {
    return $axios.get<DictionaryRow[]>('/').then(response => response.data)
  }

  return {
    getCategories,
    getArticles,
    getUnits
  }
}

export default useDictionary
