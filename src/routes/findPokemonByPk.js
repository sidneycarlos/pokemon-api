import { Pokemon } from "../db/sequelize.js";

export default (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        Pokemon.findByPk(id)
            .then(pokemon => {
                if (pokemon === null) {
                    const message = `Le pokémon demandé n'existe pas. Réessayez un nouvel id.`
                    res.status(404).json({message})
                }
                else {
                    const message = `Le pokémon avec l'id ${id} a bien été récupérée.`
                    res.json({ message, data: pokemon })
                }
            })
            .catch(error => {
                const message = `Le pokémon n'a pas pu être récupéré. Réessayez dans quelques instants.`
                res.status(500).json({message, data: error})
            })
    })
}