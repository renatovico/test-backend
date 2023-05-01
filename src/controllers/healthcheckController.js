const { OK, INTERNAL_SERVER_ERROR } = require('http-status');

let lastTried = Date.now();

module.exports = ({  db, logger }) => {
    const live = async ctx => {
        ctx.status = OK;
        ctx.body = {
            status: 'Looking good ;)1'
        };
    };

    const ready = async ctx => {
        const dbIsUp = db.sequelize.connectionManager.pool.size > 0;
        ctx.status = dbIsUp ? OK : INTERNAL_SERVER_ERROR;
        ctx.body = {
            status: dbIsUp ? 'Looking good ;)' : 'Check db connection :('
        };
        if (!dbIsUp && (lastTried - Date.now()) < 10000) {
            lastTried = Date.now();
            try {
                await db.sequelize.authenticate();
            } catch(err) {
                logger.error(err)
            }
        }
    };

    return {
        live,
        ready
    };
};