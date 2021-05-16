"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ILLEGAL_CHARACTERS_FOR_WINDOWS_FILENAMES = exports.README_MD_TEMPLATES_PATH = exports.METADATA_XML_TEMPLATE_PATH = exports.MAIN_TS_TEMPLATE_PATH = exports.TEMPLATES_DIR_STATIC = exports.TEMPLATES_DIR = exports.README_MD = exports.PACKAGE_JSON = exports.METADATA_XML = exports.MAIN_TS = void 0;
const path_1 = __importDefault(require("path"));
const constants_1 = require("../common/constants");
// File/directory names
exports.MAIN_TS = "main.ts";
exports.METADATA_XML = "metadata.xml";
exports.PACKAGE_JSON = "package.json";
exports.README_MD = "README.md";
// repo/templates
exports.TEMPLATES_DIR = path_1.default.join(constants_1.REPO_ROOT, "templates");
exports.TEMPLATES_DIR_STATIC = path_1.default.join(exports.TEMPLATES_DIR, "static");
exports.MAIN_TS_TEMPLATE_PATH = path_1.default.join(exports.TEMPLATES_DIR);
exports.METADATA_XML_TEMPLATE_PATH = path_1.default.join(exports.TEMPLATES_DIR, "metadata.xml");
exports.README_MD_TEMPLATES_PATH = path_1.default.join(exports.TEMPLATES_DIR, "README.md");
// From: https://gist.github.com/doctaphred/d01d05291546186941e1b7ddc02034d3
exports.ILLEGAL_CHARACTERS_FOR_WINDOWS_FILENAMES = [
    "<",
    ">",
    ":",
    '"',
    "/",
    "\\",
    "|",
    "?",
    "*",
];
//# sourceMappingURL=constants.js.map