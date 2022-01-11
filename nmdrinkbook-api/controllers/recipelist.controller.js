import RecipeList from '../models/recipelist.model.js'
import { Sequelize } from 'sequelize'
import jwt_decode from "jwt-decode";

export const recipeListController = () => {
    const findAllPaged = async (req, res) => {
        const Op = Sequelize.Op

        let pageNumber = req.body.pageNumber
        let pageSize = req.body.pageSize
        let title = req.body.filter.title
        let preparationTimeFrom = req.body.filter.preparationTimeFrom
        let preparationTimeTo = req.body.filter.preparationTimeTo
        let difficultyLevelFrom = req.body.filter.difficultyLevelFrom
        let difficultyLevelTo = req.body.filter.difficultyLevelTo
        let ratingFrom = req.body.filter.ratingFrom
        let ratingTo = req.body.filter.ratingTo
        let categoryId = req.body.filter.categoryId

        // const {
        //     title,
        //     preparationTimeFrom,
        //     preparationTimeTo,
        //     difficultyLevelFrom,
        //     difficultyLevelTo,
        //     ratingFrom,
        //     ratingTo,
        //     categoryIds
        // } = req.body.filters
        let where = {}


        if (title) where.title = { [Op.eq]: title }
        if (preparationTimeFrom && preparationTimeTo) where.preparationTime = { [Op.between]: [preparationTimeFrom, preparationTimeTo] }
        if (difficultyLevelFrom && difficultyLevelTo) where.difficultyLevel = { [Op.between]: [difficultyLevelFrom, difficultyLevelTo] }
        if (ratingFrom && ratingTo) where.rating = { 
            [Op.or]: {
                [Op.between]: [ratingFrom, ratingTo],
                [Op.eq]: null
            }
        }
        if (categoryId) where.categories = { [Op.like]: `%${categoryId}%` }
        

        const { count, rows } = RecipeList.findAndCountAll({
            where,
            offset: pageSize * (pageNumber - 1),
            limit: pageSize,
            order: [
                [req.body.orderBy, req.body.isAscending ? 'ASC' : 'DESC']
            ]
        }).then(data => {
            data.rows.forEach(r => r.categories = JSON.parse(r.categories))
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            })
        });

        // then return count (number of all objects matched by filter), pageSize, pageNumber (if it will be lower than requested)
    }

    const findMyPaged = async (req, res) => {
        const Op = Sequelize.Op

        let pageNumber = req.body.pageNumber
        let pageSize = req.body.pageSize
        let title = req.body.filter.title
        let preparationTimeFrom = req.body.filter.preparationTimeFrom
        let preparationTimeTo = req.body.filter.preparationTimeTo
        let difficultyLevelFrom = req.body.filter.difficultyLevelFrom
        let difficultyLevelTo = req.body.filter.difficultyLevelTo
        let ratingFrom = req.body.filter.ratingFrom
        let ratingTo = req.body.filter.ratingTo
        let categoryId = req.body.filter.categoryId

        let where = {}

        var authHeader = req.headers.authorization
        if (authHeader) {
            var token = authHeader.substring(7, authHeader.length)
            var decoded = jwt_decode(token)
            let createdBy = decoded['preferred_username']
            where.createdBy = { [Op.eq]: createdBy }
        }

        if (title) where.title = { [Op.eq]: title }
        if (preparationTimeFrom && preparationTimeTo) where.preparationTime = { [Op.between]: [preparationTimeFrom, preparationTimeTo] }
        if (difficultyLevelFrom && difficultyLevelTo) where.difficultyLevel = { [Op.between]: [difficultyLevelFrom, difficultyLevelTo] }
        if (ratingFrom && ratingTo) where.rating = { 
            [Op.or]: {
                [Op.between]: [ratingFrom, ratingTo],
                [Op.eq]: null
            }
        }
        if (categoryId) where.categories = { [Op.like]: `%${categoryId}%` }
        

        const { count, rows } = RecipeList.findAndCountAll({
            where,
            offset: pageSize * (pageNumber - 1),
            limit: pageSize,
            order: [
                [req.body.orderBy, req.body.isAscending ? 'ASC' : 'DESC']
            ]
        }).then(data => {
            data.rows.forEach(r => r.categories = JSON.parse(r.categories))
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            })
        });
    }


    return { findAllPaged, findMyPaged }
}

export default recipeListController