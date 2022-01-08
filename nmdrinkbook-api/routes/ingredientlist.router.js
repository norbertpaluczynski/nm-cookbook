import { Router } from 'express'
import ingredientListController from '../controllers/ingredientlist.controller.js'

const router = Router()
const { findById } = ingredientListController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.get("/findById/:id", findById)

export default router