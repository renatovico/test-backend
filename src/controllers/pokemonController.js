const { OK, INTERNAL_SERVER_ERROR } = require('http-status');

let lastTried = Date.now();

module.exports = ({  db, logger }) => {
    const list = async ctx => {
        const pokemons = await db.Pokemon.findAll();
        ctx.status = OK;
        ctx.body = {
            status: pokemons
        };
    };

    return {
        list,
    };
};