declare namespace Options {
  let AimLockEnabled: boolean;
  let AscentVoiceOver: boolean;

  /** Whether The Void will draw from all unlocked floors, including alt path ones. */
  let BetterVoidGeneration: boolean;

  let BossHPOnBottom: boolean;
  let Brightness: number;
  let Contrast: number;
  let Exposure: number;

  /**
   * Whether the patch for the vanilla bug that causes Hush to have no attack cooldown below 50%
   * health is applied.
   */
  let HushPanicStateFix: boolean;

  /** Whether Key Master bums will raise the chance for a Devil/Angel deal when killed. */
  let KeyMasterDealChance: boolean;

  /** Whether mod updates are disabled. */
  const PreventModUpdates: boolean;

  /** Whether quick room clear is enabled. */
  let QuickRoomClear: boolean;

  /**
   * Whether the Planetarium chance HUD is being displayed.
   *
   * This option has no effect if Planetariums are not unlocked. Do not use this value to check if
   * the HUD is rendering.
   */
  let StatHUDPlanetarium: boolean;

  let TouchMode: int;
  let WindowHeight: int;
  let WindowPosX: int;
  let WindowPosY: int;
  let WindowWidth: int;

  // While REPENTOGON does expose readonly settings used for Isaac Online, they are excluded as
  // Isaac Online is disabled for mods. Therefore, their definitions are redundant.
}
