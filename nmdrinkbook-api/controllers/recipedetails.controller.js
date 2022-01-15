import RecipeHeader from '../models/recipeheader.model.js'
import RecipeCategories from '../models/recipecategories.model.js'
import IngredientList from '../models/ingredientlist.model.js'
import Stat from '../models/stat.model.js'
import { Sequelize } from 'sequelize'
import jwt_decode from 'jwt-decode'

export const  recipeDetailsController = () => {
    const findById = (req, res) => {
        const id = req.params.id

        RecipeHeader.findOne({ where: {recipeId: id} })
            .then(async (data) => {
                const categories = await RecipeCategories.findAll({ where: {recipeId: id} })
                const ingredients = await IngredientList.findAll({ where: {recipeId: id} })
                const stat = await Stat.findOne({where: { recipeId: id }})
                const result = await Stat.update({views: stat.views + 1}, {
                    where: { statId: stat.statId }
                })
                res.send({
                    recipeId: data.recipeId,
                    stateId: data.stateId,
                    title: data.title,
                    description: data.description,
                    preparationSteps: data.preparationSteps,
                    preparationTime: data.preparationTime,
                    difficultyLevel: data.difficultyLevel,
                    image: data.image,
                    views: data.views + 1,
                    rating: data.rating,
                    categories,
                    ingredients
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    }

    const findMyRecipeById = (req, res) => {
        const id = req.params.id
        var authHeader = req.headers.authorization
        if (authHeader) {
            const Op = Sequelize.Op
            let where = {}
            var token = authHeader.substring(7, authHeader.length)
            var decoded = jwt_decode(token)
            let createdBy = decoded['preferred_username']
            where.createdBy = { [Op.eq]: createdBy }
        
            RecipeHeader.findOne({ where: {recipeId: id} })
            .then(async (data) => {
                if (data.createdBy != createdBy) {
                    res.status(401).send()
                } else {
                    const categories = await RecipeCategories.findAll({ where: {recipeId: id} })
                    const ingredients = await IngredientList.findAll({ where: {recipeId: id} })
                    res.send({
                        recipeId: data.recipeId,
                        stateId: data.stateId,
                        title: data.title,
                        description: data.description,
                        preparationSteps: data.preparationSteps,
                        preparationTime: data.preparationTime,
                        difficultyLevel: data.difficultyLevel,
                        image: data.image,
                        views: data.views,
                        rating: data.rating,
                        categories,
                        ingredients
                    })
                } 
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
        } else {
            res.status(401).send()
        }
    }

    return { findById, findMyRecipeById }
}

export default recipeDetailsController