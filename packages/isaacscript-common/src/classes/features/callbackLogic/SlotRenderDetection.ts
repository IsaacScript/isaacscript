import { ModCallback } from "isaac-typescript-definitions";
import { getSlots } from "../../../functions/entitiesSpecific";
import { PostSlotAnimationChanged } from "../../callbacks/PostSlotAnimationChanged";
import { PostSlotRender } from "../../callbacks/PostSlotRender";
import { DefaultMap } from "../../DefaultMap";
import { Feature } from "../../private/Feature";

export class SlotRenderDetection extends Feature {
  public override v = {
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

  private postSlotRender: PostSlotRender;
  private postSlotAnimationChanged: PostSlotAnimationChanged;

  constructor(
    postSlotRender: PostSlotRender,
    postSlotAnimationChanged: PostSlotAnimationChanged,
  ) {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];

    this.postSlotRender = postSlotRender;
    this.postSlotAnimationChanged = postSlotAnimationChanged;
  }

  // ModCallback.POST_RENDER (2)
  private postRender = () => {
    for (const slot of getSlots()) {
      this.postSlotRender.fire(slot);
      this.checkSlotAnimationChanged(slot);
    }
  };

  private checkSlotAnimationChanged(slot: EntitySlot) {
    const sprite = slot.GetSprite();
    const currentAnimation = sprite.GetAnimation();
    const ptrHash = GetPtrHash(slot);
    const previousAnimation = this.v.room.slotAnimations.getAndSetDefault(
      ptrHash,
      slot,
    );
    this.v.room.slotAnimations.set(ptrHash, currentAnimation);

    if (currentAnimation !== previousAnimation) {
      this.postSlotAnimationChanged.fire(
        slot,
        previousAnimation,
        currentAnimation,
      );
    }
  }
}
