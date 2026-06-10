import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/src/test/polyfills.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.test.json",
      },
    ],
  },
  moduleNameMapper: {
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.css$": "identity-obj-proxy",
    "\\.svg(\\?react)?$": "<rootDir>/src/test/__mocks__/svgMock.tsx",
  },
  testMatch: ["**/*.test.{ts,tsx}"],
  moduleDirectories: ["node_modules", "src"],
};

export default config;
