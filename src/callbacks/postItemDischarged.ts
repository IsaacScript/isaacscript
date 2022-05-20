import {
  ActiveSlot,
  CollectibleType,
  EntityType,
  ModCallback,
  SuckerVariant,
} from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getTotalCharge } from "../functions/charge";
import { getEnumValues } from "../functions/enums";
import {
  defaultMapGetPlayer,
  mapGetPlayer,
  mapSetPlayer,
} from "../functions/playerDataStructures";
import { PlayerIndex } from "../types/PlayerIndex";
import {
  postItemDischargeFire,
  postItemDischargeHasSubscriptions,
} from "./subscriptions/postItemDischarged";

type ActiveSlotToCollectibleTypeMap = DefaultMap<
  ActiveSlot,
  CollectibleType,
  [int]
>;
type ActiveSlotToChargeMap = DefaultMap<ActiveSlot, int, [int]>;

const v = {
  run: {
    playersActiveItemMap: new DefaultMap<
      PlayerIndex,
      ActiveSlotToCollectibleTypeMap
    >(() => new DefaultMap((collectibleType) => collectibleType)),
    playersActiveChargeMap: new DefaultMap<PlayerIndex, ActiveSlotToChargeMap>(
      () => new DefaultMap((charge) => charge),
    ),
  },

  room: {
    playersBulbLastCollisionFrame: new Map<PlayerIndex, int>(),
  },
};

export function postItemDischargeCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postItemDischarge", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_PEFFECT_UPDATE, postPEffectUpdate); // 4
  mod.AddCallback(
    ModCallback.PRE_NPC_COLLISION,
    preNPCCollisionSucker,
    EntityType.SUCKER,
  ); // 30
}

function hasSubscriptions(): boolean {
  return postItemDischargeHasSubscriptions();
}

// ModCallback.POST_PEFFECT_UPDATE (4)
function postPEffectUpdate(player: EntityPlayer) {
  if (!hasSubscriptions()) {
    return;
  }

  const activeItemMap = defaultMapGetPlayer(v.run.playersActiveItemMap, player);
  const chargeMap = defaultMapGetPlayer(v.run.playersActiveChargeMap, player);

  for (const activeSlot of getEnumValues(ActiveSlot)) {
    const currentActiveItem = player.GetActiveItem();
    const previousActiveItem = activeItemMap.getAndSetDefault(
      activeSlot,
      currentActiveItem,
    );
    activeItemMap.set(activeSlot, currentActiveItem);

    if (currentActiveItem !== previousActiveItem) {
      // The player swapped out their active item for something else, so it should be impossible for
      // the discharge callback to fire on this frame.
      continue;
    }

    const currentCharge = getTotalCharge(player, activeSlot);
    const previousCharge = chargeMap.getAndSetDefault(
      activeSlot,
      currentCharge,
    );
    chargeMap.set(activeSlot, currentCharge);

    if (playerRecentlyCollidedWithBulb(player)) {
      continue;
    }

    if (currentCharge < previousCharge) {
      const collectibleType = player.GetActiveItem(activeSlot);
      postItemDischargeFire(player, collectibleType, activeSlot);
    }
  }
}

/**
 * If the player collided with a Bulb on either this frame or the last frame, then assume a zap has
 * occurred. (We do not want to fire the discharge callback if this is the case.)
 */
function playerRecentlyCollidedWithBulb(player: EntityPlayer) {
  const gameFrameCount = game.GetFrameCount();
  const bulbLastCollisionFrame = mapGetPlayer(
    v.room.playersBulbLastCollisionFrame,
    player,
  );
  const collidedOnThisFrame = gameFrameCount === bulbLastCollisionFrame;
  const collidedOnLastFrame = gameFrameCount - 1 === bulbLastCollisionFrame;
  return collidedOnThisFrame || collidedOnLastFrame;
}

/**
 * ModCallback.PRE_NPC_COLLISION (30)
 * EntityType.SUCKER (61)
 *
 * The algorithm for detecting a discharge is checking if the current charge is less than the charge
 * on the previous frame. Thus, when a Bulb zaps a player and drains their charge, this will be a
 * false position, so Bulbs have to be handled.
 *
 * When Bulbs zap a player, they go to `NpcState.STATE_JUMP` for a frame. However, this only happens
 * on the frame after the player is discharged, which is too late to be of any use.
 *
 * Instead, we track the frames that Bulbs collide with players and assume that a collision means a
 * zap has occurred.
 */
function preNPCCollisionSucker(npc: EntityNPCSucker, collider: Entity) {
  if (!hasSubscriptions()) {
    return;
  }

  if (npc.Variant !== SuckerVariant.BULB) {
    return;
  }

  const player = collider.ToPlayer();
  if (player === undefined) {
    return;
  }

  const gameFrameCount = game.GetFrameCount();
  mapSetPlayer(v.room.playersBulbLastCollisionFrame, player, gameFrameCount);
}
