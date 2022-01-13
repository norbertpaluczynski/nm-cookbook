import { Router } from 'express'
import recipeDetailsController from '../controllers/recipedetails.controller.js'

const router = Router()
const { findById, findMyRecipeById } = recipeDetailsController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.get("/findById/:id", findById)

router.get("/findMyRecipeById/:id", findMyRecipeById)

export default router