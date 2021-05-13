declare class EntityBomb extends Entity {
  AddTearFlags(flags: BitSet128): void;
  ClearTearFlags(flags: BitSet128): void;
  HasTearFlags(flags: BitSet128): boolean;
  SetExplosionCountdown(countdown: int): void;

  ExplosionDamage: float;
  Flags: BitSet128;
  IsFetus: boolean;
  RadiusMultiplier: float;
}
