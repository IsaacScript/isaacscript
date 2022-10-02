import {
  ActiveSlot,
  CollectibleType,
  EntityType,
  ModCallback,
  SuckerVariant,
} from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getTotalCharge } from "../../functions/charge";
import { getEnumValues } from "../../functions/enums";
import {
  defaultMapGetPlayer,
  mapGetPlayer,
  mapSetPlayer,
} from "../../functions/playerDataStructures";
import { asNumber } from "../../functions/types";
import { PlayerIndex } from "../../types/PlayerIndex";
import { DefaultMap } from "../DefaultMap";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../private/CustomCallback";

type T = ModCallbackCustom2.POST_ITEM_DISCHARGE;

// Unfortunately, we cannot use a nested `DefaultMap` here due to limitations with the save data
// manager.
type ActiveSlotToCollectibleTypeMap = Map<ActiveSlot, CollectibleType>;
type ActiveSlotToChargeMap = Map<ActiveSlot, int>;

export class PostItemDischarge extends CustomCallback<T> {
  public override v = {
    run: {
      playersActiveItemMap: new DefaultMap<
        PlayerIndex,
        ActiveSlotToCollectibleTypeMap
      >(() => new Map()),
      playersActiveChargeMap: new DefaultMap<
        PlayerIndex,
        ActiveSlotToChargeMap
      >(() => new Map()),
    },

    room: {
      playersBulbLastCollisionFrame: new Map<PlayerIndex, int>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      [
        ModCallback.PRE_NPC_COLLISION,
        [this.preNPCCollisionSucker, EntityType.SUCKER],
      ], // 30
    ];

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
    const [_player, collectibleType] = fireArgs;
    const [callbackCollectibleType] = optionalArgs;

    return (
      callbackCollectibleType === undefined ||
      callbackCollectibleType === collectibleType
    );
  };

  // ModCallback.PRE_NPC_COLLISION (30)
  // EntityType.SUCKER (61)
  private preNPCCollisionSucker = (
    npc: EntityNPC,
    collider: Entity,
  ): boolean | undefined => {
    if (npc.Variant === asNumber(SuckerVariant.BULB)) {
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
   * When Bulbs zap a player, they go to `NpcState.STATE_JUMP` for a frame. However, this only
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
    mapSetPlayer(
      this.v.room.playersBulbLastCollisionFrame,
      player,
      gameFrameCount,
    );
  }

  // ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED
  private postPEffectUpdateReordered = (player: EntityPlayer) => {
    const activeItemMap = defaultMapGetPlayer(
      this.v.run.playersActiveItemMap,
      player,
    );
    const chargeMap = defaultMapGetPlayer(
      this.v.run.playersActiveChargeMap,
      player,
    );

    for (const activeSlot of getEnumValues(ActiveSlot)) {
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
      this.v.room.playersBulbLastCollisionFrame,
      player,
    );
    const collidedOnThisFrame = gameFrameCount === bulbLastCollisionFrame;
    const collidedOnLastFrame = gameFrameCount - 1 === bulbLastCollisionFrame;
    return collidedOnThisFrame || collidedOnLastFrame;
  }
}
