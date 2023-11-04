export type Command =
  | "monitor"
  | "init"
  | "init-ts"
  | "copy"
  | "publish"
  | "publish-ts"
  | "check"
  | "check-ts"
  | "update"
  | "nuke";

export const DEFAULT_COMMAND = "monitor";

export function isIsaacScriptModCommand(command: Command): boolean {
  return !command.endsWith("-ts") && command !== "update" && command !== "nuke";
}
