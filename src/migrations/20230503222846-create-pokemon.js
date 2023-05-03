
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
            weatherId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'PokemonWeathers',
                    key: 'id'
                }
            },
            secondaryWeatherId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'PokemonWeathers',
                    key: 'id'
                },
                defaultValue: null
            },
            kindId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'PokemonKinds',
                    key: 'id'
                }
            },
            secondaryKindId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'PokemonKinds',
                    key: 'id'
                },
                defaultValue: null
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            pokedexNumber: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            familyKind: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            attackScore: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            defenseScore: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            staminaScore: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            totalScore: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            generation: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            evolutionStage: {
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
            combatPointsAtLvl40Score: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            combatPointsAtLvl39Score: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            evolved: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            crossGen: {
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
            newPokemon: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            notGettable: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            futureEvolve: {
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
            },
        });

        await queryInterface.addConstraint('Pokemons', {
            type: 'unique',
            fields: ['name'],
            name: 'unique_pokemon_name_constraint'
        });

        await queryInterface.addConstraint('Pokemons', {
            type: 'unique',
            fields: ['name', 'pokedexNumber'],
            name: 'unique_pokemon_name_number_constraint'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Pokemons');
    }
};