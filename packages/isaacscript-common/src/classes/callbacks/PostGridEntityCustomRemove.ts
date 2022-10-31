import { ISCFeature } from "../../enums/ISCFeature";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_REMOVE;

export class PostGridEntityCustomRemove extends CustomCallback<T> {
  constructor() {
    super();

    this.featuresUsed = [ISCFeature.GRID_ENTITY_UPDATE_DETECTION];
  }

  // eslint-disable-next-line class-methods-use-this
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
