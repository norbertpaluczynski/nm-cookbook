import { useContext } from "@nuxtjs/composition-api"
import { Ingredient} from "~/types/models"

export const useIngredient = () => {
  const { $axios } = useContext()

  const getIngredients = async (recipeId: string): Promise<Ingredient[]> => {
    const response = await $axios.get<Ingredient[]>(`/ingredients/${recipeId}`)
    return response.data
  }

  const createIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
    const response = await $axios.post<Ingredient>('/ingredients', ingredient)
    return response.data
  }

  const saveIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
    const response = await $axios.put<Ingredient>('/ingredients', ingredient)
    return response.data
  }

  const deleteIngredient = async (id: string): Promise<void> => {
    const response = await $axios.delete<void>(`/ingredients/${id}`)
    return response.data
  }

  return {
    getIngredients,
    createIngredient,
    saveIngredient,
    deleteIngredient,
  }
}

export default useIngredient
