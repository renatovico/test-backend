'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PokemonKinds', {
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
        await queryInterface.addConstraint('PokemonKinds', {
            type: 'unique',
            fields: ['name'],
            name: 'unique_kind_name_constraint'
        });

        await queryInterface.addColumn('PokemonKinds', 'ts_name', {
            type: Sequelize.DataTypes.TSVECTOR
        });

        // Create trigger to update ts_name column whenever name column is updated
        await queryInterface.sequelize.query(`
      CREATE TRIGGER pokemon_kind_tsvector_update
      BEFORE INSERT OR UPDATE ON "PokemonKinds"
      FOR EACH ROW EXECUTE FUNCTION tsvector_update_trigger(ts_name, 'pg_catalog.english', name);
    `);

        // Create index on ts_name column
        await queryInterface.addIndex('PokemonKinds', {
            fields: [Sequelize.literal('ts_name')],
            using: 'gin',
            name: 'pokemon_kind_ts_name_idx'
        });

    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('PokemonKinds');
    }
};