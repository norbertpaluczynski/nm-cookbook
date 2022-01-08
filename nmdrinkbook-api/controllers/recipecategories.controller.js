import { Sequelize } from 'sequelize'
import RecipeCategories from '../models/recipecategories.model.js'

export const recipeCategoriesController = () => {
    const findById = (req, res) => {
        const id = req.params.id

        RecipeCategories.findAll({ where: {recipeId: id} })
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

export default recipeCategoriesController