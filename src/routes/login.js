import { User } from "../db/sequelize.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { username: req.body.username } })
            .then(user => {
                if (!user) {
                    const message = `L'utilisateur n'existe pas.`
                    res.status(404).json({ message })
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(isPasswordValid => {
                            if (!isPasswordValid) {
                                const message = `Mot de passe incorrect.`
                                res.status(401).json({ message })
                            } else {
                                const token = jwt.sign(
                                    { userId: user.id },
                                    process.env.JWT_PRIVATE_KEY,
                                    { expiresIn: process.env.JWT_EXPIRES_IN }
                                )
                                const message = `L'utilisateur a été connecté avec succès.`
                                res.json({ message, data: user, token })
                            }
                        })
                }
            })
            .catch(error => {
                const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            })
    })
}