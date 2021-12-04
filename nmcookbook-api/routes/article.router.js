import { Router } from 'express'
import articleController from '../controllers/article.controller.js'

const router = Router()
const { create, save, remove } = articleController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.post("/create", create);

router.put("/:id", save)

router.delete("/delete/:id", remove)

export default router