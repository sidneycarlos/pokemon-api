const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

export default (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Ce nom est déjà pris'
        },
        validate: {
          notNull: { msg: 'Name: Le nom ne peut être null' },
          notEmpty: { msg: 'Name: Le nom ne peut être vide'},
          len: {
            args: [1, 25],
            msg: 'Le nom doit comprendre entre 1 et 25 caractères'
          }
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'HP: Utilisez uniquement des nombres entiers pour les points de vie.' },
          notNull: { msg: 'HP: Les points de vie sont une propriété requise' },
          max: {
            args: [999],
            msg: 'Les points de vie doivent être inférieurs ou égal à 999'
          },
          min: {
            args: [0],
            msg: 'Les points de vie doivent être supérieurs ou égal à 0'
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'CP: Utilisez uniquement des nombres entiers pour les points de vie.' },
          notNull: { msg: 'CP: Les points de dégâts sont une propriété requise' },
          max: {
            args: [999],
            msg: 'Les points de dégât doivent être inférieurs ou égal à 99'
          },
          min: {
            args: [0],
            msg: 'Les points de dégât doivent être supérieurs ou égal à 0'
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: 'PICTURE: Utilisez une url valide' },
          notNull: { msg: 'PICTURE: L\'image est une propriété requise' }
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isTypesValid(value) {
            if(!value) {
              throw new Error('Un pokémon doit au moins avoir un type.')
            }

            if (value.split(',').length > 3) {
              throw new Error('Un pokémon doit avoir 3 types au maximum.')
            }

            value.split(',').forEach(type => {
              if (!validTypes.includes(type)) {
                throw new Error(`Le type ${type} ne fait pas partie des types autorisés: ${validTypes}`)
              }
            });
          }
        },
        get() {
            return this.getDataValue('types').split(',')
        },
        set(types) {
            this.setDataValue('types', types.join())
        }
      },
    },
    {
      timestemps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};