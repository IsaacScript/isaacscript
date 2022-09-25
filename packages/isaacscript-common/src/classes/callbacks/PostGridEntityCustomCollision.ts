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

    this.featuresUsed = [ISCFeature.GRID_ENTITY_DETECTION];
  }

  // eslint-disable-next-line class-methods-use-this
  override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [_gridEntity, gridEntityTypeCustom, entity] = fireArgs;
    const [
      callbackGridEntityTypeCustom,
      callbackEntityType,
      callbackEntityVariant,
    ] = optionalArgs;

    if (
      callbackGridEntityTypeCustom !== undefined &&
      callbackGridEntityTypeCustom !== gridEntityTypeCustom
    ) {
      return false;
    }

    if (
      callbackEntityType !== undefined &&
      callbackEntityType !== entity.Type
    ) {
      return false;
    }

    if (
      callbackEntityVariant !== undefined &&
      callbackEntityVariant !== entity.Variant
    ) {
      return false;
    }

    return true;
  }
}
