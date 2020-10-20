declare class EntityKnife extends Entity {
  GetRenderZ(): int;
  Shoot(charge: float, range: float): void;
  IsFlying(): boolean;
  GetKnifeDistance(): float;
  GetKnifeVelocity(): float;
  SetPathFollowSpeed(speed: float): void;
  Reset(): void;

  TearFlags: int;
  Rotation: float;
  RotationOffset: float;
  Scale: float;
  MaxDistance: float;
  Charge: float;
  PathOffset: float;
  PathFollowSpeed: float;
}
