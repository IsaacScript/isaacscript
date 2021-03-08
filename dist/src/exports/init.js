"use strict";
// This file provides a shared initialization function for IsaacScript projects
Object.defineProperty(exports, "__esModule", { value: true });
function init() {
    overwriteError();
}
exports.default = init;
function overwriteError() {
    // Backup the vanilla Lua error function (if it has not been backed up already)
    if (___LUA_ERROR_BACKUP === undefined) {
        ___LUA_ERROR_BACKUP = error;
    }
    // Replace Lua's error function with something that actually displays the output
    error = isaacScriptError;
}
/** @noSelf */ function isaacScriptError(err, _level) {
    if (err === "") {
        Isaac.DebugString("Lua error (with a blank error message)");
    }
    else {
        Isaac.DebugString(`Lua error: ${err}`);
    }
    // If the end-user does not have the "--luadebug" flag turned on in the Steam launch options,
    // the debug library will be equal to nil
    if (debug !== undefined) {
        const tracebackLines = debug.traceback().split("\n");
        for (let i = 0; i < tracebackLines.length; i++) {
            // The first line is always "stack traceback:"
            // The second line is always this line, e.g. "in function 'error'", which is not useful
            if (i === 0 || i === 1) {
                continue;
            }
            const line = tracebackLines[i];
            Isaac.DebugString(line);
        }
    }
    // Call the real Lua "error" function, which will prevent this function from returning
    // (and the subsequent code from executing)
    ___LUA_ERROR_BACKUP("");
}
