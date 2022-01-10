import { useContext } from "@nuxtjs/composition-api"
import { Category } from "~/types/models"

export const useDictionary = () => {
  const { $axios } = useContext()

  const getCategories = async (): Promise<Category[]> => {
    const response = await $axios.get<Category[]>('/category/findAll')
    return response.data
  }

  return {
    getCategories,
  }
}

export default useDictionary
