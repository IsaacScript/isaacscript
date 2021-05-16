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
const chalk_1 = __importDefault(require("chalk"));
const constants_1 = require("../common/constants");
const file = __importStar(require("../common/file"));
function checkModSubdirectory(projectPath, modsDirectory) {
    if (file.isSubDirOf(constants_1.CWD, modsDirectory)) {
        console.error(`Error: The project directory of "${chalk_1.default.green(projectPath)}" is a subdirectory of "${chalk_1.default.green(modsDirectory)}".`);
        console.error('You are supposed to have your project folder somewhere else on the system than the Isaac mods directory. (This is because we don\'t want to upload the ".git" folder or the TypeScript files to the Steam Workshop.) Exiting.');
        process.exit(1);
    }
}
exports.default = checkModSubdirectory;
//# sourceMappingURL=checkModSubdirectory.js.map