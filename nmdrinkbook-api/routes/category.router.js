import { Router } from 'express'
import categoryController from '../controllers/category.controller.js'

const router = Router()
const { create, save, remove, findById, findAll } = categoryController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.post("/create", create);

router.put("/:id", save)

router.delete("/delete/:id", remove)

router.get("/findById/:id", findById)

router.get("/findAll", findAll)

export default router