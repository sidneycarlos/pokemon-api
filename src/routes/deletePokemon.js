import { Pokemon } from "../db/sequelize.js";
import auth from "../auth/auth.js"

export default (app) => {
    app.delete('/api/pokemons/:id', auth, (req, res) => {
        const id = req.params.id
        Pokemon.findByPk(id)
            .then(pokemon => {
                if (pokemon === null) {
                    const message = `Le pokémon demandé n'existe pas. Réessayez un nouvel id.`
                    return res.status(404).json({message})
                }
                
                const pokemonDeleted = pokemon
                return Pokemon.destroy({
                    where: {
                        id: pokemon.id
                    }
                })
                    .then(_ => {
                        const message = `Le pokémon  avec l'id ${pokemonDeleted.id} a bien été supprimé.`
                        return res.json({ message, data: pokemon })
                    })
                })
            .catch(error => {
                const message = `Le pokémon n'a pas pu être supprimé. Réessayez dans quelques instants.`
                return res.status(500).json({message, data: error})
            })
    })
    app.delete('/api/pokemons', (req, res) => {
        const message = 'Vous ne pouvez pas supprimer plusieurs pokemons.'
        return res.status(404).json(message)
    })
}