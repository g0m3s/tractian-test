const path = require("path");

module.exports = {
  i18n: {
    localeDetection: true,
    defaultLocale: 'en-US',
    locales: ['en-US', 'pt-BR'],
  },
  trailingSlash: true,
  localePath: path.resolve("./public/locales"),
};
