"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = __importDefault(require("prompts"));
async function promptSaveSlot(argv) {
    if (argv.saveSlot !== undefined) {
        // They specified the "--save-slot" command-line flag,
        // so there is no need to prompt the user for it
        return argv.saveSlot;
    }
    const response = await prompts_1.default({
        type: "number",
        name: "saveSlot",
        message: "In-game, will you test your mod on save slot 1, 2, or 3?",
        initial: 1,
    });
    if (response.saveSlot !== 1 &&
        response.saveSlot !== 2 &&
        response.saveSlot !== 3) {
        console.error("Error: You must choose a number between 1 and 3.");
        process.exit(1);
    }
    return response.saveSlot;
}
exports.default = promptSaveSlot;
//# sourceMappingURL=promptSaveSlot.js.map