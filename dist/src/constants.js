"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WINDOWS_CODE_PAGE = exports.README_MD_TEMPLATES_PATH = exports.METADATA_XML_TEMPLATE_PATH = exports.MAIN_TS_TEMPLATE_PATH = exports.PACKAGE_JSON_TEMPLATE_PATH = exports.VSCODE_DIR_TEMPLATE_PATH = exports.TEMPLATES_DIR_STATIC = exports.TEMPLATES_DIR = exports.WATCHER_MOD_SOURCE_PATH = exports.WATCHER_MOD_NAME = exports.MAIN_TS_PATH = exports.TS_SOURCE_PATH = exports.METADATA_XML_SOURCE_PATH = exports.MAIN_LUA_SOURCE_PATH = exports.MOD_SOURCE_PATH = exports.NODE_MODULES_PATH = exports.VSCODE_DIR_PATH = exports.README_MD_PATH = exports.TSCONFIG_PATH = exports.PACKAGE_JSON_PATH = exports.CONFIG_FILE_PATH = exports.CONFIG_FILE_NAME = exports.PROJECT_NAME = exports.CWD = exports.MOD_DIRECTORY_PATH = exports.BASH_PROFILE_PATH = void 0;
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
// https://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way
const homeDir = os_1.default.homedir();
// Constants based on homeDir
exports.BASH_PROFILE_PATH = path_1.default.join(homeDir, ".bash_profile");
exports.MOD_DIRECTORY_PATH = path_1.default.join(homeDir, "Documents", "My Games", "Binding of Isaac Afterbirth+ Mods");
// Constants based on CWD
exports.CWD = process.cwd();
exports.PROJECT_NAME = path_1.default.basename(exports.CWD);
exports.CONFIG_FILE_NAME = "isaacscript.json";
exports.CONFIG_FILE_PATH = path_1.default.join(exports.CWD, exports.CONFIG_FILE_NAME);
exports.PACKAGE_JSON_PATH = path_1.default.join(exports.CWD, "package.json");
exports.TSCONFIG_PATH = path_1.default.join(exports.CWD, "tsconfig.json");
exports.README_MD_PATH = path_1.default.join(exports.CWD, "README.md");
exports.VSCODE_DIR_PATH = path_1.default.join(exports.CWD, ".vscode");
exports.NODE_MODULES_PATH = path_1.default.join(exports.CWD, "node_modules");
// project/mod
exports.MOD_SOURCE_PATH = path_1.default.join(exports.CWD, "mod");
exports.MAIN_LUA_SOURCE_PATH = path_1.default.join(exports.MOD_SOURCE_PATH, "main.lua");
exports.METADATA_XML_SOURCE_PATH = path_1.default.join(exports.MOD_SOURCE_PATH, "metadata.xml");
// project/src
exports.TS_SOURCE_PATH = path_1.default.join(exports.CWD, "src");
exports.MAIN_TS_PATH = path_1.default.join(exports.TS_SOURCE_PATH, "main.ts");
// Constants based on __dirname
const REPO_ROOT = path_1.default.join(__dirname, "..", "..");
exports.WATCHER_MOD_NAME = "isaacscript-watcher";
exports.WATCHER_MOD_SOURCE_PATH = path_1.default.join(REPO_ROOT, exports.WATCHER_MOD_NAME);
// repo/templates
exports.TEMPLATES_DIR = path_1.default.join(REPO_ROOT, "templates");
exports.TEMPLATES_DIR_STATIC = path_1.default.join(exports.TEMPLATES_DIR, "static");
exports.VSCODE_DIR_TEMPLATE_PATH = path_1.default.join(exports.TEMPLATES_DIR, ".vscode");
exports.PACKAGE_JSON_TEMPLATE_PATH = path_1.default.join(exports.TEMPLATES_DIR, "package.json");
exports.MAIN_TS_TEMPLATE_PATH = path_1.default.join(exports.TEMPLATES_DIR, "main.ts");
exports.METADATA_XML_TEMPLATE_PATH = path_1.default.join(exports.TEMPLATES_DIR, "metadata.xml");
exports.README_MD_TEMPLATES_PATH = path_1.default.join(exports.TEMPLATES_DIR, "README.md");
// Other constants
exports.WINDOWS_CODE_PAGE = "65001";
