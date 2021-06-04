declare class EntityEffect extends Entity {
  FollowParent(parent: Entity): void;
  SetDamageSource(entityType: EntityType | int): void;
  SetRadii(min: float, max: float): void;
  SetTimeout(timeout: int): void;

  DamageSource: EntityType | int;
  FallingAcceleration: float;
  FallingSpeed: float;
  IsFollowing: boolean;
  LifeSpan: int;
  MaxRadius: float;
  MinRadius: float;
  ParentOffset: Vector;
  Rotation: float;
  Scale: float;
  State: int;
  Timeout: int;
  m_Height: float;

  static IsPlayerCreep(this: void, variant: EntityVariantForAC): boolean;
}
