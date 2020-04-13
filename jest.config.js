module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
    },
    collectCoverageFrom: ['src/**/*.ts', 'src/**/*.vue'],
};
