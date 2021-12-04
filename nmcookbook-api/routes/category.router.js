import { Router } from 'express'
import categoryController from '../controllers/category.controller.js'

const router = Router()
const { create, save, remove } = categoryController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.post("/create", create);

router.put("/:id", save)

router.delete("/delete/:id", remove)

export default router