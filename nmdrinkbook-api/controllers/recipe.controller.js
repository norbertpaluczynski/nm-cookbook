import Recipe from '../models/recipe.model.js'
import Stat from '../models/stat.model.js'
import { Sequelize } from 'sequelize'

export const recipeController = () => {

    const create = (req, res) => {
        // if (!req.body.title) {
        //     res.status(400).send({
        //       message: "Content can not be empty!"
        //     });
        //     return;
        // }
    
        const recipe = {
            stateId: req.body.stateId,
            title: req.body.title,
            description: req.body.description,
            preparationSteps: req.body.preparationSteps,
            preparationTime: req.body.preparationTime,
            difficultyLevel: req.body.difficultyLevel,
            image: req.body.image,
            createdBy: req.createdBy,
            modifiedBy: req.modifiedBy
        }
    
        Recipe.create(recipe)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    };

    const createEmpty = (req, res) => {
        const recipe = {
            stateId: '9bbd8eec-08c8-432d-a0a8-1dda1d21f89b',
            createdBy: req.modifiedBy,
            modifiedBy: req.modifiedBy
        }
    
        Recipe.create(recipe)
            .then(async data => {
                res.send(data);
                await Stat.create({
                    recipeId: data.recipeId,
                    views: 0,
                    createdBy: req.createdBy,
                    modifiedBy: req.modifiedBy
                })
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    };

    const save = (req ,res) => {
        const id = req.params.id
        req.body.modifiedBy = req.modifiedBy

        Recipe.update(req.body, {
            where: { recipeId: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send(req.body)
                } else {
                    res.status(500).send({
                        message: "error"
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "error catch"
                })
            })
    }

    const remove = (req, res) => {
        const id = req.params.id

        Recipe.destroy({
            where: { recipeId: id }
        })
            .then(num => {
                if (num == 1) {
                    res.status(204).send();
                } else {
                    res.send({
                        message: `error`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                message: "error catch"
                });
          });
    }

    const findById = (req, res) => {
        const id = req.params.id

        Recipe.findByPk(id)
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    }

    const findAll = (req, res) => {
        Recipe.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    }

    return { create, createEmpty, save, remove, findById, findAll }
}

export default recipeController