export default (sequelize, DataTypes) => {
    return sequelize.define(
        'RevokedToken',
        {
            jti: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            expAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'exp_at'
            }
        },
        {
            tableName: 'revoked_tokens',
            timestamps: false,
            indexes: [
                { fields: ['exp_at'] }
            ]
        }
    )
} 