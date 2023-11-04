import type {
  CardType,
  CollectibleType,
  PillEffect,
} from "isaac-typescript-definitions";
import { ModCallback } from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPickups } from "../../functions/entitiesSpecific";
import {
  defaultMapGetPlayer,
  mapSetPlayer,
} from "../../functions/playerDataStructures";
import type { PlayerIndex } from "../../types/PlayerIndex";
import { DefaultMap } from "../DefaultMap";
import type { FireArgs, OptionalArgs } from "../private/CustomCallback";
import { CustomCallback } from "../private/CustomCallback";

type T = ModCallbackCustom.POST_PURCHASE;

const v = {
  room: {
    playersHoldingItemOnLastFrameMap: new DefaultMap<PlayerIndex, boolean>(
      false,
    ),
    playersUsedItemOnFrame: new DefaultMap<PlayerIndex, int>(0),
  },
};

export class PostPurchase extends CustomCallback<T> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 3
      [ModCallback.POST_USE_ITEM, this.postUseItem],

      // 5
      [ModCallback.POST_USE_CARD, this.postUseCard],

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

  protected override shouldFire = (
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean => {
    const [_player, pickup] = fireArgs;
    const [callbackPickupVariant, callbackPickupSubType] = optionalArgs;

    return (
      (callbackPickupVariant === undefined ||
        callbackPickupVariant === pickup.Variant) &&
      (callbackPickupSubType === undefined ||
        callbackPickupSubType === pickup.SubType)
    );
  };

  // ModCallback.POST_USE_ITEM (3)
  private readonly postUseItem = (
    _collectibleType: CollectibleType,
    _rng: RNG,
    player: EntityPlayer,
  ): boolean | undefined => {
    markUsedItemOnThisFrame(player);
    return undefined;
  };

  // ModCallback.POST_USE_CARD (5)
  private readonly postUseCard = (
    _cardType: CardType,
    player: EntityPlayer,
  ) => {
    markUsedItemOnThisFrame(player);
    return undefined;
  };

  // ModCallback.POST_USE_PILL (10)
  private readonly postUsePill = (
    _pillEffect: PillEffect,
    player: EntityPlayer,
  ) => {
    markUsedItemOnThisFrame(player);
    return undefined;
  };

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectUpdateReordered = (player: EntityPlayer) => {
    const isHoldingItem = player.IsHoldingItem();
    const wasHoldingItemOnLastFrame = defaultMapGetPlayer(
      v.room.playersHoldingItemOnLastFrameMap,
      player,
    );
    mapSetPlayer(
      v.room.playersHoldingItemOnLastFrameMap,
      player,
      isHoldingItem,
    );

    // Assume that if the player did not use an active item, card, or pill recently, then they
    // purchased an item.
    if (
      !wasHoldingItemOnLastFrame &&
      isHoldingItem &&
      !this.playerUsedItemRecently(player)
    ) {
      this.playerPickedUpNewItem(player);
    }
  };

  private playerUsedItemRecently(player: EntityPlayer): boolean {
    const gameFrameCount = game.GetFrameCount();
    const usedCollectibleOnFrame = defaultMapGetPlayer(
      v.room.playersUsedItemOnFrame,
      player,
    );
    return (
      gameFrameCount === usedCollectibleOnFrame ||
      gameFrameCount === usedCollectibleOnFrame + 1
    );
  }

  private playerPickedUpNewItem(player: EntityPlayer) {
    const pickups = getPickups();
    const disappearingPickup = pickups.find(
      (pickup) => !pickup.Exists() && pickup.Price !== 0,
    );
    if (disappearingPickup !== undefined) {
      this.fire(player, disappearingPickup);
    }
  }
}

function markUsedItemOnThisFrame(player: EntityPlayer) {
  const gameFrameCount = game.GetFrameCount();
  mapSetPlayer(v.room.playersUsedItemOnFrame, player, gameFrameCount);
}
