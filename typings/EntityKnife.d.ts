declare class EntityKnife extends Entity {
  GetKnifeDistance(): float;
  GetKnifeVelocity(): float;
  GetRenderZ(): int;
  IsFlying(): boolean;
  Reset(): void;
  SetPathFollowSpeed(speed: float): void;
  Shoot(charge: float, range: float): void;

  Charge: float;
  // IsFlying: boolean; // Should use IsFlying() instead
  MaxDistance: float;
  PathFollowSpeed: float;
  PathOffset: float;
  Rotation: float;
  RotationOffset: float;
  Scale: float;
  TearFlags: TearFlags;
}
