'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('PokemonWeathers');
    }
};