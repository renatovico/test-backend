
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
            this.belongsTo(models.PokemonWeather, { foreignKey: 'weatherId' });
            this.belongsTo(models.PokemonWeather, { as: 'secondaryWeather', foreignKey: 'secondaryWeatherId' });
            this.belongsTo(models.PokemonKind, { foreignKey: 'kindId' });
            this.belongsTo(models.PokemonKind, {  as: 'secondaryKind', foreignKey: 'secondaryKindId' });
        }
    }
    Pokemon.init({
        name: DataTypes.STRING,
        pokedexNumber: DataTypes.INTEGER,
        familyKind: DataTypes.INTEGER,
        attackScore: DataTypes.INTEGER,
        defenseScore: DataTypes.INTEGER,
        staminaScore: DataTypes.INTEGER,
        totalScore: DataTypes.INTEGER, //My initial thought is use computed field of psql, but sequelize doesn't support
        generation: DataTypes.INTEGER,
        evolutionStage: DataTypes.INTEGER,
        legendary: DataTypes.INTEGER,
        aquireable: DataTypes.INTEGER,
        raidable: DataTypes.INTEGER,
        hatchable: DataTypes.INTEGER,
        combatPointsAtLvl40Score: DataTypes.INTEGER,
        combatPointsAtLvl39Score: DataTypes.INTEGER,
        evolved: DataTypes.BOOLEAN,
        crossGen: DataTypes.BOOLEAN,
        spawns: DataTypes.BOOLEAN,
        regional: DataTypes.BOOLEAN,
        shiny: DataTypes.BOOLEAN,
        nest: DataTypes.BOOLEAN,
        newPokemon: DataTypes.BOOLEAN,
        notGettable: DataTypes.BOOLEAN,
        futureEvolve: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Pokemon'
    });




    return Pokemon;
};