
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pokemon.init({
    name: DataTypes.STRING,
    pokedex_number: DataTypes.INTEGER,
    generation: DataTypes.INTEGER,
    evolution_stage: DataTypes.INTEGER,
    evolved: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Pokemon'
  });
  return Pokemon;
};