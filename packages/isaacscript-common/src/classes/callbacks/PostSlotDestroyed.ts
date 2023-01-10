import {
  EntityGridCollisionClass,
  EntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { SlotDestructionType } from "../../enums/SlotDestructionType";
import { shouldFireSlot } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

const PRIZE_GAME_FRAME_DELAY_UNTIL_REMOVAL = 3;

export class PostSlotDestroyed extends CustomCallback<ModCallbackCustom.POST_SLOT_DESTROYED> {
  public override v = {
    room: {
      brokenSlots: new Set<PtrHash>(),
      slotPrizeAnimationGameFrame: new Map<PtrHash, int>(),
    },
  };

  constructor() {
    super();

    this.callbacksUsed = [
      // 67
      [
        ModCallback.POST_ENTITY_REMOVE,
        this.postEntityRemoveSlot,
        [EntityType.SLOT],
      ],
    ];

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED,
        this.postSlotAnimationChanged,
      ],
    ];
  }

  protected override shouldFire = shouldFireSlot;

  // ModCallback.POST_ENTITY_REMOVE (67)
  // EntityType.SLOT (6)
  private postEntityRemoveSlot = (entity: Entity) => {
    const slot = entity as EntitySlot;
    const ptrHash = GetPtrHash(slot);
    const gameFrameCount = game.GetFrameCount();

    const prizeFrame = this.v.room.slotPrizeAnimationGameFrame.get(ptrHash);
    if (prizeFrame === undefined) {
      return;
    }

    if (prizeFrame + PRIZE_GAME_FRAME_DELAY_UNTIL_REMOVAL === gameFrameCount) {
      this.fire(slot, SlotDestructionType.COLLECTIBLE_PAYOUT);
    }
  };

  // ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED
  private postSlotAnimationChanged = (slot: EntitySlot) => {
    const ptrHash = GetPtrHash(slot);
    const gameFrameCount = game.GetFrameCount();

    const alreadyBroken = this.v.room.brokenSlots.has(ptrHash);
    if (alreadyBroken) {
      return;
    }

    if (slot.GridCollisionClass === EntityGridCollisionClass.GROUND) {
      this.v.room.brokenSlots.add(ptrHash);
      this.fire(slot, SlotDestructionType.NORMAL);
    }

    const sprite = slot.GetSprite();
    const animation = sprite.GetAnimation();
    if (animation === "Prize") {
      this.v.room.slotPrizeAnimationGameFrame.set(ptrHash, gameFrameCount);
    } else {
      this.v.room.slotPrizeAnimationGameFrame.delete(ptrHash);
    }
  };
}
