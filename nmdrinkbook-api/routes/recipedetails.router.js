import { Router } from 'express'
import recipeDetailsController from '../controllers/recipedetails.controller.js'

const router = Router()
const { findById } = recipeDetailsController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.get("/findById/:id", findById)

export default router