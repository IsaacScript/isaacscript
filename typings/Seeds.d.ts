declare interface Seeds {
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
}

declare namespace Seeds {
  function CountUnlockedSeedEffects(this: void): int;
  function GetSeedEffect(this: void, str: string): SeedEffect;
  function InitSeedInfo(this: void): void;
  function IsSpecialSeed(this: void, str: string): boolean;
  function IsStringValidSeed(this: void, str: string): boolean;
  function Seed2String(this: void, seed: int): string;
  function String2Seed(this: void, str: string): int;
}
