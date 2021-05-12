declare class Seeds {
  AddSeedEffect(seedEffect: SeedEffect): void;
  CanAddSeedEffect(seedEffect: SeedEffect): boolean;
  ClearSeedEffects(): void;
  ClearStartSeed(): void;
  CountSeedEffects(): int;
  static CountUnlockedSeedEffects(this: void): int;
  ForgetStageSeed(levelStage: LevelStage): void;
  GetNextSeed(): int;
  GetPlayerInitSeed(): int;
  static GetSeedEffect(this: void, str: string): SeedEffect;
  GetStageSeed(levelStage: LevelStage): int;
  GetStartSeed(): int;
  GetStartSeedString(): string;
  HasSeedEffect(seedEffect: SeedEffect): boolean;
  static InitSeedInfo(this: void): void;
  IsCustomRun(): boolean;
  IsInitialized(): boolean;
  IsSeedComboBanned(seedEffect1: SeedEffect, seedEffect2: SeedEffect): boolean;
  static IsSpecialSeed(this: void, str: string): boolean;
  static IsStringValidSeed(this: void, str: string): boolean;
  RemoveBlockingSeedEffects(seedEffect: SeedEffect): void;
  RemoveSeedEffect(seedEffect: SeedEffect): void;
  Reset(): void;
  Restart(challenge: Challenge | int): void;
  static Seed2String(this: void, seed: int): string;
  SetStartSeed(startSeed: string): void;
  static String2Seed(this: void, str: string): int;
}
