// For machines, destruction is detected in two ways:

// 1) The main way is via a change in grid entity class. This happens when the machine is destroyed
//    with a bomb, for example. For this case, the slot will remain until the player leaves the
//    room.

// 2) In the specific case of a machine spawning a collectible, the machine will be immediately
//    removed. Thus, we assume that any despawning slot machine is destroyed in this way.

// For beggars, destruction is detected by monitoring for when a beggar despawns mid-room. Beggars
// that are paying out with a collectible will always be playing the "Teleport" animation.
// Otherwise, the beggar won't be playing any animation in particular.

import {
  EntityGridCollisionClass,
  EntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import { ISCFeature } from "../../../enums/ISCFeature";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { SlotDestructionType } from "../../../enums/SlotDestructionType";
import { isSlotMachine } from "../../../functions/slots";
import type { PostSlotDestroyed } from "../../callbacks/PostSlotDestroyed";
import { Feature } from "../../private/Feature";
import type { RoomHistory } from "../other/RoomHistory";

const v = {
  room: {
    destroyedSlotSet: new Set<PtrHash>(),
  },
};

export class SlotDestroyedDetection extends Feature {
  public override v = v;

  private readonly postSlotDestroyed: PostSlotDestroyed;
  private readonly roomHistory: RoomHistory;

  constructor(postSlotDestroyed: PostSlotDestroyed, roomHistory: RoomHistory) {
    super();

    this.featuresUsed = [ISCFeature.ROOM_HISTORY];

    this.callbacksUsed = [
      // 67
      [
        ModCallback.POST_ENTITY_REMOVE,
        this.postEntityRemoveSlot,
        [EntityType.SLOT],
      ],
    ];

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_SLOT_UPDATE, this.postSlotUpdate],
    ];

    this.postSlotDestroyed = postSlotDestroyed;
    this.roomHistory = roomHistory;
  }

  // ModCallback.POST_ENTITY_REMOVE (67)
  // EntityType.SLOT (6)
  private readonly postEntityRemoveSlot = (entity: Entity) => {
    const slot = entity as EntitySlot;

    // The `POST_ENTITY_REMOVE` callback will fire for slots that are naturally despawning as a
    // player leaves a room. We want to ignore all slots that despawn for this reason.
    if (this.roomHistory.isLeavingRoom()) {
      return;
    }

    if (isSlotMachine(slot)) {
      this.postEntityRemoveSlotMachine(slot);
    } else {
      this.postEntityRemoveBeggar(slot);
    }
  };

  private postEntityRemoveSlotMachine(slot: EntitySlot) {
    this.postSlotDestroyed.fire(slot, SlotDestructionType.COLLECTIBLE_PAYOUT);
  }

  private postEntityRemoveBeggar(slot: EntitySlot) {
    const sprite = slot.GetSprite();
    const animation = sprite.GetAnimation();
    const slotDestructionType =
      animation === "Teleport"
        ? SlotDestructionType.COLLECTIBLE_PAYOUT
        : SlotDestructionType.NORMAL;
    this.postSlotDestroyed.fire(slot, slotDestructionType);
  }

  // ModCallbackCustom.POST_SLOT_UPDATE
  private readonly postSlotUpdate = (slot: EntitySlot) => {
    const ptrHash = GetPtrHash(slot);

    const alreadyDestroyed = v.room.destroyedSlotSet.has(ptrHash);
    if (alreadyDestroyed) {
      return;
    }

    this.checkDestroyedFromCollisionClass(slot);
  };

  /**
   * Slots normally have an entity collision class of `EntityCollisionClass.ALL` (4) and a grid
   * collision class of `EntityGridCollisionClass.NONE` (0). When they are destroyed with a bomb,
   * the entity collision class stays the same, but the grid collision class switches to
   * `EntityGridCollisionClass.GROUND` (5).
   */
  private checkDestroyedFromCollisionClass(slot: EntitySlot) {
    if (slot.GridCollisionClass === EntityGridCollisionClass.GROUND) {
      const ptrHash = GetPtrHash(slot);
      v.room.destroyedSlotSet.add(ptrHash);
      this.postSlotDestroyed.fire(slot, SlotDestructionType.NORMAL);
    }
  }
}
