import { useContext } from "@nuxtjs/composition-api"
import { Article, Category, State, Unit } from "~/types/models"

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

  const getArticles = async (): Promise<Article[]> => {
    const response = await $axios.get<Article[]>('/article/findAll')
    return response.data
  }

  const getUnits = async (): Promise<Unit[]> => {
    const response = await $axios.get<Unit[]>('/unit/findAll')
    return response.data
  }

  return {
    getCategories,
    getStates,
    getArticles,
    getUnits
  }
}

export default useDictionary
