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
        let pokedex_number = parseNumber(row['Pokedex Number']);
//         Generation: 1, //NUMBER
        let generation = parseNumber(row['Generation']);
//         FamilyID: 1, //import but accept nulls
        let family_kind = parseNumber(row['FamilyID'], true);
//         ATK: 118, //attack integer
        let attack_score = parseNumber(row['ATK']);
//         DEF: 118, //defense integer
        let defense_score = parseNumber(row['DEF']);
//         STA: 90, //stamina integer
        let stamina_score = parseNumber(row['STA']);
//         'Evolution Stage': 1, //integer need check EVOLVED, LOWER, blank
        let evolution_stage = parseNumber(row['Evolution Stage'], false, {
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
//         '100% CP @ 40': 981, //integer combat_points_at_lvl_40
        let combat_points_at_lvl_40 = parseNumber(row['100% CP @ 40']);
//         : 967 //integer combat_points_at_lvl_39
        let combat_points_at_lvl_39 = parseNumber(row['100% CP @ 39']);
//         Evolved: 0, //boolean
        let evolved = parseBoolean(row['Evolved']);
//         'Cross Gen': 0, //boolean
        let cross_gen = parseBoolean(row['Cross Gen']);
//         Spawns: 1, //boolean
        let spawns = parseBoolean(row['Spawns']);
//         Regional: 0, //boolean
        let regional = parseBoolean(row['Regional']);
//         Shiny: 0, //boolean
        let shiny = parseBoolean(row['Shiny']);
//         Nest: 1, //boolean
        let nest = parseBoolean(row['Nest']);
//         New: 0, //boolean
        let new_pokemon = parseBoolean(row['New']);
//         'Not-Gettable': 0, //boolean
        let not_gettable = parseBoolean(row['Not-Gettable']);
//         'Future Evolve': 0, //boolean
        let future_evolve = parseBoolean(row['Future Evolve']);

        return {
            name,
            pokedex_number,
            generation,
            combat_points_at_lvl_39,
            combat_points_at_lvl_40,
            hatchable,
            raidable,
            aquireable,
            legendary,
            evolution_stage,
            stamina_score,
            defense_score,
            attack_score,
            family_kind,
            evolved,
            cross_gen,
            spawns,
            regional,
            nest,
            new_pokemon,
            not_gettable,
            future_evolve,
            shiny
        }

    }

    return {
        mapToModel: async function (row, transaction) {
//         'Type 1': 'grass', //pokemon_type N:N
//         'Type 2': 'poison', //pokemon_type N:N
//         'Weather 1': 'Sunny/clear', //pokemon_environment N:N
//         'Weather 2': 'Cloudy', //pokemon_environment N:N

            if (!row || !transaction) {
                return false;
            }

            logger.debug(row);
            let data = mapRow(row);
            logger.debug(data);

            let pokemon = await db.Pokemon.findOne({
                where: { pokedex_number: data.pokedex_number },
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