import { Router } from 'express'
import statController from '../controllers/stat.controller.js'

const router = Router()
const { create, save, remove, findById, findAll, getMostPopularArticles } = statController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.post("/create", create);

router.put("/:id", save)

router.delete("/delete/:id", remove)

router.get("/findById/:id", findById)

router.get("/findAll", findAll)

router.get("/mostpopulararticles", getMostPopularArticles)

export default router