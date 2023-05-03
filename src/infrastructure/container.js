const { createContainer, asFunction } = require('awilix');

const dbBuilder = require('../models');
const importerBuilder = require('../business/importer');
const mapperXlsBuilder = require('../business/importer/mapperXLS');

const serverBuilder = require('./server');

const healthcheckControllerBuilder = require('../controllers/healthcheckController');
const pokemonControllerBuilder = require('../controllers/pokemonController');
const pokemonWeatherControllerBuilder = require('../controllers/pokemonWeatherController');
const pokemonKindControllerBuilder = require('../controllers/pokemonKindController');

const loggerBuilder = require('./logger');
const router = require('./router');


const container = createContainer().register({
    logger: asFunction(loggerBuilder).singleton(),

    server: asFunction(serverBuilder).singleton(),
    importer: asFunction(importerBuilder).singleton(),
    mapperXLS: asFunction(mapperXlsBuilder).singleton(),

    router: asFunction(router).singleton(),
    healthcheckController: asFunction(healthcheckControllerBuilder).singleton(),
    pokemonController: asFunction(pokemonControllerBuilder).singleton(),
    pokemonWeatherController: asFunction(pokemonWeatherControllerBuilder).singleton(),
    pokemonKindController: asFunction(pokemonKindControllerBuilder).singleton(),

    db: asFunction(dbBuilder).singleton()
});

module.exports = container;