"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WINDOWS_CODE_PAGE = exports.REPO_ROOT = exports.MODS_DIRECTORY_PATH = exports.CWD = exports.CURRENT_DIRECTORY_NAME = exports.CONFIG_FILE_NAME = exports.BASH_PROFILE_PATH = void 0;
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const cwd = process.cwd();
// https://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way
const homeDir = os_1.default.homedir();
exports.BASH_PROFILE_PATH = path_1.default.join(homeDir, ".bash_profile");
exports.CONFIG_FILE_NAME = "isaacscript.json";
exports.CURRENT_DIRECTORY_NAME = path_1.default.basename(cwd);
exports.CWD = cwd;
exports.MODS_DIRECTORY_PATH = path_1.default.join("C:", "Program Files (x86)", "Steam", "steamapps", "common", "The Binding of Isaac Rebirth", "mods");
exports.REPO_ROOT = path_1.default.join(__dirname, "..", "..");
exports.WINDOWS_CODE_PAGE = "65001";
//# sourceMappingURL=constants.js.map