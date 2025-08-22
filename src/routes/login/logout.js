import auth from '@/auth/auth.js'
import jwt from 'jsonwebtoken'
import { blacklistToken } from '@/auth/tokenBlacklist.js'

export default (app) => {
    app.post('/api/logout', auth, async (req, res) => {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]

        try {
            const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            if (!decoded?.jti || !decoded?.exp) {
                const message = `Jeton invalide.`
                return res.status(400).json({ message })
            }
            await blacklistToken(decoded.jti, decoded.exp)
            const message = `L'utilisateur a été déconnecté.`
            return res.json({ message })
        } catch (error) {
            const message = `Impossible de déconnecter l'utilisateur.`
            return res.status(400).json({ message, data: error.message })
        }
    })
} 