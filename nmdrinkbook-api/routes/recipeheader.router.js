import { Router } from 'express'
import recipeHeaderController from '../controllers/recipeheader.controller.js'

const router = Router()
const { findById } = recipeHeaderController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.get("/findById/:id", findById)

export default router