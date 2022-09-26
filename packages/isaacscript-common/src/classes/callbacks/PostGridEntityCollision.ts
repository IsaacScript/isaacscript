import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom2.POST_GRID_ENTITY_COLLISION;

export class PostGridEntityCollision extends CustomCallback<T> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_DETECTION];
  }

  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [gridEntity, entity] = fireArgs;
    const [
      callbackGridEntityType,
      callbackGridEntityVariant,
      callbackEntityType,
      callbackEntityVariant,
    ] = optionalArgs;

    const gridEntityType = gridEntity.GetType();

    if (
      callbackGridEntityType !== undefined &&
      callbackGridEntityType !== gridEntityType
    ) {
      return false;
    }

    const gridEntityVariant = gridEntity.GetVariant();

    if (
      callbackGridEntityVariant !== undefined &&
      callbackGridEntityVariant !== gridEntityVariant
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
