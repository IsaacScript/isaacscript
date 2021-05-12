declare function RNG(this: void): RNG;

declare class RNG {
  GetSeed(): int;
  Next(): int;
  RandomFloat(): float;
  RandomInt(max: int): int;
  SetSeed(seed: int, shiftIdx: int): void;
}
