import { ModCallback } from "isaac-typescript-definitions";
import { getSlots } from "../../../functions/entitiesSpecific";
import { DefaultMap } from "../../DefaultMap";
import type { PostSlotAnimationChanged } from "../../callbacks/PostSlotAnimationChanged";
import type { PostSlotRender } from "../../callbacks/PostSlotRender";
import { Feature } from "../../private/Feature";

const v = {
  room: {
    slotAnimations: new DefaultMap<PtrHash, string, [slot: Entity]>(
      (slot: Entity) => {
        const sprite = slot.GetSprite();
        return sprite.GetAnimation();
      },
    ),
    brokenSlots: new Set<PtrHash>(),
  },
};

export class SlotRenderDetection extends Feature {
  public override v = v;

  private readonly postSlotRender: PostSlotRender;
  private readonly postSlotAnimationChanged: PostSlotAnimationChanged;

  constructor(
    postSlotRender: PostSlotRender,
    postSlotAnimationChanged: PostSlotAnimationChanged,
  ) {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];

    this.postSlotRender = postSlotRender;
    this.postSlotAnimationChanged = postSlotAnimationChanged;
  }

  // ModCallback.POST_RENDER (2)
  private readonly postRender = () => {
    for (const slot of getSlots()) {
      this.postSlotRender.fire(slot);
      this.checkSlotAnimationChanged(slot);
    }
  };

  private checkSlotAnimationChanged(slot: EntitySlot) {
    const sprite = slot.GetSprite();
    const currentAnimation = sprite.GetAnimation();
    const ptrHash = GetPtrHash(slot);
    const previousAnimation = v.room.slotAnimations.getAndSetDefault(
      ptrHash,
      slot,
    );
    v.room.slotAnimations.set(ptrHash, currentAnimation);

    if (currentAnimation !== previousAnimation) {
      this.postSlotAnimationChanged.fire(
        slot,
        previousAnimation,
        currentAnimation,
      );
    }
  }
}
