// This is the entry point for the TypeScriptToLua bundler, which is set in the "tsconfig.json" file
// All this file does is immediately execute the "main()" function in the "main.ts" file
// (We don't want to point the TypeScriptToLua bundler at the "main.ts" file directly, because any
// variables or functions that are declared in a bundle entry point will become global)

import { main } from "./main";

main();

// Do not add any code to this file!
