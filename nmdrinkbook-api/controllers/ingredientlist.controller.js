import IngredientList from '../models/ingredientlist.model.js'
import { Sequelize } from 'sequelize'

export const ingredientListController = () => {
    const findById = (req, res) => {
        const id = req.params.id

        IngredientList.findAll({ where: {recipeId: id} })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    }


    return { findById }
}

export default ingredientListController