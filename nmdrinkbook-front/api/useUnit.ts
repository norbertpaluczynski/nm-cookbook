import { useContext } from "@nuxtjs/composition-api"
import { Unit} from "~/types/models"

export const useUnit = () => {
  const { $axios } = useContext()

  const createUnit = async (unit: Unit): Promise<Unit> => {
    const response = await $axios.post<Unit>('/unit/create', unit)
    return response.data
  }

  const saveUnit = async (unit: Unit): Promise<Unit> => {
    const response = await $axios.put<Unit>(`/unit/${unit.unitId}`, unit)
    return response.data
  }

  const deleteUnit = async (id: string): Promise<void> => {
    const response = await $axios.delete<void>(`/unit/delete/${id}`)
    return response.data
  }

  return {
    createUnit,
    saveUnit,
    deleteUnit,
  }
}

export default useUnit
