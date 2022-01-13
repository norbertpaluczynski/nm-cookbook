import { useContext } from "@nuxtjs/composition-api"
import { Ingredient} from "~/types/models"
import { IngredientRow } from "~/types/queries"

export const useIngredient = () => {
  const { $axios } = useContext()

  const getIngredients = async (recipeId: string): Promise<IngredientRow[]> => {
    const response = await $axios.get<IngredientRow[]>(`/ingredientlist/findById/${recipeId}`)
    return response.data
  }

  const createIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
    const response = await $axios.post<Ingredient>('/ingredient/create', ingredient)
    return response.data
  }

  const saveIngredient = async (ingredient: Ingredient): Promise<Ingredient> => {
    const response = await $axios.put<Ingredient>(`/ingredient/${ingredient.ingredientId}`, ingredient)
    return response.data
  }

  const deleteIngredient = async (id: string): Promise<void> => {
    const response = await $axios.delete<void>(`/ingredient/delete/${id}`)
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
