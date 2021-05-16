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
        validate: (value) => value <= 0 || value >= 4
            ? "You must choose a number between 1 and 3."
            : true,
    });
    return response.saveSlot;
}
exports.default = promptSaveSlot;
//# sourceMappingURL=promptSaveSlot.js.map