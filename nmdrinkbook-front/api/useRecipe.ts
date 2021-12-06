import { useContext } from "@nuxtjs/composition-api"
import { RecipeFilter } from "~/types/filters"
import { Recipe } from "~/types/models"
import { RecipeDetails, RecipeRow } from "~/types/queries"

export const useRecipe = () => {
  const { $axios } = useContext()

  const getRecipeRows = async (filter: RecipeFilter): Promise<RecipeRow[]> => {
    const response = await $axios.post<RecipeRow[]>('/recipes/list', filter)
    return response.data
  }

  const getRecipeDetails = async (id: string): Promise<RecipeDetails> => {
    const response = await $axios.get<RecipeDetails>(`/recipes/${id}`)
    return response.data
  }

  const createEmptyRecipe = async (): Promise<Recipe> => {
    const response = await $axios.post<Recipe>('/recipes', {})
    return response.data
  }

  const saveRecipe = async (recipe: Recipe): Promise<Recipe> => {
    const response = await $axios.put<Recipe>('/recipes', recipe)
    return response.data
  }

  const deleteRecipe = async (id: string): Promise<void> => {
    const response = await $axios.delete<void>(`/recipes/${id}`)
    return response.data
  }

  return {
    getRecipeRows,
    getRecipeDetails,
    createEmptyRecipe,
    saveRecipe,
    deleteRecipe
  }
}

export default useRecipe
