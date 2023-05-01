const { live } = require('../../src/controllers/healthcheckController');

describe('controllers -> health', () => {
    describe('live', () => {
        it('Should load CPU for ~5s', () => {
            expect(live()).toBeUndefined();
        });
    });
});