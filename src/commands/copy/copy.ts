import path from "path";
import { CUSTOM_NODE_JS_STACK_SIZE, MOD_SOURCE_PATH } from "../../constants";
import { execShell } from "../../exec";
import * as file from "../../file";
import { Config } from "../../types/Config";
import { getModTargetDirectoryName } from "../../util";

export function copy(argv: Record<string, unknown>, config: Config): void {
  const verbose = argv.verbose === true;

  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);

  compileAndCopy(MOD_SOURCE_PATH, modTargetPath, verbose);
}

export function compileAndCopy(
  modSourcePath: string,
  modTargetPath: string,
  verbose: boolean,
): void {
  compile(verbose);
  // monkeyPatchMainLua(modSourcePath);
  copyMod(modSourcePath, modTargetPath, verbose);
}

function compile(verbose: boolean) {
  execShell(
    "npx",
    [`--stack-size=${CUSTOM_NODE_JS_STACK_SIZE}`, "tstl"],
    verbose,
  );
  console.log("Mod compiled successfully.");
}

function copyMod(
  modSourcePath: string,
  modTargetPath: string,
  verbose: boolean,
) {
  if (file.exists(modTargetPath)) {
    file.deleteFileOrDirectory(modTargetPath, verbose);
  }
  file.copy(modSourcePath, modTargetPath, verbose);
  console.log("Mod copied successfully.");
}
