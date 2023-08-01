/**
 * When you write code that causes the game to crash, it can be difficult to find the exact line of
 * code that is causing the crash.
 *
 * In these situations, you can enable this plugin, which will add a log statement in between every
 * line of Lua code with a randomly-generated UUID. That way, you can cause the crash, and then look
 * at the bottom of the "log.txt" for the final UUID that shows up.
 *
 * Next, you can Ctrl + f in the "main.lua" file for the matching UUID, which will bring you to the
 * exact point in the code where the crash happened.
 */

import crypto from "node:crypto";
import type { SourceNode } from "source-map";
import type * as ts from "typescript";
import * as tstl from "typescript-to-lua";

class CustomPrinter extends tstl.LuaPrinter {
  override printStatement(statement: tstl.Statement): SourceNode {
    const uuid = crypto.randomUUID();
    const debugLineToInsert = `Isaac.DebugString("CRASH DEBUG ${uuid}")\n`;
    const originalResult = super.printStatement(statement);
    return this.createSourceNode(statement, [
      debugLineToInsert,
      originalResult,
    ]);
  }
}

const plugin: tstl.Plugin = {
  printer: (
    program: ts.Program,
    emitHost: tstl.EmitHost,
    fileName: string,
    file: tstl.File,
  ) => new CustomPrinter(emitHost, program, fileName).print(file),
};

export default plugin;
