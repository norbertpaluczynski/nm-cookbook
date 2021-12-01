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
}

export interface IngredientRow {
  ingredientId?: string
  article: Article
  unit: Unit
  quantity: number
}

export interface RecipeDetails {
  recipeId: string
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
