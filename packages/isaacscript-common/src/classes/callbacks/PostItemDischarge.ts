import type { ActiveSlot, CollectibleType } from "isaac-typescript-definitions";
import {
  EntityType,
  ModCallback,
  SuckerVariant,
} from "isaac-typescript-definitions";
import { ACTIVE_SLOT_VALUES } from "../../cachedEnumValues";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getTotalCharge } from "../../functions/charge";
import {
  defaultMapGetPlayer,
  mapGetPlayer,
  mapSetPlayer,
} from "../../functions/playerDataStructures";
import type { PlayerIndex } from "../../types/PlayerIndex";
import { DefaultMap } from "../DefaultMap";
import type { FireArgs, OptionalArgs } from "../private/CustomCallback";
import { CustomCallback } from "../private/CustomCallback";

type T = ModCallbackCustom.POST_ITEM_DISCHARGE;

// Unfortunately, we cannot use a nested `DefaultMap` here due to limitations with the save data
// manager.
type ActiveSlotToCollectibleTypeMap = Map<ActiveSlot, CollectibleType>;
type ActiveSlotToChargeMap = Map<ActiveSlot, int>;

const v = {
  run: {
    playersActiveItemMap: new DefaultMap<
      PlayerIndex,
      ActiveSlotToCollectibleTypeMap
    >(() => new Map()),
    playersActiveChargeMap: new DefaultMap<PlayerIndex, ActiveSlotToChargeMap>(
      () => new Map(),
    ),
  },

  room: {
    playersBulbLastCollisionFrame: new Map<PlayerIndex, int>(),
  },
};

export class PostItemDischarge extends CustomCallback<T> {
  public override v = v;

  constructor() {
    super();

    this.callbacksUsed = [
      // 30
      [
        ModCallback.PRE_NPC_COLLISION,
        this.preNPCCollisionSucker,
        [EntityType.SUCKER],
      ],
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
    const [_player, collectibleType] = fireArgs;
    const [callbackCollectibleType] = optionalArgs;

    return (
      callbackCollectibleType === undefined ||
      callbackCollectibleType === collectibleType
    );
  };

  // ModCallback.PRE_NPC_COLLISION (30)
  // EntityType.SUCKER (61)
  private readonly preNPCCollisionSucker = (
    npc: EntityNPC,
    collider: Entity,
  ): boolean | undefined => {
    if (npc.Variant === SuckerVariant.BULB) {
      return this.preNPCCollisionBulb(npc, collider);
    }

    return undefined;
  };

  // ModCallback.PRE_NPC_COLLISION (30)
  // EntityType.SUCKER (61)
  private preNPCCollisionBulb(
    _npc: EntityNPC,
    collider: Entity,
  ): boolean | undefined {
    this.checkPlayerCollidedWithBulb(collider);
    return undefined;
  }

  /**
   * The algorithm for detecting a discharge is checking if the current charge is less than the
   * charge on the previous frame. Thus, when a Bulb zaps a player and drains their charge, this
   * will be a false position, so Bulbs have to be handled.
   *
   * When Bulbs zap a player, they go to `NPCState.STATE_JUMP` for a frame. However, this only
   * happens on the frame after the player is discharged, which is too late to be of any use.
   *
   * Instead, we track the frames that Bulbs collide with players and assume that a collision means
   * a zap has occurred.
   */
  private checkPlayerCollidedWithBulb(collider: Entity) {
    const player = collider.ToPlayer();
    if (player === undefined) {
      return;
    }

    const gameFrameCount = game.GetFrameCount();
    mapSetPlayer(v.room.playersBulbLastCollisionFrame, player, gameFrameCount);
  }

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectUpdateReordered = (player: EntityPlayer) => {
    const activeItemMap = defaultMapGetPlayer(
      v.run.playersActiveItemMap,
      player,
    );
    const chargeMap = defaultMapGetPlayer(v.run.playersActiveChargeMap, player);

    for (const activeSlot of ACTIVE_SLOT_VALUES) {
      const currentActiveItem = player.GetActiveItem();
      let previousActiveItem = activeItemMap.get(activeSlot);
      if (previousActiveItem === undefined) {
        previousActiveItem = currentActiveItem;
      }
      activeItemMap.set(activeSlot, currentActiveItem);

      if (currentActiveItem !== previousActiveItem) {
        // The player swapped out their active item for something else, so it should be impossible
        // for the discharge callback to fire on this frame.
        continue;
      }

      const currentCharge = getTotalCharge(player, activeSlot);
      let previousCharge = chargeMap.get(activeSlot);
      if (previousCharge === undefined) {
        previousCharge = currentCharge;
      }
      chargeMap.set(activeSlot, currentCharge);

      if (this.playerRecentlyCollidedWithBulb(player)) {
        continue;
      }

      if (currentCharge < previousCharge) {
        const collectibleType = player.GetActiveItem(activeSlot);
        this.fire(player, collectibleType, activeSlot);
      }
    }
  };

  /**
   * If the player collided with a Bulb on either this frame or the last frame, then assume a zap
   * has occurred. (We do not want to fire the discharge callback if this is the case.)
   */
  private playerRecentlyCollidedWithBulb(player: EntityPlayer) {
    const gameFrameCount = game.GetFrameCount();
    const bulbLastCollisionFrame = mapGetPlayer(
      v.room.playersBulbLastCollisionFrame,
      player,
    );

    const collidedOnThisFrame = gameFrameCount === bulbLastCollisionFrame;
    const collidedOnLastFrame = gameFrameCount - 1 === bulbLastCollisionFrame;

    return collidedOnThisFrame || collidedOnLastFrame;
  }
}
