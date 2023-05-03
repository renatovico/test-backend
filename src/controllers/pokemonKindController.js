const { OK, INTERNAL_SERVER_ERROR } = require('http-status');
const {has} = require("koa/lib/response");

let lastTried = Date.now();

module.exports = ({  db, logger }) => {
    const list = async ctx => {
        let pokemons = [];
        const searchTerm = ctx.query.name;
        const HARD_LIMIT = 10;
        let limit = parseInt(ctx.query.limit, 10);
        if (isNaN(limit) || limit < 1 || limit > HARD_LIMIT) {
            limit = HARD_LIMIT;
        }
        let offset = parseInt(ctx.query.offset, 10);
        if (isNaN(offset) || offset < 1) {
            offset = 0;
        }
        let limit_query = limit + 1; // THIS IS HACK FOR NEXT PAGE COMPUTE EVICTS COUNT(*) NEXT

        try {
            if (searchTerm) {
                pokemons = await db.PokemonKind.findAll({
                    attributes: [
                        'id',
                        'name',
                        [db.Sequelize.literal(`ts_rank("ts_name", websearch_to_tsquery('english', :searchTerm), 1)`), 'rank']
                    ],
                    where: db.Sequelize.literal(`"ts_name" @@ websearch_to_tsquery('english', :searchTerm)`),
                    replacements: { searchTerm: `${searchTerm}:*` },
                    order: db.Sequelize.literal(`"rank" DESC`),
                    limit: limit_query,
                    offset: offset
                });
            } else {
                pokemons = await db.PokemonKind.findAll({
                    attributes: [
                        'id',
                        'name',
                    ],
                    order: db.Sequelize.literal(`"name" ASC`),
                    limit: limit_query,
                    offset: offset
                });
            }
        } catch(err) {
            logger.error(err);
        }

        const has_more = pokemons.length === limit_query;
        pokemons = pokemons.slice(0, limit);

        ctx.status = OK;
        ctx.body = {
            meta: {
                has_more: has_more,
                limit: limit,
                offset: offset
            },
            weathers: pokemons
        };
    };

    return {
        list,
    };
};