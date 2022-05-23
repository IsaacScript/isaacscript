/** This plugin adds an explanatory header to the top of the generated Lua code. */

import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

const INFORMATIONAL_HEADER = `--[[

This Isaac mod was created with the IsaacScript tool.

The Lua code in this file is not actually the source code for the program. Rather, it was
automatically generated from higher-level TypeScript code, and might be hard to read. If you want to
understand how the code in this mod works, you should read the actual TypeScript source code
directly instead of trying to read this file. Usually, the link to the source code can be found in
the mod's description on the Steam Workshop. If not, you can ask the mod author directly if the
source code is publicly available.

IsaacScript provides a lot of advantages over using raw Lua. For more information about the tool,
see the official website: https://isaacscript.github.io/

--]]

`;

const plugin: tstl.Plugin = {
  beforeEmit(
    _program: ts.Program,
    _options: tstl.CompilerOptions,
    _emitHost: tstl.EmitHost,
    result: tstl.EmitFile[],
  ) {
    for (const file of result) {
      file.code = `${INFORMATIONAL_HEADER}${file.code}`;
    }
  },
};

export default plugin;
