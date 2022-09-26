import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom2.POST_GRID_ENTITY_REMOVE;

export class PostGridEntityRemove extends CustomCallback<T> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_DETECTION];
  }

  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [_gridIndex, gridEntityType, variant] = fireArgs;
    const [callbackGridEntityType, callbackVariant] = optionalArgs;

    if (
      callbackGridEntityType !== undefined &&
      callbackGridEntityType !== gridEntityType
    ) {
      return false;
    }

    if (callbackVariant !== undefined && callbackVariant !== variant) {
      return false;
    }

    return true;
  }
}
