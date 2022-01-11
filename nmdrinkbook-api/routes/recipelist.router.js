import { Router } from 'express'
import recipeListController from '../controllers/recipelist.controller.js'

const router = Router()
const { findAllPaged, findMyPaged } = recipeListController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.post("/findAllPaged", findAllPaged)

router.post("/myrecipespaged", findMyPaged)

export default router