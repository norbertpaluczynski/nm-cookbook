import { Router } from 'express'
import unitController from '../controllers/unit.controller.js'

const router = Router()
const { create, save, remove, findById, findAll } = unitController()

router.get("/", (req, res) => {
    res.send("[]")
})

router.post("/create", create);

router.put("/:id", save)

router.delete("/delete/:id", remove)

router.get("/findById/:id", findById)

router.get("/findAll", findAll)

export default router