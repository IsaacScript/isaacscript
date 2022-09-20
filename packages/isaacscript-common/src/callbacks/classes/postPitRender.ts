// TODO

import { ModCallback, PitVariant } from "isaac-typescript-definitions";
import { CustomCallback } from "../../classes/CustomCallback";
import { getPits } from "../../functions/gridEntitiesSpecific";

// ts-prune-ignore-next
export type PostPitRenderParameters = [
  callback: (pit: GridEntityPit) => void,
  pitVariant?: PitVariant,
];

// ts-prune-ignore-next
export class PostPitRender extends CustomCallback<PostPitRenderParameters> {
  constructor() {
    super();

    this.otherCallbacksUsed = [[ModCallback.POST_RENDER, [this.postRender]]];
  }

  override fire(pit: GridEntityPit): void {
    const pitVariant = pit.GetVariant();

    for (const [callback, callbackPitVariant] of this.subscriptions) {
      if (
        callbackPitVariant !== undefined &&
        callbackPitVariant !== pitVariant
      ) {
        continue;
      }

      callback(pit);
    }
  }

  // ModCallback.POST_RENDER (2)
  postRender = (): void => {
    for (const pit of getPits()) {
      this.fire(pit);
    }
  };
}
