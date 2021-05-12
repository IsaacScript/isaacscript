declare class EntityBomb extends Entity {
  SetExplosionCountdown(countdown: int): void;

  ExplosionDamage: float;
  Flags: TearFlags;
  IsFetus: boolean;
  RadiusMultiplier: float;
}
