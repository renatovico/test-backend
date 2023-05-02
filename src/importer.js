const container = require('./infrastructure/container');

const importer = container.resolve('importer');

importer.start();