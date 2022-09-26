import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_REMOVE;

export class PostGridEntityCustomRemove extends CustomCallback<T> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_DETECTION];
  }

  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackGridEntityTypeCustom] = optionalArgs;

    if (callbackGridEntityTypeCustom === undefined) {
      return true;
    }

    const [_gridIndex, gridEntityTypeCustom] = fireArgs;
    return gridEntityTypeCustom === callbackGridEntityTypeCustom;
  }
}
