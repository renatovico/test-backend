module.exports = ({ logger, db }) => {

    const parseNumber = (dataToCheck, acceptNull= false, dictTransformer = {}) => {
        let data = dataToCheck; //Evicts change refer;
        if (data in dictTransformer) {
            data = dictTransformer[data];
        }

        if (acceptNull) {
            data ||= null;
            if (data) {
                data = parseInt(data, 10);
            }
        } else {
            data = parseInt(data, 10);
        }

        if (isNaN(data)) {
            throw new Error(`Fail to ParseNumber - ${dataToCheck}`);
        }

        return data;
    }

    const parseBoolean = (dataToCheck) => {
        return dataToCheck === "1" || parseInt(dataToCheck, 10) === 1;
    }

    const mapRow = (row) => {
//          Name: 'Bulbasaur', //String unique
        let name = row.Name; //check string
//         'Pokedex Number': 1, //Only number unique
        let pokedexNumber = parseNumber(row['Pokedex Number']);
//         Generation: 1, //NUMBER
        let generation = parseNumber(row['Generation']);
//         FamilyID: 1, //import but accept nulls
        let familyKind = parseNumber(row['FamilyID'], true);
//         ATK: 118, //attack integer
        let attackScore = parseNumber(row['ATK']);
//         DEF: 118, //defense integer
        let defenseScore = parseNumber(row['DEF']);
//         STA: 90, //stamina integer
        let staminaScore = parseNumber(row['STA']);
//         'Evolution Stage': 1, //integer need check EVOLVED, LOWER, blank
        let evolutionStage = parseNumber(row['Evolution Stage'], false, {
            'Evolved': 2,
            'Lower': 1,
            null: 0,
            undefined: 0
        });
//         Legendary: 0, //integer
        let legendary = parseNumber(row['Legendary']);
//         Aquireable: 1, //integer
        let aquireable = parseNumber(row['Aquireable']);
//         Raidable: 0, //integer
        let raidable = parseNumber(row['Raidable']);
//         Hatchable: 5, //integer
        let hatchable = parseNumber(row['Hatchable']);
//         '100% CP @ 40': 981, //integer combatPointsAtLvl40Score
        let combatPointsAtLvl40Score = parseNumber(row['100% CP @ 40']);
//         : 967 //integer combatPointsAtLvl39Score
        let combatPointsAtLvl39Score = parseNumber(row['100% CP @ 39']);
        // 'STAT TOTAL': 646,
        let totalScore = parseNumber(row['STAT TOTAL']);
//         Evolved: 0, //boolean
        let evolved = parseBoolean(row['Evolved']);
//         'Cross Gen': 0, //boolean
        let crossGen = parseBoolean(row['Cross Gen']);
//         Spawns: 1, //boolean
        let spawns = parseBoolean(row['Spawns']);
//         Regional: 0, //boolean
        let regional = parseBoolean(row['Regional']);
//         Shiny: 0, //boolean
        let shiny = parseBoolean(row['Shiny']);
//         Nest: 1, //boolean
        let nest = parseBoolean(row['Nest']);
//         New: 0, //boolean
        let newPokemon = parseBoolean(row['New']);
//         'Not-Gettable': 0, //boolean
        let notGettable = parseBoolean(row['Not-Gettable']);
//         'Future Evolve': 0, //boolean
        let futureEvolve = parseBoolean(row['Future Evolve']);

        return {
            name,
            pokedexNumber,
            generation,
            combatPointsAtLvl39Score,
            combatPointsAtLvl40Score,
            hatchable,
            raidable,
            aquireable,
            legendary,
            evolutionStage,
            staminaScore,
            defenseScore,
            attackScore,
            totalScore,
            familyKind,
            evolved,
            crossGen,
            spawns,
            regional,
            nest,
            newPokemon,
            notGettable,
            futureEvolve,
            shiny
        }
    }

    const processAssociation = async (transaction, data, dataValue, colTarget, assocationMoldel, optional = false) => {
        if (optional && !dataValue) {
            return data;
        }


        const [associationDataModel, created] = await assocationMoldel.findOrCreate({
            where: { name: dataValue }, defaults: { name: dataValue },
            transaction: transaction
        });

        if(!associationDataModel || !associationDataModel.id) {
            throw new Error(`Fail to create association: ${colTarget} - ${dataValue}`);
        }

        data[colTarget] = associationDataModel.id;

        return data;
    }


    return {
        mapToModel: async function (row, transaction) {


            if (!row || !transaction) {
                return false;
            }

            logger.debug(row);
            let data = mapRow(row);
            logger.debug(data);

            // process association
            data = await processAssociation(transaction, data, row['Type 1'], 'kindId', db.PokemonKind);
            data = await processAssociation(transaction, data, row['Type 2'], 'secondaryKindId', db.PokemonKind, true);
            data = await processAssociation(transaction, data, row['Weather 1'], 'weatherId', db.PokemonWeather);
            data = await processAssociation(transaction, data, row['Weather 2'], 'secondaryWeatherId', db.PokemonWeather, true);


            let pokemon = await db.Pokemon.findOne({
                where: { pokedexNumber: data.pokedexNumber, name: data.name },
                transaction: transaction
            });
            if (pokemon) {
                logger.info('already exists');
                pokemon.update(data);
            } else {
                pokemon = db.Pokemon.build(data);
            }

            // Errors throw to upper side
            await pokemon.save({transaction: transaction});


            return true;
        }
    }

}