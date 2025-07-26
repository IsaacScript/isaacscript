// This is the entry point for the TypeScriptToLua bundler, which is set in the "tsconfig.json"
// file. All this file does is immediately execute the "main()" function in the "main.ts" file. (We
// don't want to point the TypeScriptToLua bundler at the "main.ts" file directly, because this can
// cause bugs relating to the temporal dead zone.)

import { main } from "./main";

main();

// Do not add any code to this file! Edit the "main.ts" file instead.
