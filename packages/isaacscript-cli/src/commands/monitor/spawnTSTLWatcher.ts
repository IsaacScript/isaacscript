import type { PackageManager } from "isaacscript-common-node";
import {
  appendFile,
  fatalError,
  getPackageManagerExecCommand,
  isFile,
} from "isaacscript-common-node";
import { spawn } from "node:child_process";
import path from "node:path";
import type { Config } from "../../classes/Config.js";
import {
  COMPILATION_SUCCESSFUL_MESSAGE,
  PROJECT_NAME,
} from "../../constants.js";
import { notifyGameMsg } from "./notifyGame.js";

let compilationStartTime = new Date();

export function spawnTSTLWatcher(
  config: Config,
  cwd: string,
  packageManager: PackageManager,
  modCWD?: string,
): void {
  const processDescription = "tstl";
  const command = getPackageManagerExecCommand(packageManager);
  const tstl = spawn(command, ["tstl", "--watch", "--preserveWatchOutput"], {
    shell: true,
    cwd,
  });

  tstl.stdout.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    const suffix = getMonitorMessageSuffix(config, cwd);

    if (msg.includes("Starting compilation in watch mode...")) {
      const newMsg1 = `${PROJECT_NAME} is now watching for future changes${suffix}.`;
      notifyGameMsg(newMsg1);
      const target = suffix.includes("isaacscript-common")
        ? '"isaacscript-common"'
        : "the mod";
      const newMsg2 = `Compiling ${target} for the first time...`;
      notifyGameMsg(newMsg2);
    } else if (
      msg.includes("File change detected. Starting incremental compilation...")
    ) {
      compilationStartTime = new Date();
      const newMsg = `TypeScript change detected${suffix}. Compiling...`;
      notifyGameMsg(newMsg);
    } else if (msg.includes("Found 0 errors. Watching for file changes.")) {
      const compilationFinishTime = new Date();
      const elapsedTimeMilliseconds =
        compilationFinishTime.getTime() - compilationStartTime.getTime();
      const elapsedTimeSeconds = elapsedTimeMilliseconds / 1000;
      const newMsg = `${COMPILATION_SUCCESSFUL_MESSAGE} (in ${elapsedTimeSeconds} seconds)${suffix}`;
      notifyGameMsg(newMsg);

      // Successful compilation of "isaacscript-common" will not trigger a recompilation in the mod.
      // Thus, we must arbitrarily change a file to trigger a mod recompilation.
      if (modCWD !== undefined) {
        const bundleEntryTSPath = path.join(modCWD, "src", "bundleEntry.ts");
        if (isFile(bundleEntryTSPath)) {
          appendFile(
            bundleEntryTSPath,
            "// isaacscript-common dev forced recompilation\n",
          );
        }
      }
    } else {
      notifyGameMsg(msg);
    }
  });

  tstl.stderr.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    if (msg === "^C") {
      // Hide the line that appears when you cancel the program with `Ctrl + c`.
      return;
    }
    notifyGameMsg(`Error: ${msg}`);
  });

  tstl.on("close", (code) => {
    fatalError(
      `Error: ${processDescription} subprocess exited with code: ${code}`,
    );
  });

  tstl.on("exit", (code) => {
    fatalError(
      `Error: ${processDescription} subprocess exited with code: ${code}`,
    );
  });
}

function getMonitorMessageSuffix(config: Config, cwd: string): string {
  if (
    config.isaacScriptCommonDev === false ||
    config.isaacScriptCommonDev === undefined
  ) {
    return "";
  }

  const baseName = path.basename(cwd);
  return baseName === "isaacscript-common"
    ? ' (in "isaacscript-common")'
    : " (in this mod)";
}
