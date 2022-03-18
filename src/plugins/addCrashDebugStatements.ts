import * as crypto from "crypto";
import { SourceNode } from "source-map";
import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

class CustomPrinter extends tstl.LuaPrinter {
  printStatement(statement: tstl.Statement): SourceNode {
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

// ts-prune-ignore-next
export default plugin;
