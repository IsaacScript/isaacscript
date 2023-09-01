import type {
  PillColor,
  PillEffect,
  UseFlag,
} from "isaac-typescript-definitions";
import { ModCallback, PocketItemSlot } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { PocketItemType } from "../../enums/PocketItemType";
import { getPillColorFromEffect } from "../../functions/pills";
import {
  mapGetPlayer,
  mapSetPlayer,
} from "../../functions/playerDataStructures";
import { getPocketItems, pocketItemsEquals } from "../../functions/pocketItems";
import type { PocketItemDescription } from "../../interfaces/PocketItemDescription";
import type { PlayerIndex } from "../../types/PlayerIndex";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    pillColorToPillEffect: new Map<PillColor, PillEffect>(),
    playerPocketItems: new Map<PlayerIndex, PocketItemDescription[]>(),
  },
};

/**
 * The vanilla `POST_USE_PILL` callback does not pass the `PillColor` of the used pill. We can
 * resolve pill effect to pill color by using the `ItemPool.GetPillEffect` method. However, this
 * does not tell us whether the pill used was a horse pill. Thus, we must keep track of the pills
 * that the player is holding on every frame to account for this.
 *
 * In some cases, pills can be used without a corresponding pocket item slot, like in the case of
 * the reverse Temperance card. In this case, we fall back to looking up the color using the
 * `ItemPool.GetPillEffect` method.
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
  private readonly postUsePill = (
    pillEffect: PillEffect,
    player: EntityPlayer,
    useFlags: BitFlags<UseFlag>,
  ) => {
    const pillColor = this.getPillColorOfCurrentlyUsedPill(player, pillEffect);
    this.fire(pillEffect, pillColor, player, useFlags);
  };

  private getPillColorOfCurrentlyUsedPill(
    player: EntityPlayer,
    pillEffect: PillEffect,
  ): PillColor {
    // First, check to see if the pocket items have changed in some way, which indicates that a real
    // pill was used.
    const oldPocketItems = mapGetPlayer(v.run.playerPocketItems, player);
    if (oldPocketItems !== undefined) {
      const pocketItems = getPocketItems(player);
      if (!pocketItemsEquals(oldPocketItems, pocketItems)) {
        const oldPocketItemSlot1 = oldPocketItems.find(
          (pocketItem) => pocketItem.slot === PocketItemSlot.SLOT_1,
        );
        if (
          oldPocketItemSlot1 !== undefined &&
          oldPocketItemSlot1.type === PocketItemType.PILL
        ) {
          return oldPocketItemSlot1.subType;
        }
      }
    }

    // At this point, either the pocket items have not changed, or we were not able to find a pill
    // in the old pocket items. The player might be using a reverse Temperance card, so we revert to
    // assuming that a non-horse pill was used and look up the color using the
    // `ItemPool.GetPillEffect` method.
    return getPillColorFromEffect(pillEffect);
  }

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectUpdateReordered = (player: EntityPlayer) => {
    this.updateCurrentPocketItems(player);
  };

  private updateCurrentPocketItems(player: EntityPlayer) {
    const pocketItems = getPocketItems(player);
    mapSetPlayer(v.run.playerPocketItems, player, pocketItems);
  }
}
