'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            await queryInterface.sequelize.query('CREATE EXTENSION pg_trgm;');
        } catch(err) {
            //ignore this is for start extension before migration (contrib extesion)
        }
        await queryInterface.createTable('PokemonWeathers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });

        await queryInterface.addConstraint('PokemonWeathers', {
            type: 'unique',
            fields: ['name'],
            name: 'unique_weather_name_constraint'
        });

        await queryInterface.addColumn('PokemonWeathers', 'ts_name', {
            type: Sequelize.DataTypes.TSVECTOR
        });

        // Create trigger to update ts_name column whenever name column is updated
        await queryInterface.sequelize.query(`
      CREATE TRIGGER pokemon_weather_tsvector_update
      BEFORE INSERT OR UPDATE ON "PokemonWeathers"
      FOR EACH ROW EXECUTE FUNCTION tsvector_update_trigger(ts_name, 'pg_catalog.english', name);
    `);

        // Create index on ts_name column
        await queryInterface.addIndex('PokemonWeathers', {
            fields: [Sequelize.literal('ts_name')],
            using: 'gin',
            name: 'pokemon_weather_ts_name_idx'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('PokemonWeathers');
    }
};