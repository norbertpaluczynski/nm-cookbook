import Unit from '../models/unit.model.js'

export const unitController = () => {
    const create = (req, res) => {
        // if (!req.body.quantity) {
        //     res.status(400).send({
        //       message: "Content can not be empty!"
        //     });
        //     return;
        // }
    
        const unit = {
            name: req.body.name,
            createdBy: req.body.createdBy,
            modifiedBy: req.body.modifiedBy
        }
    
        Unit.create(unit)
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

        Unit.update(req.body, {
            where: { unitId: id }
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

        Unit.destroy({
            where: { articleId: id }
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

export default unitController