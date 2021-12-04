import { Router } from 'express'
import ratingController from '../controllers/rating.controller.js'

const router = Router()
const { create, save, remove } = ratingController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.post("/create", create);

router.put("/:id", save)

router.delete("/delete/:id", remove)

export default router