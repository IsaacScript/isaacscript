import { ISCFeature } from "../../enums/ISCFeature";
import type { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import type { FireArgs, OptionalArgs } from "../private/CustomCallback";
import { CustomCallback } from "../private/CustomCallback";

type T = ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_REMOVE;

export class PostGridEntityCustomRemove extends CustomCallback<T> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_UPDATE_DETECTION];
  }

  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [_gridIndex, gridEntityTypeCustom] = fireArgs;
    const [callbackGridEntityTypeCustom] = optionalArgs;

    return (
      callbackGridEntityTypeCustom === undefined ||
      callbackGridEntityTypeCustom === gridEntityTypeCustom
    );
  };
}
