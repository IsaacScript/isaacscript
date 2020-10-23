declare class EntityEffect extends Entity {
  SetTimeout(timeout: int): void;
  FollowParent(parent: Entity): void;
  SetDamageSource(entityType: EntityType | int): void;
  SetRadii(min: float, max: float): void;

  /** @noSelf */
  static IsPlayerCreep(variant: EntityVariantForAC): boolean;

  Rotation: float;
  Scale: float;
  FallingSpeed: float;
  FallingAcceleration: float;
  m_Height: float;
  State: int;
  MinRadius: float;
  MaxRadius: float;
  Timeout: int;
  LifeSpan: int;
  IsFollowing: boolean;
  ParentOffset: Vector;
  DamageSource: EntityType | int;
}
