import type { DamageFlag } from "isaac-typescript-definitions";
import {
  EntityType,
  PickupVariant,
  TrinketType,
} from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { defaultMapGetPlayer } from "../../functions/playerDataStructures";
import { shouldFireTrinketType } from "../../shouldFire";
import type { PlayerIndex } from "../../types/PlayerIndex";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

const TRINKETS_THAT_CAN_BREAK = [
  TrinketType.WISH_BONE,
  TrinketType.WALNUT,
] as const;

const v = {
  run: {
    // We cannot use a nested `DefaultMap` here.
    playersTrinketMap: new DefaultMap<PlayerIndex, Map<TrinketType, int>>(
      () => new Map(),
    ),
  },
};

export class PostTrinketBreak extends CustomCallback<ModCallbackCustom.POST_TRINKET_BREAK> {
  public override v = v;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER, this.entityTakeDmgPlayer],
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectUpdateReordered,
      ],
    ];
  }

  protected override shouldFire = shouldFireTrinketType;

  // ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER
  private readonly entityTakeDmgPlayer = (
    player: EntityPlayer,
    _amount: float,
    _damageFlags: BitFlags<DamageFlag>,
    _source: EntityRef,
    _countdownFrames: int,
  ): boolean | undefined => {
    const trinketMap = defaultMapGetPlayer(v.run.playersTrinketMap, player);

    for (const trinketType of TRINKETS_THAT_CAN_BREAK) {
      const numTrinketsHeld = player.GetTrinketMultiplier(trinketType);
      let oldNumTrinketsHeld = trinketMap.get(trinketType);
      if (oldNumTrinketsHeld === undefined) {
        oldNumTrinketsHeld = 0;
      }

      if (numTrinketsHeld >= oldNumTrinketsHeld) {
        continue;
      }

      trinketMap.set(trinketType, numTrinketsHeld);

      // Ensure that the trinket was not dropped on the ground.
      const numTrinketsOnGround = Isaac.CountEntities(
        undefined,
        EntityType.PICKUP,
        PickupVariant.TRINKET,
        trinketType,
      );
      if (numTrinketsOnGround > 0) {
        continue;
      }

      this.fire(player, trinketType);
    }

    return undefined;
  };

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectUpdateReordered = (player: EntityPlayer) => {
    // On every frame, keep track of how many trinkets we have.
    const trinketMap = defaultMapGetPlayer(v.run.playersTrinketMap, player);

    for (const trinketType of TRINKETS_THAT_CAN_BREAK) {
      const numTrinkets = player.GetTrinketMultiplier(trinketType);
      if (numTrinkets === 0) {
        trinketMap.delete(trinketType);
      } else {
        trinketMap.set(trinketType, numTrinkets);
      }
    }
  };
}
