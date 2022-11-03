import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_COLLISION;

export class PostGridEntityCustomCollision extends CustomCallback<T> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_COLLISION_DETECTION];
  }

  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [_gridEntity, gridEntityTypeCustom, entity] = fireArgs;
    const [
      callbackGridEntityTypeCustom,
      callbackEntityType,
      callbackEntityVariant,
      callbackEntitySubType,
    ] = optionalArgs;

    return (
      (callbackGridEntityTypeCustom === undefined ||
        callbackGridEntityTypeCustom === gridEntityTypeCustom) &&
      (callbackEntityType === undefined ||
        callbackEntityType === entity.Type) &&
      (callbackEntityVariant === undefined ||
        callbackEntityVariant === entity.Variant) &&
      (callbackEntitySubType === undefined ||
        callbackEntitySubType === entity.SubType)
    );
  };
}
