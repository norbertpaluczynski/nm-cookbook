import Unit from '../models/unit.model.js'
import jwt_decode from 'jwt-decode'

export const unitController = () => {
    const create = (req, res) => {
        // if (!req.body.quantity) {
        //     res.status(400).send({
        //       message: "Content can not be empty!"
        //     });
        //     return;
        // }
    
        var authHeader = req.headers.authorization
        
        if (authHeader) {
            var token = authHeader.substring(7, authHeader.length)
            var decoded = jwt_decode(token)
            let is_admin = decoded['resource_access']['nmclient']['roles'].includes('admin')

            if (!is_admin) {
                res.status(401).send()
            } else {
                const unit = {
                    symbol: req.body.symbol,
                    createdBy: req.createdBy,
                    modifiedBy: req.modifiedBy
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
            }
        } else {
            res.status(401).send()
        }
    };

    const save = (req ,res) => {
        const id = req.params.id
        req.body.modifiedBy = req.modifiedBy
        var authHeader = req.headers.authorization

        if (authHeader) {
            var token = authHeader.substring(7, authHeader.length)
            var decoded = jwt_decode(token)
            let is_admin = decoded['resource_access']['nmclient']['roles'].includes('admin')

            if (!is_admin) {
                res.status(401).send();
            } else {
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
        }
    }

    const remove = (req, res) => {
        const id = req.params.id
        var authHeader = req.headers.authorization
        
        if (authHeader) {
            var token = authHeader.substring(7, authHeader.length)
            var decoded = jwt_decode(token)
            let is_admin = decoded['resource_access']['nmclient']['roles'].includes('admin')
    
            if (!is_admin) {
                res.status(401).send()
            } else {
                Unit.destroy({
                    where: { unitId: id }
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
        } else {
            res.status(401).send()
        }
    }

    const findById = (req, res) => {
        const id = req.params.id

        Unit.findByPk(id)
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
        Unit.findAll({
            order: [
                ['symbol', 'ASC']
            ]
        })
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

export default unitController