import { Router } from 'express'
import ratingController from '../controllers/rating.controller.js'

const router = Router()
const { create, save, remove, findById, findAll } = ratingController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.post("/create", create);

router.put("/:id", save)

router.delete("/delete/:id", remove)

router.get("/findById/:id", findById)

router.get("/findAll", findAll)

export default router