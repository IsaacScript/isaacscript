import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom.POST_GRID_ENTITY_REMOVE;

export class PostGridEntityRemove extends CustomCallback<T> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_UPDATE_DETECTION];
  }

  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [_gridIndex, gridEntityType, variant] = fireArgs;
    const [callbackGridEntityType, callbackVariant] = optionalArgs;

    return (
      (callbackGridEntityType === undefined ||
        callbackGridEntityType === gridEntityType) &&
      (callbackVariant === undefined || callbackVariant === variant)
    );
  };
}
