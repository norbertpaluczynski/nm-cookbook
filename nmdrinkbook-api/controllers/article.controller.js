import Article from '../models/article.model.js'

export const articleController = () => {
    const create = (req, res) => {
        // if (!req.body.quantity) {
        //     res.status(400).send({
        //       message: "Content can not be empty!"
        //     });
        //     return;
        // }
    
        var authHeader = req.headers.authorization
        
        var token = authHeader.substring(7, authHeader.length)
        var decoded = jwt_decode(token)
        let is_admin = decoded['resource_access']['nmclient']['roles'].includes('admin')

        if (!is_admin) {
            res.status(401).send()
        } else {
            const article = {
                articleName: req.body.articleName,
                description: req.body.description,
                alcoholVolume: req.body.alcoholVolume,
                createdBy: req.createdBy,
                modifiedBy: req.modifiedBy
            }
        
            Article.create(article)
                .then(data => {
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Unknown error."
                    })
                });
        }
    };

    const save = (req ,res) => {
        const id = req.params.id
        req.body.modifiedBy = req.modifiedBy
        var authHeader = req.headers.authorization
        
        var token = authHeader.substring(7, authHeader.length)
        var decoded = jwt_decode(token)
        let is_admin = decoded['resource_access']['nmclient']['roles'].includes('admin')

        if (!is_admin) {
            res.status(401).send()
        } else {
            Article.update(req.body, {
                where: { articleId: id }
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

    const remove = (req, res) => {
        const id = req.params.id
        var authHeader = req.headers.authorization
        
        var token = authHeader.substring(7, authHeader.length)
        var decoded = jwt_decode(token)
        let is_admin = decoded['resource_access']['nmclient']['roles'].includes('admin')

        if (!is_admin) {
            res.status(401).send()
        } else {
            Article.destroy({
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
    }

    const findById = (req, res) => {
        const id = req.params.id

        Article.findByPk(id)
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
        Article.findAll({
            order: [
                ['articleName', 'ASC']
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

export default articleController