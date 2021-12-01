import { isLuaDebugEnabled } from "./functions/util";
import { isVector } from "./functions/vector";

declare let print: PrintFunction;

type PrintFunction = (this: void, ...args: unknown[]) => void;

let vanillaPrint: PrintFunction | null = null;

/**
 * When the "--luadebug" flag is enabled, the `print` function will no longer print messages to the
 * "log.txt" file or the in-game console. This function monkey patches the `print` function to
 * restore this functionality.
 *
 * If the "--luadebug" flag is disabled, this function will do nothing.
 */
export function patchPrintFunction() {
  // Do nothing if the function was already replaced
  if (vanillaPrint !== null) {
    return;
  }

  // Only replace the function if the "--luadebug" launch flag is enabled
  if (!isLuaDebugEnabled()) {
    return;
  }

  vanillaPrint = print;
  print = newPrint;
}

function newPrint(this: void, ...args: unknown[]) {
  const msg = getPrintMsg(args);

  // First, write it to the log.txt
  Isaac.DebugString(msg);

  // Second, write it to the console
  // (this needs to be terminated by a newline or else it won't display properly)
  const msgWithNewline = `${msg}\n`;
  Isaac.ConsoleOutput(msgWithNewline);
}

function getPrintMsg(args: unknown[]): string {
  if (args.length === 0) {
    return tostring(undefined);
  }

  let msg = "";
  for (const arg of args) {
    // Separate multiple arguments with a space
    // (a tab character appears as a circle in the console, which is unsightly)
    if (msg !== "") {
      msg += " ";
    }

    msg += getValueToPrint(arg);
  }

  return msg;
}

function getValueToPrint(arg: unknown) {
  // Provide special formatting for Vectors
  if (isVector(arg)) {
    const vector = arg as Vector;
    return `Vector(${vector.X}, ${vector.Y})`;
  }

  // By default, simply coerce the argument to a string, whatever it is
  return tostring(arg);
}
