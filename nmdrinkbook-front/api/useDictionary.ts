import { useContext } from "@nuxtjs/composition-api"
import { Category, State } from "~/types/models"

export const useDictionary = () => {
  const { $axios } = useContext()

  const getCategories = async (): Promise<Category[]> => {
    const response = await $axios.get<Category[]>('/category/findAll')
    return response.data
  }

  const getStates = async (): Promise<State[]> => {
    const response = await $axios.get<State[]>('/state/findAll')
    return response.data
  }

  return {
    getCategories,
    getStates
  }
}

export default useDictionary
