import { useContext } from "@nuxtjs/composition-api"
import { Article} from "~/types/models"

export const useArticle = () => {
  const { $axios } = useContext()

  const createArticle = async (article: Article): Promise<Article> => {
    const response = await $axios.post<Article>('/article/create', article)
    return response.data
  }

  const saveArticle = async (article: Article): Promise<Article> => {
    const response = await $axios.put<Article>(`/article/${article.articleId}`, article)
    return response.data
  }

  const deleteArticle = async (id: string): Promise<void> => {
    const response = await $axios.delete<void>(`/article/delete/${id}`)
    return response.data
  }

  return {
    createArticle,
    saveArticle,
    deleteArticle,
  }
}

export default useArticle
