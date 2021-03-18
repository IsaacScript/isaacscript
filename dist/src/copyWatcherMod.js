"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const file = __importStar(require("./file"));
function copyWatcherMod(config) {
    // Check to see if this mod was disabled
    const watcherModPath = path_1.default.join(config.modTargetPath, "..", constants_1.WATCHER_MOD_NAME);
    const disableItPath = path_1.default.join(watcherModPath, constants_1.DISABLE_IT_FILE);
    const watcherModDisabled = file.exists(disableItPath);
    // Delete and re-copy the watcher mod every time IsaacScript starts
    // This ensures that it is always the latest version
    if (file.exists(watcherModPath)) {
        file.deleteDir(watcherModPath);
    }
    file.copy(constants_1.WATCHER_MOD_SOURCE_PATH, watcherModPath);
    if (watcherModDisabled) {
        // Since we deleted the directory, the "disable.it" file was deleted
        // Restore it
        file.write(disableItPath, "");
    }
    // If we copied a new version of the watcher mod into place,
    // but the user currently has the game open, then the old version will stay loaded
    // However, if the watcher mod reloads itself, the game will crash,
    // so there is no automated solution for this
}
exports.default = copyWatcherMod;
