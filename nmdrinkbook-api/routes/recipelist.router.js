import { Router } from 'express'
import recipeListController from '../controllers/recipelist.controller.js'

const router = Router()
const { findAllPaged } = recipeListController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.post("/findAllPaged", findAllPaged)

export default router