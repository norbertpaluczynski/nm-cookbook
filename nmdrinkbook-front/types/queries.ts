import { Article, Category, Unit } from "./models";

export interface RecipeRow {
  recipeId: string
  title: string
  description: string
  preparationTime: number
  difficultyLevel: number
  image: string
  categories: Category[]
  views: number
  rating: number
  stateId: string
  stateName: string
}

export interface IngredientRow {
  ingredientId?: string
  articleName: string
  description: string
  alcoholVolume: number
  unit: Unit
  quantity: number
}

export interface RecipeDetails {
  recipeId: string
  stateId: string
  title: string
  description: string
  preparatioSteps: string
  preparationTime: number
  difficultyLevel: number
  image: string
  ingredients: IngredientRow[]
  categories: Category[]
  views: number
  rating: number
}

export interface PagedList<T> {
  rows: T[]
  count: number
  pageSize: number
  pageNumber: number
}
