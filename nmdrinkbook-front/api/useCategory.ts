import { useContext } from "@nuxtjs/composition-api"
import { Category} from "~/types/models"

export const useCategory = () => {
  const { $axios } = useContext()

  const createCategory = async (category: Category): Promise<Category> => {
    const response = await $axios.post<Category>('/category/create', category)
    return response.data
  }

  const saveCategory = async (category: Category): Promise<Category> => {
    const response = await $axios.put<Category>(`/category/${category.categoryId}`, category)
    return response.data
  }

  const deleteCategory = async (id: string): Promise<void> => {
    const response = await $axios.delete<void>(`/category/delete/${id}`)
    return response.data
  }

  return {
    createCategory,
    saveCategory,
    deleteCategory,
  }
}

export default useCategory
