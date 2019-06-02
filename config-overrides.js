const { addDecoratorsLegacy, override, useBabelRc } = require("customize-cra");

/* config-overrides.js */
module.exports = override(
    addDecoratorsLegacy(),
    useBabelRc(),
);
