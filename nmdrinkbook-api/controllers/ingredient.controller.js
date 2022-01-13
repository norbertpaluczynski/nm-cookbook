import Ingredient from '../models/ingredient.model.js'

export const ingredientController = () => {
    const create = (req, res) => {
        // if (!req.body.quantity) {
        //     res.status(400).send({
        //       message: "Content can not be empty!"
        //     });
        //     return;
        // }
    
        const ingredient = {
            recipeId: req.body.recipeId,
            articleId: req.body.articleId,
            unitId: req.body.unitId,
            quantity: req.body.quantity,
            createdBy: req.createdBy,
            modifiedBy: req.modifiedBy
        }
    
        Ingredient.create(ingredient)
            .then(data => {
                res.send(data);
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

        Ingredient.update({
            articleId: req.body.articleId,
            unitId: req.body.unitId,
            quantity: req.body.quantity,
            modifiedBy: req.modifiedBy
        }, {
            where: { ingredientId: id }
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

        Ingredient.destroy({
            where: { ingredientId: id }
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

        Ingredient.findByPk(id)
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
        Ingredient.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    }

    const findAllByRecipeId = (req, res) => {
        const id = req.params.id
        Ingredient.findAll({ where: {recipeId: id} })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    }

    return { create, save, remove, findById, findAll, findAllByRecipeId }
}

export default ingredientController