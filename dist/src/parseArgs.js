"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = __importDefault(require("../package.json"));
function parseArgs(argv) {
    Object.keys(argv).forEach((key) => {
        switch (key) {
            case "_":
            case "$0": {
                break;
            }
            case "version": {
                console.log(package_json_1.default.version);
                process.exit(0);
                break;
            }
            default: {
                console.error(`Error: The flag of "${key}" is invalid.`);
                process.exit(1);
            }
        }
    });
}
exports.default = parseArgs;
