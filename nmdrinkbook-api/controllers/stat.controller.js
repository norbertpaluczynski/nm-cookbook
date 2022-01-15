import MostPopularArticles from '../models/mostpopulararticles.model.js';
import Stat from '../models/stat.model.js'

export const statController = () => {
    const create = (req, res) => {
    
        const stat = {
            recipeId: req.body.recipeId,
            createdBy: req.createdBy,
            modifiedBy: req.modifiedBy
        }
    
        Stat.create(state)
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

        Stat.update(req.body, {
            where: { statId: id }
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

        Stat.destroy({
            where: { statId: id }
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

        Stat.findByPk(id)
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
        Stat.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Unknown error."
                })
            });
    }

    const getMostPopularArticles = (req, res) => {
        MostPopularArticles.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Unknown error."
            })
        });
    }

    return { create, save, remove, findById, findAll, getMostPopularArticles }
}

export default statController