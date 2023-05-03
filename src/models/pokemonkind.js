'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class PokemonKind extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.Pokemon, { foreignKey: 'kindId' });
            this.hasMany(models.Pokemon, { as: 'secondaryKind', foreignKey: 'secondaryKindId' });
        }
    }
    PokemonKind.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'PokemonKind',
    });
    return PokemonKind;
};