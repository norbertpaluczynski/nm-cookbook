export interface RecipeFilter {
  filter: {
    title?: string
    preparationTimeFrom?: number
    preparationTimeTo?: number
    difficultyLevelFrom?: number
    difficultyLevelTo?: number
    ratingFrom?: number
    ratingTo?: number
    categoryIds?: string[]
  }
  pageNumber: number
  pageSize: number
  orderBy: string
  isAscending: string
}
