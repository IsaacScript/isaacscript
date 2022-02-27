import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayerIndex } from "../functions/player";
import { DefaultMap } from "../types/DefaultMap";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postTrinketBreakFire,
  postTrinketBreakHasSubscriptions,
} from "./subscriptions/postTrinketBreak";

const TRINKETS_THAT_CAN_BREAK: readonly TrinketType[] = [
  TrinketType.TRINKET_WISH_BONE,
  TrinketType.TRINKET_WALNUT,
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
    ModCallbacks.MC_ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.ENTITY_PLAYER,
  ); // 11

  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED,
    postPEffectUpdateReordered,
  ); // 4
}

function hasSubscriptions() {
  return postTrinketBreakHasSubscriptions();
}

// ModCallbacks.MC_ENTITY_TAKE_DMG (11)
// EntityType.ENTITY_PLAYER (1)
function entityTakeDmgPlayer(
  tookDamage: Entity,
  _damageAmount: float,
  _damageFlags: int,
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

  const playerIndex = getPlayerIndex(player);
  const trinketMap = v.run.playersTrinketMap.getAndSetDefault(playerIndex);

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
      EntityType.ENTITY_PICKUP,
      PickupVariant.PICKUP_TRINKET,
      trinketType,
    );
    if (numTrinketsOnGround > 0) {
      continue;
    }

    postTrinketBreakFire(player, trinketType);
  }
}

// ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED
function postPEffectUpdateReordered(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  // On every frame, keep track of how many trinkets we have
  const playerIndex = getPlayerIndex(player);
  const trinketMap = v.run.playersTrinketMap.getAndSetDefault(playerIndex);

  for (const trinketType of TRINKETS_THAT_CAN_BREAK) {
    const numTrinkets = player.GetTrinketMultiplier(trinketType);
    trinketMap.set(trinketType, numTrinkets);
  }
}
