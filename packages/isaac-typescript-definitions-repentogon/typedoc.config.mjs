import { getTypeDocConfig } from "../docs/typedoc.config.base.mjs"; // eslint-disable-line import-x/no-relative-packages

const config = getTypeDocConfig(import.meta.dirname);

/** @type {import("typedoc").TypeDocOptions} */
export default {
  ...config,
  intentionallyNotExported: [
    // From: "./src/enums/flags"
    "EntityTagType",
    "EntityTagValue",
    "GibFlagType",
    "GibFlagValue",
  ],
};
