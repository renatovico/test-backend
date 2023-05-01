'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const { Sequelize } = require('sequelize');
let { POSTGRES_CONNECTIONPOOL, POSTGRES_ACQUIRETIME, POSTGRES_IDLETIME } = process.env;
POSTGRES_CONNECTIONPOOL = parseInt(POSTGRES_CONNECTIONPOOL, 10);
POSTGRES_CONNECTIONPOOL ||= 20;
POSTGRES_ACQUIRETIME = parseInt(POSTGRES_ACQUIRETIME, 10);
POSTGRES_ACQUIRETIME ||= 30000;
POSTGRES_IDLETIME = parseInt(POSTGRES_IDLETIME, 10);
POSTGRES_IDLETIME ||= 10000;

module.exports = ({logger}) => {
    const sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: 'postgres',
        logging: logger.log,
        pool: {
            max: POSTGRES_CONNECTIONPOOL,
            min: 1,
            acquire: POSTGRES_ACQUIRETIME, //The maximum time, in milliseconds, that pool will try to get connection before  error
            idle: POSTGRES_IDLETIME //The maximum time, in milliseconds, that a connection can be idle before being released.
        }
    });


    const db = {};
    fs
            .readdirSync(__dirname)
            .filter(file => {
                return (
                        file.indexOf('.') !== 0 &&
                        file !== basename &&
                        file.slice(-3) === '.js' &&
                        file.indexOf('.test.js') === -1
                );
            })
            .forEach(file => {
                const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
                db[model.name] = model;
            });

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
};
