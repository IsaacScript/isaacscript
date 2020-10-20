declare class EntityBomb extends Entity {
  SetExplosionCountdown(countdown: int): void;

  Flags: TearFlags;
  IsFetus: boolean;
  ExplosionDamage: float;
  RadiusMultiplier: float;
}
