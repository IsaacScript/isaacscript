import {
  DamageFlag,
  EntityType,
  ModCallback,
  PickupVariant,
  TrinketType,
} from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbacksCustom } from "../enums/ModCallbacksCustom";
import { saveDataManager } from "../features/saveDataManager/exports";
import { defaultMapGetPlayer } from "../functions/playerDataStructures";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postTrinketBreakFire,
  postTrinketBreakHasSubscriptions,
} from "./subscriptions/postTrinketBreak";

const TRINKETS_THAT_CAN_BREAK: readonly TrinketType[] = [
  TrinketType.WISH_BONE,
  TrinketType.WALNUT,
];

const v = {
  run: {
    playersTrinketMap: new DefaultMap<
      PlayerIndex,
      DefaultMap<TrinketType, int>
    >(() => new DefaultMap(0)),
  },
};

/** @internal */
export function postTrinketBreakCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postTrinketBreak", v, hasSubscriptions);

  mod.AddCallback(
    ModCallback.ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.PLAYER,
  ); // 11

  mod.AddCallbackCustom(
    ModCallbacksCustom.POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  );
}

function hasSubscriptions() {
  return postTrinketBreakHasSubscriptions();
}

// ModCallback.ENTITY_TAKE_DMG (11)
// EntityType.PLAYER (1)
function entityTakeDmgPlayer(
  tookDamage: Entity,
  _damageAmount: float,
  _damageFlags: BitFlags<DamageFlag>,
  _damageSource: EntityRef,
  _damageCountdownFrames: int,
) {
  if (!hasSubscriptions()) {
    return;
  }

  const player = tookDamage.ToPlayer();
  if (player === undefined) {
    return;
  }

  const trinketMap = defaultMapGetPlayer(v.run.playersTrinketMap, player);

  for (const trinketType of TRINKETS_THAT_CAN_BREAK) {
    const numTrinketsHeld = player.GetTrinketMultiplier(trinketType);
    const oldNumTrinketsHeld = trinketMap.getAndSetDefault(trinketType);
    if (numTrinketsHeld >= oldNumTrinketsHeld) {
      continue;
    }

    trinketMap.set(trinketType, numTrinketsHeld);

    // Ensure that the trinket was not dropped on the ground
    const numTrinketsOnGround = Isaac.CountEntities(
      undefined,
      EntityType.PICKUP,
      PickupVariant.TRINKET,
      trinketType,
    );
    if (numTrinketsOnGround > 0) {
      continue;
    }

    postTrinketBreakFire(player, trinketType);
  }
}

// ModCallbacksCustom.POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  // On every frame, keep track of how many trinkets we have
  const trinketMap = defaultMapGetPlayer(v.run.playersTrinketMap, player);

  for (const trinketType of TRINKETS_THAT_CAN_BREAK) {
    const numTrinkets = player.GetTrinketMultiplier(trinketType);
    trinketMap.set(trinketType, numTrinkets);
  }
}
