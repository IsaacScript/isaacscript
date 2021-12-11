import { saveDataManager } from "../features/saveDataManager/exports";
import { getPlayerIndex, PlayerIndex } from "../functions/player";
import {
  postTrinketBreakFire,
  postTrinketBreakHasSubscriptions,
} from "./subscriptions/postTrinketBreak";

const TRINKETS_THAT_CAN_BREAK = [
  TrinketType.TRINKET_WISH_BONE,
  TrinketType.TRINKET_WALNUT,
];

const v = {
  run: {
    playerTrinketMap: new Map<PlayerIndex, Map<TrinketType, int>>(),
  },
};

/** @internal */
export function postTrinketBreakCallbackInit(mod: Mod): void {
  saveDataManager("postTrinketBreak", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PEFFECT_UPDATE, postPEffectUpdate); // 4

  mod.AddCallback(
    ModCallbacks.MC_ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.ENTITY_PLAYER,
  ); // 11
}

function hasSubscriptions() {
  return postTrinketBreakHasSubscriptions();
}

// ModCallbacks.MC_POST_PEFFECT_UPDATE (4)
function postPEffectUpdate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  // On every frame, keep track of how many trinkets we have
  const trinketMap = getTrinketMap(player);

  for (const trinketType of TRINKETS_THAT_CAN_BREAK) {
    const numTrinkets = player.GetTrinketMultiplier(trinketType);
    trinketMap.set(trinketType, numTrinkets);
  }
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

  const trinketMap = getTrinketMap(player);

  for (const trinketType of TRINKETS_THAT_CAN_BREAK) {
    const numTrinkets = player.GetTrinketMultiplier(trinketType);
    const oldNumTrinkets = trinketMap.get(trinketType);
    if (oldNumTrinkets !== undefined && numTrinkets < oldNumTrinkets) {
      trinketMap.set(trinketType, numTrinkets);
      postTrinketBreakFire(player, trinketType);
    }
  }
}

function getTrinketMap(player: EntityPlayer) {
  const playerIndex = getPlayerIndex(player);
  let playerTrinketMap = v.run.playerTrinketMap.get(playerIndex);
  if (playerTrinketMap === undefined) {
    playerTrinketMap = new Map();
    v.run.playerTrinketMap.set(playerIndex, playerTrinketMap);
  }

  return playerTrinketMap;
}
