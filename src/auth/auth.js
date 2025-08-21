import jwt from 'jsonwebtoken'
import private_key from '../auth/private_key.js'

export default (req, res, next) => {
    const authorizationHeader = req.header.authorization

    if(!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. ajoutez-en un dans l'en-tête de la requête.`
        res.status(401).json({ message })
    }

    else {
        const token = authorizationHeader.split('')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, decodedToken) => {
            if (error) {
                const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`
                res.status(401).json({ message, data: error })
            } else {
                const userId = decodedToken.userId

                if (req.body.userId && req.body.userId !== userId) {
                    const message = `L'identifiant de l'utilisateur est invalide.`
                    res.status(401).json({message})
                } else {
                    next()
                }
            }
        })
    }
}