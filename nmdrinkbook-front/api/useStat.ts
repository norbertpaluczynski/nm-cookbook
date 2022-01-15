import { useContext } from "@nuxtjs/composition-api"
import { ArticleStat } from "~/types/models"

export const useStat = () => {
  const { $axios } = useContext()

  const getMostPopularArticle = async (): Promise<ArticleStat[]> => {
    const response = await $axios.get<ArticleStat[]>('/stat/mostpopulararticles')
    return response.data
  }

  return {
    getMostPopularArticle,
  }
}

export default useStat
