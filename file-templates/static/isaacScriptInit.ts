// This file provides a shared initialization function for IsaacScript projects

export default function isaacScriptInit(): void {
  // In IsaacScript mods, the vanilla Lua error function will not display the output correctly due
  // to the nature of how all of the Lua is bundled together into a single file
  // Replace the vanilla function with something that displays the output to both the "log.txt" and
  // the console
  overwriteError();
}

declare let ___LUA_ERROR_BACKUP: ( // eslint-disable-line
  this: void,
  message: string,
  level?: number | undefined,
) => void;
declare let error: (
  this: void,
  message: string,
  level?: number | undefined,
) => void;

function overwriteError() {
  // Backup the vanilla Lua error function (if it has not been backed up already)
  if (___LUA_ERROR_BACKUP === undefined) {
    ___LUA_ERROR_BACKUP = error;
  }

  // Replace Lua's vanilla error function
  error = isaacScriptError;
}

function isaacScriptError(
  this: void,
  err: string,
  _level?: number | undefined,
) {
  let msg: string;
  if (err === undefined || err === "") {
    msg = "Lua error (with a blank error message)";
  } else {
    msg = `Lua error: ${err}`;
  }
  Isaac.DebugString(msg);
  Isaac.ConsoleOutput(msg);

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
  ___LUA_ERROR_BACKUP("(See above error messages.)");
}
