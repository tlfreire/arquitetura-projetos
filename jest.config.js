module.exports = {
  // arquivos que vão entrar no coverage
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],

  // pasta aonde vai ser colocado os arquivos do coverage
  coverageDirectory: "coverage",

  // pastas que vão ser ignoradas no coverage
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\",
    "<rootDir>/src/core/infra/data/database/migrations",
  ], // é ignorado as migrations no coverage

  // defini a pasta principal dos testes
  roots: [
    "<rootDir>/tests"
  ],

  // o ambiente onde será executado os testes, como estamos no backend é o node
  testEnvironment: "node",

  // usa o transform para o jest transpilar arquivos typescript
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
};