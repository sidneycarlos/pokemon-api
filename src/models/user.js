export default (sequelize, DataTypes) => {
    return sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true, 
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: 'Ce nom est déjà pris'
                },
                validate: {
                    notNull: { msg: 'Le username ne peut être null' },
                    notEmpty: { msg: 'Le username ne peut être vide'},
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Le mot de passe ne peut être null' },
                    notEmpty: { msg: 'Le mot de passe ne peut être vide'},
                }

            }

        }
    )
}