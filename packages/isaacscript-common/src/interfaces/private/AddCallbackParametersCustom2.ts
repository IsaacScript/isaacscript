import { PitVariant } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";

export interface AddCallbackParametersCustom2 {
  [ModCallbackCustom2.POST_PIT_RENDER]: [
    callback: (pit: GridEntityPit) => void,
    pitVariant?: PitVariant,
  ];

  [ModCallbackCustom2.POST_SPIKES_RENDER]: [
    callback: (spikes: GridEntitySpikes) => void,
    gridEntityVariant?: int,
  ];

  [ModCallbackCustom2.POST_NEW_ROOM_EARLY]: [callback: () => void];
}
