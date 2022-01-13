import { Router } from 'express'
import ingredientController from '../controllers/ingredient.controller.js'

const router = Router()
const { create, save, remove, findById, findAll, findAllByRecipeId } = ingredientController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.post("/create", create);

router.put("/:id", save)

router.delete("/delete/:id", remove)

router.get("/findById/:id", findById)

router.get("/findAll", findAll)

router.get("findAllByRecipeId/:id", findAllByRecipeId)

export default router