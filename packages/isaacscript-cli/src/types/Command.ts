export type Command =
  | "monitor"
  | "init"
  | "init-ts"
  | "copy"
  | "publish"
  | "publish-ts"
  | "check"
  | "check-ts"
  | "check-cspell";

export const DEFAULT_COMMAND = "monitor";

export function isIsaacScriptModCommand(command: Command): boolean {
  return !command.endsWith("-ts") && command !== "check-cspell";
}
