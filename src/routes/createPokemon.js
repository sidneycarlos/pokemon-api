import { ValidationError, UniqueConstraintError } from "sequelize";
import { Pokemon } from "../db/sequelize.js";
import auth from "../auth/auth.js"

export default (app) => {
    app.post('/api/pokemons', auth, (req, res) => {
        if (!req.body) {
            const message = 'Vous devez renseigner au moins un champ'
            return res.status(404).json({message})
        }
        
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Le pokémon ${pokemon.name} a bien été créé.`
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
                    const [constraintError] = error.errors
                    return res.status(400).json({message: constraintError.message, data: error})
                }
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = `Le pokémon n'a pas pu être ajouté. Réessayez dans quelques instants.`
                res.status(500).json({message, data: error})
            })
    })
    app.post('/api/pokemons', (req, res) => {
        const message = 'Vous ne pouvez pas ajouter plusieurs pokémons.'
        res.status(404).json({message})
    })
}