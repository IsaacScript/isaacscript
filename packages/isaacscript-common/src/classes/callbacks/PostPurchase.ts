import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getPickups } from "../../functions/entitiesSpecific";
import {
  defaultMapGetPlayer,
  mapSetPlayer,
} from "../../functions/playerDataStructures";
import { PlayerIndex } from "../../types/PlayerIndex";
import { DefaultMap } from "../DefaultMap";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom2.POST_PURCHASE;

export class PostPurchase extends CustomCallback<T> {
  public override v = {
    room: {
      playersHoldingItemOnLastFrameMap: new DefaultMap<PlayerIndex, boolean>(
        false,
      ),
    },
  };

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED,
        [this.postPEffectUpdateReordered],
      ],
    ];
  }

  // eslint-disable-next-line class-methods-use-this
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

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private postPEffectUpdateReordered = (player: EntityPlayer) => {
    const isHoldingItem = player.IsHoldingItem();
    const wasHoldingItemOnLastFrame = defaultMapGetPlayer(
      this.v.room.playersHoldingItemOnLastFrameMap,
      player,
    );
    mapSetPlayer(
      this.v.room.playersHoldingItemOnLastFrameMap,
      player,
      isHoldingItem,
    );

    if (!wasHoldingItemOnLastFrame && isHoldingItem) {
      this.playerPickedUpNewItem(player);
    }
  };

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
