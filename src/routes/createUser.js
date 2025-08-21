import { ValidationError, UniqueConstraintError } from "sequelize";
import { User } from "../db/sequelize.js";
import bcrypt from 'bcrypt'

export default (app) => {
    app.post('/api/users', (req, res) => {
        if (req.body.password) {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    User.create({
                        username: req.body.username,
                        password: hash
                    })
                        .then(user => {
                            const message = `L'utilisateur ${user.username} a bien été créé.`
                            res.json({ message, data: user })
                        })
                        .catch(error => {
                            if (error instanceof UniqueConstraintError) {
                                const [constraintError] = error.errors
                                res.status(400).json({message: constraintError.message, data: error})
                            } else if (error instanceof ValidationError) {
                                res.status(400).json({message: error.message, data: error})
                            } else {
                                const message = `L'utilisateur n'a pas pu être ajouté. Réessayez dans quelques instants.`
                                res.status(500).json({message, data: error})
                            }
                        })
                })
        } else {
            const message= 'Mot de passe manquant.'
            res.status(400).json({message: message})

        }
            
    })
        
    app.post('/api/users', (req, res) => {
        const message = 'Vous ne pouvez pas ajouter plusieurs utilisateurs.'
        res.status(404).json(message)
    })
}