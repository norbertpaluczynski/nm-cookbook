import { Router } from 'express'
import ingredientController from '../controllers/ingredient.controller.js'

const router = Router()
const { create, save, remove } = ingredientController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.post("/create", create);

router.put("/:id", save)

router.delete("/delete/:id", remove)

export default router