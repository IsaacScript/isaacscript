declare class EntityKnife extends Entity {
  AddTearFlags(flags: BitSet128): void;
  ClearTearFlags(flags: BitSet128): void;
  GetKnifeDistance(): float;
  GetKnifeVelocity(): float;
  GetRenderZ(): int;
  HasTearFlags(flags: BitSet128): boolean;
  IsFlying(): boolean;
  Reset(): void;
  SetPathFollowSpeed(speed: float): void;
  Shoot(charge: float, range: float): void;

  Charge: float;
  MaxDistance: float;
  PathFollowSpeed: float;
  PathOffset: float;
  Rotation: float;
  RotationOffset: float;
  Scale: float;
  TearFlags: BitSet128;
}
