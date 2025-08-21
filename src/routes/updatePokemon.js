import { Pokemon } from "../db/sequelize.js";
import { ValidationError, UniqueConstraintError } from "sequelize";

export default (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: {id: id}
        })
            .then(_ => {
                return Pokemon.findByPk(id)
                    .then(pokemon => {
                        if (pokemon === null) {
                            const message = `Le pokémon demandé n'existe pas. Réessayez un nouvel id.`
                            res.status(404).json({message})
                        } else {
                            const message = `Le pokémon ${pokemon?.name} avec l'id ${pokemon?.id} a bien été modifié.`
                            res.json({ message, data: pokemon })
                        }
                    })
            })
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
                    const [constraintError] = error.errors
                    res.status(400).json({message: constraintError.message, data: error})
                } else if (error instanceof ValidationError) {
                    res.status(400).json({message: error.message, data: error})
                } else {
                    const message = `Le pokémon n'a pas pu être mis à jour. Réessayez dans quelques instants.`
                    res.status(500).json({message, data: error})
                }
            })
    })
}