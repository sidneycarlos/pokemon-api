import { Pokemon } from "@/db/sequelize.js";
import { ValidationError, UniqueConstraintError } from "sequelize";
import auth from "@/auth/auth.js"

export default (app) => {
    app.put('/api/pokemons/:id', auth, (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: {id: id}
        })
            .then(_ => {
                return Pokemon.findByPk(id)
                    .then(pokemon => {
                        if (pokemon === null) {
                            const message = `Le pokémon demandé n'existe pas. Réessayez un nouvel id.`
                            return res.status(404).json({message})
                        }

                        const message = `Le pokémon ${pokemon?.name} avec l'id ${pokemon?.id} a bien été modifié.`
                        return res.json({ message, data: pokemon })
                    })
            })
            .catch(error => {
                if (error instanceof UniqueConstraintError) {
                    const [constraintError] = error.errors
                    return res.status(400).json({message: constraintError.message, data: error})
                } 
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error})
                }

                    const message = `Le pokémon n'a pas pu être mis à jour. Réessayez dans quelques instants.`
                    return res.status(500).json({message, data: error})
            })
    })
}