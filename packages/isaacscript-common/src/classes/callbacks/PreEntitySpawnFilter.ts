import type { EntityType } from "isaac-typescript-definitions";
import { ModCallback } from "isaac-typescript-definitions";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import type { FireArgs, OptionalArgs } from "../private/CustomCallback";
import { CustomCallback } from "../private/CustomCallback";

type T = ModCallbackCustom.PRE_ENTITY_SPAWN_FILTER;

export class PreEntitySpawnFilter extends CustomCallback<T> {
  constructor() {
    super();

    this.callbacksUsed = [
      // 24
      [ModCallback.PRE_ENTITY_SPAWN, this.preEntitySpawn],
    ];
  }

  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [entityType, variant, subType] = fireArgs;
    const [callbackEntityType, callbackVariant, callbackSubType] = optionalArgs;

    return (
      (callbackEntityType === undefined || callbackEntityType === entityType) &&
      (callbackVariant === undefined || callbackVariant === variant) &&
      (callbackSubType === undefined || callbackSubType === subType)
    );
  };

  // ModCallback.PRE_ENTITY_SPAWN (24)
  private readonly preEntitySpawn = (
    entityType: EntityType,
    variant: int,
    subType: int,
    position: Vector,
    velocity: Vector,
    spawner: Entity | undefined,
    initSeed: Seed,
  ) =>
    this.fire(
      entityType,
      variant,
      subType,
      position,
      velocity,
      spawner,
      initSeed,
    );
}
