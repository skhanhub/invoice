module.exports = {
    roots: [
      "<rootDir>/test"
    ],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    verbose: true,
    coverageReporters: ["text-summary", "html"]
  }