import path from "node:path";
import url from "node:url";
import { getTypeDocConfig } from "../docs/typedoc.config.base.mjs"; // eslint-disable-line import/no-relative-packages

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const config = getTypeDocConfig(__dirname);

/** @type {import('typedoc').TypeDocOptions} */
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
