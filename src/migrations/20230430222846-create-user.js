
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Pokemons', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            pokedex_number: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            family_kind: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            attack_score: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            defense_score: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            stamina_score: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            generation: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            evolution_stage: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            legendary: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            aquireable: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            raidable: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            hatchable: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            combat_points_at_lvl_40: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            combat_points_at_lvl_39: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            evolved: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            cross_gen: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            spawns: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            regional: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            shiny: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            nest: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            new_pokemon: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            not_gettable: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            future_evolve: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
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
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};