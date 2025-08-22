import login from './login/index.js'
import user from './user/index.js'
import pokemons from './pokemons/index.js'

export default (app) => {
    user(app)
    login(app)
    pokemons(app)

} 