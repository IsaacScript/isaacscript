"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ILLEGAL_CHARACTERS_FOR_WINDOWS_FILENAMES = exports.VERSION_TXT_PATH = exports.METADATA_XML_PATH = exports.MAIN_LUA_SOURCE_PATH = exports.MOD_SOURCE_PATH = exports.CONSTANTS_TS_PATH = exports.PACKAGE_JSON_PATH = exports.TSCONFIG_PATH = exports.CONFIG_FILE_PATH = exports.CONFIG_FILE_NAME = exports.README_MD_TEMPLATES_PATH = exports.README_MD = exports.PACKAGE_JSON_TEMPLATE_PATH = exports.PACKAGE_JSON = exports.METADATA_XML_TEMPLATE_PATH = exports.METADATA_XML = exports.MAIN_TS_TEMPLATE_PATH = exports.MAIN_TS = exports.GITIGNORE_TEMPLATE_PATH = exports.GITIGNORE = exports.TEMPLATES_DYNAMIC_DIR = exports.TEMPLATES_VSCODE_DIR = exports.TEMPLATES_STATIC_DIR = exports.TEMPLATES_DIR = exports.WATCHER_MOD_SOURCE_PATH = exports.WATCHER_MOD_NAME = exports.REPO_ROOT = exports.WINDOWS_CODE_PAGE = exports.MOD_UPLOADER_PATH = exports.MODS_DIRECTORY_PATH = exports.DISABLE_IT_FILE = exports.MOD_DATA_PATH = exports.CWD = exports.CURRENT_DIRECTORY_NAME = exports.BASH_PROFILE_PATH = void 0;
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const cwd = process.cwd();
// https://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way
const homeDir = os_1.default.homedir();
const gamePath = path_1.default.join("C:", "Program Files (x86)", "Steam", "steamapps", "common", "The Binding of Isaac Rebirth");
// Miscellaneous
exports.BASH_PROFILE_PATH = path_1.default.join(homeDir, ".bash_profile");
exports.CURRENT_DIRECTORY_NAME = path_1.default.basename(cwd);
exports.CWD = cwd;
exports.MOD_DATA_PATH = path_1.default.join(gamePath, "data");
exports.DISABLE_IT_FILE = "disable.it";
exports.MODS_DIRECTORY_PATH = path_1.default.join(gamePath, "mods");
exports.MOD_UPLOADER_PATH = path_1.default.join(gamePath, "tools", "ModUploader", "ModUploader.exe");
exports.WINDOWS_CODE_PAGE = "65001";
// isaacscript
exports.REPO_ROOT = path_1.default.join(__dirname, "..", "..");
// isaacscript/isaacscript-watcher
exports.WATCHER_MOD_NAME = "isaacscript-watcher";
exports.WATCHER_MOD_SOURCE_PATH = path_1.default.join(exports.REPO_ROOT, exports.WATCHER_MOD_NAME);
// isaacscript/file-templates
exports.TEMPLATES_DIR = path_1.default.join(exports.REPO_ROOT, "file-templates");
// isaacscript/file-templates/static
exports.TEMPLATES_STATIC_DIR = path_1.default.join(exports.TEMPLATES_DIR, "static");
exports.TEMPLATES_VSCODE_DIR = path_1.default.join(exports.TEMPLATES_STATIC_DIR, ".vscode");
// isaacscript/file-templates/dynamic
exports.TEMPLATES_DYNAMIC_DIR = path_1.default.join(exports.TEMPLATES_DIR, "dynamic");
exports.GITIGNORE = "gitignore"; // Not named ".gitignore" to prevent NPM from deleting it
exports.GITIGNORE_TEMPLATE_PATH = path_1.default.join(exports.TEMPLATES_DYNAMIC_DIR, exports.GITIGNORE);
exports.MAIN_TS = "main.ts";
exports.MAIN_TS_TEMPLATE_PATH = path_1.default.join(exports.TEMPLATES_DYNAMIC_DIR, exports.MAIN_TS);
exports.METADATA_XML = "metadata.xml";
exports.METADATA_XML_TEMPLATE_PATH = path_1.default.join(exports.TEMPLATES_DYNAMIC_DIR, exports.METADATA_XML);
exports.PACKAGE_JSON = "package.json";
exports.PACKAGE_JSON_TEMPLATE_PATH = path_1.default.join(exports.TEMPLATES_DYNAMIC_DIR, exports.PACKAGE_JSON);
exports.README_MD = "README.md";
exports.README_MD_TEMPLATES_PATH = path_1.default.join(exports.TEMPLATES_DYNAMIC_DIR, exports.README_MD);
// project
exports.CONFIG_FILE_NAME = "isaacscript.json";
exports.CONFIG_FILE_PATH = path_1.default.join(exports.CWD, exports.CONFIG_FILE_NAME);
exports.TSCONFIG_PATH = path_1.default.join(exports.CWD, "tsconfig.json");
exports.PACKAGE_JSON_PATH = path_1.default.join(exports.CWD, "package.json");
exports.CONSTANTS_TS_PATH = path_1.default.join(exports.CWD, "src", "constants.ts");
// project/mod
exports.MOD_SOURCE_PATH = path_1.default.join(exports.CWD, "mod");
exports.MAIN_LUA_SOURCE_PATH = path_1.default.join(exports.MOD_SOURCE_PATH, "main.lua");
exports.METADATA_XML_PATH = path_1.default.join(exports.MOD_SOURCE_PATH, "metadata.xml");
exports.VERSION_TXT_PATH = path_1.default.join(exports.MOD_SOURCE_PATH, "version.txt");
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