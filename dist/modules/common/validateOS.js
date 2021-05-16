"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOS = void 0;
const chalk_1 = __importDefault(require("chalk"));
function validateOS() {
    if (process.platform !== "win32") {
        console.error(`IsaacScript is only supported on ${chalk_1.default.green("Windows")}.`);
        console.error("If you use another operating system and you want to use IsaacScript, contact Zamiel and let him know.");
        console.error("(Since the program is written in TypeScript, porting to a new operating system should be easy, but is untested.)");
        process.exit(1);
    }
}
exports.validateOS = validateOS;
//# sourceMappingURL=validateOS.js.map