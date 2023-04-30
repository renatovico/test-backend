const Router = require('koa-router');

module.exports = ({ healthcheckController }) => {
    const router = new Router();


    // Healthcheck
    router.get('/healthcheck', healthcheckController.live); //check if app has up
    router.get('/readiness', healthcheckController.ready); //check if app has ready to work

    router.get('/', healthcheckController.live);

    // Heavy Job
    // router.post('/jobs/heavy', heavyController.publishHeavyJob);
    // router.get('/jobs/heavy/:jobId', heavyController.getHeavyJob);
    // router.post('/jobs/heavy/:jobId/cancel', heavyController.cancelHeavyJob);

    return router;
};