declare class Seeds {
  AddSeedEffect(seedEffect: SeedEffect): void;
  CanAddSeedEffect(seedEffect: SeedEffect): boolean;
  ClearSeedEffects(): void;
  ClearStartSeed(): void;
  CountSeedEffects(): int;
  ForgetStageSeed(levelStage: LevelStage): void;
  GetNextSeed(): int;
  GetPlayerInitSeed(): int;
  GetStageSeed(levelStage: LevelStage): int;
  GetStartSeed(): int;
  GetStartSeedString(): string;
  HasSeedEffect(seedEffect: SeedEffect): boolean;
  IsCustomRun(): boolean;
  IsInitialized(): boolean;
  IsSeedComboBanned(seedEffect1: SeedEffect, seedEffect2: SeedEffect): boolean;
  RemoveBlockingSeedEffects(seedEffect: SeedEffect): void;
  RemoveSeedEffect(seedEffect: SeedEffect): void;
  Reset(): void;
  Restart(challenge: Challenge | int): void;
  SetStartSeed(startSeed: string): void;

  static CountUnlockedSeedEffects(this: void): int;
  static GetSeedEffect(this: void, str: string): SeedEffect;
  static InitSeedInfo(this: void): void;
  static IsSpecialSeed(this: void, str: string): boolean;
  static IsStringValidSeed(this: void, str: string): boolean;
  static Seed2String(this: void, seed: int): string;
  static String2Seed(this: void, str: string): int;
}
