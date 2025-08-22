import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from '@/auth/tokenBlacklist.js'

export default async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
        return res.status(401).json({ message });
    }

    const tokenContents = authorizationHeader.split(' ');
    if (tokenContents.length !== 2 || tokenContents[0] !== 'Bearer') {
        const message = `Le format du jeton est invalide. Utilisez le format "Bearer <token>".`;
        return res.status(401).json({ message });
    }

    const token = tokenContents[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        if (!decodedToken || !decodedToken.userId) {
            const message = `Le jeton ne contient pas d'identifiant utilisateur valide.`;
            return res.status(401).json({ message });
        }

        if (decodedToken.jti && await isTokenBlacklisted(decodedToken.jti)) {
            const message = `Le jeton a été révoqué.`;
            return res.status(401).json({ message });
        }

        const userId = decodedToken.userId;

        if (req.query.userId && req.query.userId != userId) {
            const message = `L'identifiant de l'utilisateur est invalide.`;
            return res.status(401).json({ message });
        }

        req.auth = { userId: userId };
        return next();
    } catch (error) {
        const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
        return res.status(401).json({ message, data: error.message });
    }
};
