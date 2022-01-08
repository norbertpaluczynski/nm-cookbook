import RecipeHeader from '../models/recipeheader.model.js'
import { Sequelize } from 'sequelize'

export const recipeHeaderController = () => {
    const findById = (req, res) => {
        const id = req.params.id

        RecipeHeader.findOne({ where: {recipeId: id} })
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

export default recipeHeaderController