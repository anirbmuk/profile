const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/frontend',
    '<rootDir>/apps/connector',
    '<rootDir>/libs/connector-lib',
    '<rootDir>/libs/components',
  ],
};
