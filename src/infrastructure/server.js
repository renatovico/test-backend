const Koa = require('koa');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const util = require('util');
const koaSwaggerUi = require('koa2-swagger-ui');
const yamljs = require('yamljs');

const { SERVER_PORT } = process.env;

module.exports = ({ logger, router }) => {
    const app = new Koa();
    const spec = yamljs.load('./openapi.yaml');

    app.use(compress())
            .use(helmet({
                contentSecurityPolicy: false, //FOR A REAL API THIS NEED ON
            })).use(bodyParser({ enableTypes: ['json'], jsonLimit: '1mb' }))
            .use(async (ctx, next) => {
                const start = Date.now();
                await next();
                const ms = Date.now() - start;
                const message = `${ctx.method} ${ctx.url} - ${ms}ms - ${ctx.status}`;

                if (ctx.status < 200 || ctx.status >= 500) {
                    logger.error(message);
                } else {
                    logger.info(message);
                }

            }).use(koaSwaggerUi.koaSwagger({
                routePrefix: '/swagger', // host at /swagger instead of default /docs
                swaggerOptions: { spec },
            })).use(router.routes());

    return {
        app,
        start: async () => {
            try {
                app.listen(SERVER_PORT, () => {
                    logger.info(`Server listening on ${SERVER_PORT}`);
                });
            } catch (err) {
                logger.error('Problem initializing server', {
                    error: util.inspect(err)
                });
                process.exit(1);
            }
        }
    };
};