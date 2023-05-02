
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
        family_kind: DataTypes.INTEGER,
        attack_score: DataTypes.INTEGER,
        defense_score: DataTypes.INTEGER,
        stamina_score: DataTypes.INTEGER,
        generation: DataTypes.INTEGER,
        evolution_stage: DataTypes.INTEGER,
        legendary: DataTypes.INTEGER,
        aquireable: DataTypes.INTEGER,
        raidable: DataTypes.INTEGER,
        hatchable: DataTypes.INTEGER,
        combat_points_at_lvl_40: DataTypes.INTEGER,
        combat_points_at_lvl_39: DataTypes.INTEGER,
        evolved: DataTypes.BOOLEAN,
        cross_gen: DataTypes.BOOLEAN,
        spawns: DataTypes.BOOLEAN,
        regional: DataTypes.BOOLEAN,
        shiny: DataTypes.BOOLEAN,
        nest: DataTypes.BOOLEAN,
        new_pokemon: DataTypes.BOOLEAN,
        not_gettable: DataTypes.BOOLEAN,
        future_evolve: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Pokemon'
    });
    return Pokemon;
};