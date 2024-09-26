const { defineConfig } = require("cypress");
module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.saucedemo.com/",
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
  },
  video: false,
  chromeWebSecurity: false,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },
});
