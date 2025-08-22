import { Sequelize, DataTypes } from 'sequelize'
import PokemonModel from '../models/pokemon.js'
import UserModel from '../models/user.js'
import RevokedTokenModel from '../models/revokedToken.js'
// import pokemons from './mock-pokemons.js'
import mariadb from 'mariadb';
import 'dotenv/config'

const sequelize = new Sequelize(
    `${process.env.DB_NAME}`,
    `${process.env.DB_USER}`,
    `${process.env.DB_PASSWORD}`,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        dialectModule: mariadb,
        dialectOptions: {
            socketPath: process.env.DB_SOCKET_PATH,
            connectTimeout: process.env.DB_CONNECT_TIMEOUT,
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

export const Pokemon = PokemonModel(sequelize, DataTypes)
export const User = UserModel(sequelize, DataTypes)
export const RevokedToken = RevokedTokenModel(sequelize, DataTypes)

export const initDb = () => {
    // return sequelize.sync({ force:true }) deactivate to avoid db deletion
    return sequelize.sync({ alter: true })
        .then(_ => {
            console.log('La base de données "Pokedex" a bien été synchronisée.')
        })
}