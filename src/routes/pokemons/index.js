import findAllPokemons from './findAllPokemons.js'
import findPokemonByPk from './findPokemonByPk.js'
import createPokemon from './createPokemon.js'
import updatePokemon from './updatePokemon.js'
import deletePokemon from './deletePokemon.js'

export default (app) => {
    findAllPokemons(app)
    findPokemonByPk(app)
    createPokemon(app)
    updatePokemon(app)
    deletePokemon(app)
} 