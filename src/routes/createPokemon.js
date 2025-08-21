import { ValidationError, UniqueConstraintError } from "sequelize";
import { Pokemon } from "../db/sequelize.js";

export default (app) => {
    app.post('/api/pokemons', (req, res) => {
        if (!req.body) {
            const message = 'Vous devez renseigner au moins un champ'
            res.status(404).json({message})
        } else {
            Pokemon.create(req.body)
                .then(pokemon => {
                    const message = `Le pokémon ${pokemon.name} a bien été créé.`
                    res.json({ message, data: pokemon })
                })
                .catch(error => {
                    if (error instanceof UniqueConstraintError) {
                        const [constraintError] = error.errors
                        res.status(400).json({message: constraintError.message, data: error})
                    } else if (error instanceof ValidationError) {
                        res.status(400).json({message: error.message, data: error})
                    } else {
                        const message = `Le pokémon n'a pas pu être ajouté. Réessayez dans quelques instants.`
                        res.status(500).json({message, data: error})
                    }
    
                })
        }
    })
    app.post('/api/pokemons', (req, res) => {
        const message = 'Vous ne pouvez pas ajouter plusieurs pokémons.'
        res.status(404).json({message})
    })
}