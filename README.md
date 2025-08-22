# Pokémon API

API Node.js (Express + Sequelize/MariaDB) avec alias d’imports `@/`.

## Prérequis
- Node.js ≥ 18
- MariaDB (ou un service compatible)
- Fichier `.env` avec les variables requises:
  - `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_DIALECT`
  - `JWT_PRIVATE_KEY`, `JWT_EXPIRES_IN`

## Installation
```bash
npm install
# ou
yarn
```

## Démarrer le projet
```bash
npm run start
# ou
yarn start
```
Le serveur démarre par défaut sur `http://localhost:3000`.

## Alias d’imports `@/`
Le projet utilise un alias `@/` pour référencer le dossier `src/` et éviter les chemins relatifs profonds.

- Exemple:
```js
// Avant
import { Pokemon } from "../../db/sequelize.js";
import auth from "../../auth/auth.js";

// Après
import { Pokemon } from "@/db/sequelize.js";
import auth from "@/auth/auth.js";
```

### Comment ça marche ?
- Un loader ESM personnalisé `loader.mjs` résout tout specifier commençant par `@/` vers `src/...`.
- Le script de démarrage utilise ce loader:
```json
"start": "nodemon --exec \"node --experimental-loader ./loader.mjs\" app.js"
```

Aucun changement n’est nécessaire dans le code en dehors des imports.

## Structure (extrait)
```
src/
  auth/
  db/
  models/
  routes/
    login/
    pokemons/
    user/
```

## Endpoints (aperçu)
- Auth: `POST /api/login`
- Users: `POST /api/users`
- Pokémons: `GET /api/pokemons`, `GET /api/pokemons/:id`, `POST /api/pokemons`, `PUT /api/pokemons/:id`, `DELETE /api/pokemons/:id`

## Migrations
Scripts disponibles via `sequelize-cli`:
```bash
npm run migrate
```

## Notes
- `sequelize.sync({ alter: true })` est actif; en production, privilégier les migrations.
- Le loader ESM nécessite Node 18+ (recommandé). Si vous rencontrez un avertissement concernant `--experimental-loader`, c’est attendu selon la version de Node. 