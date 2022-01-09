import { Router } from 'express'
import recipeController from '../controllers/recipe.controller.js'

const router = Router()
const { create, createEmpty, save, remove, findById, findAll } = recipeController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.get("/findById/:id", findById)

router.post("/create", create);

router.post("/createEmpty", createEmpty)

router.put("/:id", save)

router.delete("/delete/:id", remove)

router.get("/findById/:id", findById)

router.get("/findAll", findAll)

export default router