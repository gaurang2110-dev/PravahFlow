module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-gesture-handler|react-redux|@reduxjs|react-native-maps|react-native-config|@react-native-firebase|firebase|@firebase)/',
  ],
  moduleNameMapper: {
    '^@firebase/(.*)$': '<rootDir>/../../node_modules/@firebase/$1/dist/index.cjs.js',
  }
};
