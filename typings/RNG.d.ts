/** @noSelf */
declare function RNG(): RNG;

declare class RNG {
  GetSeed(): int;
  SetSeed(seed: int, shiftIdx: int): void;
  RandomInt(max: int): int;
  RandomFloat(): float;
  Next(): int;
}
