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
            articleId: req.body.description,
            unitId: req.body.preparationSteps,
            quantity: req.body.preparationTime,
            createdBy: req.body.createdBy,
            modifiedBy: req.body.modifiedBy
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

        Ingredient.update(req.body, {
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

    return { create, save, remove }
}

export default ingredientController