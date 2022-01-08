import { Router } from 'express'
import recipeController from '../controllers/recipe.controller.js'

const router = Router()
const { findById, create, createEmpty, save, remove } = recipeController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.get("/findById/:id", findById)

router.post("/create", create);

router.post("/createEmpty", createEmpty)

router.put("/:id", save)

router.delete("/delete/:id", remove)

export default router