/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  testMatch: ["<rootDir>/test/**/*.test.ts"],
};
