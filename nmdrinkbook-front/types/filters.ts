export interface PagedRecipeFilter {
  filter: RecipeFilter
  pageNumber: number
  pageSize: number
  orderBy: string
  isAscending: string
}

export interface RecipeFilter {
  title?: string
  preparationTimeFrom?: number
  preparationTimeTo?: number
  difficultyLevelFrom?: number
  difficultyLevelTo?: number
  ratingFrom?: number
  ratingTo?: number
  categoryIds?: string[]
}
