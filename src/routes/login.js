import { User } from "../db/sequelize.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { username: req.body.username } })
            .then(user => {
                if (!user) {
                    const message = `L'utilisateur n'existe pas.`
                    return res.status(404).json({ message })
                }

                bcrypt.compare(req.body.password, user.password)
                    .then(isPasswordValid => {
                        if (!isPasswordValid) {
                            const message = `Mot de passe incorrect.`
                            return res.status(401).json({ message })
                        }
                        
                        const token = jwt.sign(
                            { userId: user.id },
                            process.env.JWT_PRIVATE_KEY,
                            { expiresIn: process.env.JWT_EXPIRES_IN }
                        )
                        const message = `L'utilisateur a été connecté avec succès.`
                        return res.json({ message, data: user, token })
                    })
            })
            .catch(error => {
                const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`
                return res.status(500).json({ message, data: error })
            })
    })
}