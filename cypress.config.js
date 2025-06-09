const { defineConfig } = require("cypress");

module.exports = defineConfig({
  baseUrl: "automationexercise.com",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
