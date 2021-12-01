import { useContext } from "@nuxtjs/composition-api"
import { RecipeFilter } from "~/types/filters"
import { RecipeDetails, RecipeRow } from "~/types/queries"

export const useRecipe = () => {
  const { $axios } = useContext()

  const getRecipeRows = (filter: RecipeFilter): Promise<RecipeRow[]> => {
    return $axios.post<RecipeRow[]>('/recipes', filter).then(response => response.data)
  }

  const getRecipeDetails = (id: string): Promise<RecipeDetails> => {
    return $axios.get<RecipeDetails>(`/recipes/${id}`).then(response => response.data)
  }

  return {
    getRecipeRows,
    getRecipeDetails,
  }
}

export default useRecipe
