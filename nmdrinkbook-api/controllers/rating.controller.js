import Rating from '../models/rating.model.js'

export const ratingController = () => {
    const create = (req, res) => {
        // if (!req.body.quantity) {
        //     res.status(400).send({
        //       message: "Content can not be empty!"
        //     });
        //     return;
        // }
    
        const rating = {
            recipeId: req.body.recipeId,
            userId: req.body.userId,
            rating: req.body.rating,
            comment: req.body.comment,
            createdBy: req.createdBy,
            modifiedBy: req.modifiedBy
        }
    
        Rating.create(rating)
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

        Rating.update(req.body, {
            where: { ratingId: id }
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

        Rating.destroy({
            where: { ratingId: id }
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

        Rating.findByPk(id)
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
        Rating.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    }

    return { create, save, remove, findById, findAll }
}

export default ratingController