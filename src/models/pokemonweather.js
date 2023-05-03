'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PokemonWeather extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.hasMany(models.Pokemon, { foreignKey: 'weatherId' });
        this.hasMany(models.Pokemon, { as: 'secondaryWeather', foreignKey: 'secondaryWeatherId' });
    }
  }
  PokemonWeather.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PokemonWeather',
  });
  return PokemonWeather;
};