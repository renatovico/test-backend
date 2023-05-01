const  healthControllerFactory = require('../../src/controllers/healthcheckController');

describe('controllers -> health', () => {
    describe('live', () => {
        it('Should load CPU for ~5s', () => {
            let db = {}, logger = {};
            let controller = healthControllerFactory(db, logger);
            expect(controller.live).toBeFalsy();
        });
    });
});