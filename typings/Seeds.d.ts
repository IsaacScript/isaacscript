declare interface Seeds {
  AddSeedEffect(seedEffect: SeedEffect): void;
  CanAddSeedEffect(seedEffect: SeedEffect): boolean;
  ClearSeedEffects(): void;
  ClearStartSeed(): void;
  CountSeedEffects(): int;
  ForgetStageSeed(levelStage: LevelStage): void;
  GetNextSeed(): Seed;
  GetPlayerInitSeed(): Seed;
  GetStageSeed(levelStage: LevelStage): Seed;

  /**
   * The "start seed" is a number between 1 and (2^32 - 1) that is used to generate the random
   * elements for the current run. The seed displayed in the pause menu is this number represented
   * in string form.
   *
   * This method will return 0 if it is invoked in the main menu.
   */
  GetStartSeed(): Seed;

  /**
   * The "start seed" is a number between 1 and (2^32 - 1) that is used to generate the random
   * elements for the current run. When converted to a string, it looks like "ABCD EFGH". (This is
   * the form that is displayed on the pause menu.)
   *
   * This method will return "B911 99JA" if it is invoked in the main menu.
   */
  GetStartSeedString(): string;

  HasSeedEffect(seedEffect: SeedEffect): boolean;

  /** Returns true if the player is in a challenge run or a seeded run. */
  IsCustomRun(): boolean;

  IsInitialized(): boolean;
  IsSeedComboBanned(seedEffect1: SeedEffect, seedEffect2: SeedEffect): boolean;

  /** Removes seed effects that are banned in conjunction with the given seed. */
  RemoveBlockingSeedEffects(seedEffect: SeedEffect): void;

  RemoveSeedEffect(seedEffect: SeedEffect): void;

  /** Removes all seed effects. Only takes effect when the run is restarted. */
  Reset(): void;

  /** Re-selects a random start seed, but only if the start seed was not custom. */
  Restart(challenge: Challenge | int): void;

  /** Passing an empty string will cause the game to pick a new random seed. */
  SetStartSeed(startSeed: string): void;
}

declare namespace Seeds {
  function CountUnlockedSeedEffects(this: void): int;
  function GetSeedEffect(this: void, str: string): SeedEffect;
  function InitSeedInfo(this: void): void;
  function IsSpecialSeed(this: void, str: string): boolean;
  function IsStringValidSeed(this: void, str: string): boolean;

  /**
   * Converts a numerical seed into the format used in the in-game pause menu. For example, converts
   * 0 to "B911 99JA".
   */
  function Seed2String(this: void, seed: int): string;

  /** Converts a seed string into a number. For example, converts "B911 99JA" to 0. */
  function String2Seed(this: void, str: string): int;
}
