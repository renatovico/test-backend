const Router = require('koa-router');

module.exports = ({ healthcheckController }) => {
    const router = new Router();


    // Healthcheck
    router.get('/healthcheck', healthcheckController.live);
    router.get('/readiness', healthcheckController.ready);

    router.get('/', healthcheckController.live);

    // Heavy Job
    // router.post('/jobs/heavy', heavyController.publishHeavyJob);
    // router.get('/jobs/heavy/:jobId', heavyController.getHeavyJob);
    // router.post('/jobs/heavy/:jobId/cancel', heavyController.cancelHeavyJob);

    return router;
};