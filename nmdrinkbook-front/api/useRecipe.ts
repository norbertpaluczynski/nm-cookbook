import { useContext } from "@nuxtjs/composition-api"
import { RecipeFilter } from "~/types/filters"
import { Recipe } from "~/types/models"
import { PagedList, RecipeDetails, RecipeRow } from "~/types/queries"

export const useRecipe = () => {
  const { $axios } = useContext()

  const getRecipeRows = async (filter?: RecipeFilter): Promise<PagedList<RecipeRow>> => {
    var data: PagedList<RecipeRow> = {
      rows: [],
      count: 100,
      pageNumber: 0,
      pageSize: 10
    }

    for (let i = 1; i < 10; i++) {
      data.rows.push({
        image: 'https://mojedrinki.pl/wp-content/uploads/2021/02/mojito.jpg',
        categories: [
          { categoryId: '1', name: 'drinken1'},
          { categoryId: '2', name: 'drinken2'},
          { categoryId: '3', name: 'drinken3'},
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius vulputate orci ac fringilla. Nunc viverra interdum metus, nec maximus lectus egestas non. Vestibulum pharetra pulvinar leo. In in egestas eros. Sed suscipit maximus rutrum. Etiam vestibulum sapien facilisis rhoncus ultricies. Proin eros tellus, iaculis vitae arcu sit amet, molestie tincidunt diam.',
        recipeId: i.toString(),
        title: `Super drink numero ${i}`,
        rating: parseFloat((Math.random() * 4 + 1).toPrecision(2)),
        views: Math.floor(Math.random() * 1000),
        difficultyLevel: Math.floor(Math.random() * 4 + 1),
        preparationTime: Math.floor(Math.random() * 10 + 5)
      })
    }
    return data

    const response = await $axios.post<PagedList<RecipeRow>>('/recipes/list', filter)
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
