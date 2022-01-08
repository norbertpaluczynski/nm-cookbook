import { Router } from 'express'
import recipeCategoriesController from '../controllers/recipecategories.controller.js'

const router = Router()
const { findById } = recipeCategoriesController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.get("/findById/:id", findById)

export default router