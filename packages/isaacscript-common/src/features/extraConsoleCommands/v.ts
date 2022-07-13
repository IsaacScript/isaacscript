const v = {
  persistent: {
    disableCurses: false,
  },

  run: {
    chaosCardTears: false,
    spamBloodRights: false,
    maxDamage: false,
    maxSpeed: false,
    maxTears: false,
    flight: false,
  },
};
export default v;

/** The contents of the map are initialized in the "init.ts" file. */
export const extraConsoleCommandsFunctionMap = new Map<
  string,
  (params: string) => void
>();

/**
 * Most `isaacscript-common` features are turned on via invoking the `upgradeMod` function. However,
 * this feature is turned on via invoking `enableExtraConsoleCommands`, so we need a separate method
 * to track whether it is initialized.
 */
export function isExtraConsoleCommandsInitialized(): boolean {
  return extraConsoleCommandsFunctionMap.size > 0;
}
