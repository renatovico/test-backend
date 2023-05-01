const config = {
    modulePaths: ['<rootDir>/src/'],
    randomize: true,
    watchman: true,
    collectCoverage: true,
    detectOpenHandles: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!**/coverage/**',
        '!**/src/migrations/**',
    ],
};

module.exports = config;