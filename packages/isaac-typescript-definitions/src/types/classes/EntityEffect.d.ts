import type { EffectVariant } from "../../enums/collections/variants";
import type { EntityType } from "../../enums/EntityType";

declare global {
  interface EntityEffect extends Entity {
    readonly FollowParent: (parent: Entity) => void;
    readonly SetDamageSource: (entityType: EntityType) => void;
    readonly SetRadii: (min: float, max: float) => void;
    readonly SetTimeout: (timeout: int) => void;

    DamageSource: EntityType;
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
    Variant: EffectVariant;
    m_Height: float;
  }

  /** @noSelf */
  namespace EntityEffect {
    function IsPlayerCreep(variant: int): boolean;
  }
}
