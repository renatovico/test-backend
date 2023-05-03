const Router = require('koa-router');

module.exports = ({ healthcheckController, pokemonController, pokemonWeatherController, pokemonKindController }) => {
    const router = new Router();


    // Healthcheck
    router.get('/healthcheck', healthcheckController.live); // check if app has up
    router.get('/readiness', healthcheckController.ready); // check if app has ready to work
    router.get('/', healthcheckController.live);


    // Pokemon Controller
    router.get('/pokemons', pokemonController.list);
    router.get('/pokemon_weathers', pokemonWeatherController.list);
    router.get('/pokemon_kinds', pokemonKindController.list);

    return router;
};