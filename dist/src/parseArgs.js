"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
function parseArgs() {
    const argv = yargs_1.default(process.argv.slice(2))
        .alias("h", "help") // By default, only "--help" is enabled
        .alias("v", "version") // By default, only "--version" is enabled
        .boolean("copy")
        .alias("c", "copy")
        .describe("c", "compile & copy the mod, then exit").argv;
    // TODO: How do I make it exit if a user passes an invalid flag?
    // https://stackoverflow.com/questions/66535902/how-do-i-make-yargs-exit-if-it-is-passed-an-invalid-flag
    return argv.copy ?? false;
}
exports.default = parseArgs;
