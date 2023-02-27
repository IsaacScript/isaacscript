import {
  ModCallback,
  PillColor,
  PillEffect,
  UseFlag,
} from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import {
  mapDeletePlayer,
  mapGetPlayer,
  mapSetPlayer,
} from "../../functions/playerDataStructures";
import { getFirstPill } from "../../functions/pocketItems";
import { PocketItemDescription } from "../../interfaces/PocketItemDescription";
import { PlayerIndex } from "../../types/PlayerIndex";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    playerFirstPill: new Map<PlayerIndex, PocketItemDescription>(),
  },
};

/**
 * The vanilla `POST_USE_PILL` callback does not pass the `PillColor` of the used pill. Thus, we
 * must keep track of the pills that the player is holding on every frame.
 */
export class PostUsePillFilter extends CustomCallback<ModCallbackCustom.POST_USE_PILL_FILTER> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 10
      [ModCallback.POST_USE_PILL, this.postUsePill],
    ];

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectUpdateReordered,
      ],
    ];
  }

  // ModCallback.POST_USE_PILL (10)
  private postUsePill = (
    pillEffect: PillEffect,
    player: EntityPlayer,
    useFlags: BitFlags<UseFlag>,
  ) => {
    const firstPill = mapGetPlayer(v.run.playerFirstPill, player);
    const pillColor =
      firstPill === undefined
        ? PillColor.NULL
        : (firstPill.subType as PillColor);

    this.fire(pillEffect, pillColor, player, useFlags);
  };

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private postPEffectUpdateReordered = (player: EntityPlayer) => {
    this.updateCurrentHeldPills(player);
  };

  private updateCurrentHeldPills(player: EntityPlayer) {
    const firstPill = getFirstPill(player);
    if (firstPill === undefined) {
      mapDeletePlayer(v.run.playerFirstPill, player);
    } else {
      mapSetPlayer(v.run.playerFirstPill, player, firstPill);
    }
  }
}
