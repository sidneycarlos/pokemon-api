import { Pokemon } from "../db/sequelize.js";

export default (app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        Pokemon.findByPk(id)
            .then(pokemon => {
                if (pokemon === null) {
                    const message = `Le pokémon demandé n'existe pas. Réessayez un nouvel id.`
                    res.status(404).json({message})
                } else {
                    const pokemonDeleted = pokemon
                    return Pokemon.destroy({
                        where: {
                            id: pokemon.id
                        }
                    })
                        .then(_ => {
                            const message = `Le pokémon  avec l'id ${pokemonDeleted.id} a bien été supprimé.`
                            res.json({ message, data: pokemon })
                        })
                    }
                })
            .catch(error => {
                const message = `Le pokémon n'a pas pu être supprimé. Réessayez dans quelques instants.`
                res.status(500).json({message, data: error})
            })
    })
    app.delete('/api/pokemons', (req, res) => {
        const message = 'Vous ne pouvez pas supprimer plusieurs pokemons.'
        res.status(404).json(message)
    })
}