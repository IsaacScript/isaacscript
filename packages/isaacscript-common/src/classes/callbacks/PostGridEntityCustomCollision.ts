import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_COLLISION;

export class PostGridEntityCustomCollision extends CustomCallback<T> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_UPDATE_DETECTION];
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
