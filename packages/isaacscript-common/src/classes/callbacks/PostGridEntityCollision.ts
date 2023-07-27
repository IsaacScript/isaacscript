import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import type { FireArgs, OptionalArgs } from "../private/CustomCallback";
import { CustomCallback } from "../private/CustomCallback";

type T = ModCallbackCustom.POST_GRID_ENTITY_COLLISION;

export class PostGridEntityCollision extends CustomCallback<T> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_COLLISION_DETECTION];
  }

  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [gridEntity, entity] = fireArgs;
    const [
      callbackGridEntityType,
      callbackGridEntityVariant,
      callbackEntityType,
      callbackEntityVariant,
      callbackEntitySubType,
    ] = optionalArgs;

    const gridEntityType = gridEntity.GetType();
    const gridEntityVariant = gridEntity.GetVariant();

    return (
      (callbackGridEntityType === undefined ||
        callbackGridEntityType === gridEntityType) &&
      (callbackGridEntityVariant === undefined ||
        callbackGridEntityVariant === gridEntityVariant) &&
      (callbackEntityType === undefined ||
        callbackEntityType === entity.Type) &&
      (callbackEntityVariant === undefined ||
        callbackEntityVariant === entity.Variant) &&
      (callbackEntitySubType === undefined ||
        callbackEntitySubType === entity.SubType)
    );
  };
}
