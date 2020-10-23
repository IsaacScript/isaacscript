declare class Seeds {
  SetStartSeed(startSeed: string): void;
  ClearStartSeed(): void;
  IsCustomRun(): boolean;
  Restart(challenge: Challenge | int): void;
  Reset(): void;
  IsInitialized(): boolean;
  GetStartSeed(): int;
  GetStartSeedString(): string;
  GetNextSeed(): int;
  GetStageSeed(levelStage: LevelStage): int;
  GetPlayerInitSeed(): int;
  ForgetStageSeed(levelStage: LevelStage): void;
  HasSeedEffect(seedEffect: SeedEffect): boolean;
  AddSeedEffect(seedEffect: SeedEffect): void;
  RemoveSeedEffect(seedEffect: SeedEffect): void;
  RemoveBlockingSeedEffects(seedEffect: SeedEffect): void;
  ClearSeedEffects(): void;
  CanAddSeedEffect(seedEffect: SeedEffect): boolean;
  CountSeedEffects(): int;
  IsSeedComboBanned(seedEffect1: SeedEffect, seedEffect2: SeedEffect): boolean;

  /** @noSelf */
  static String2Seed(str: string): int;
  /** @noSelf */
  static Seed2String(seed: int): string;
  /** @noSelf */
  static IsStringValidSeed(str: string): boolean;
  /** @noSelf */
  static GetSeedEffect(str: string): SeedEffect;
  /** @noSelf */
  static IsSpecialSeed(str: string): boolean;
  /** @noSelf */
  static InitSeedInfo(): void;
  /** @noSelf */
  static CountUnlockedSeedEffects(): int;
}
