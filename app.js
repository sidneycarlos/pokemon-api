import express from 'express'
import morgan from 'morgan'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { initDb } from '@/db/sequelize.js'

import routes from '@/routes/index.js'

const port = 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: false }))

initDb()
routes(app)

app.use(({res}) => {
    const message = 'Impossible de trouver la ressources demandée! Vous pouvez essayer une autre URL'
    res.status(404).json({
        message
    })
})

app.listen(port, () => {
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`)
})
