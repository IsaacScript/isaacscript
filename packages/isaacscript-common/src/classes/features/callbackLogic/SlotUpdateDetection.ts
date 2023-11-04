import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { getSlots } from "../../../functions/entitiesSpecific";
import type { PostSlotInit } from "../../callbacks/PostSlotInit";
import type { PostSlotUpdate } from "../../callbacks/PostSlotUpdate";
import { Feature } from "../../private/Feature";

const v = {
  room: {
    initializedSlots: new Set<PtrHash>(),
  },
};

export class SlotUpdateDetection extends Feature {
  public override v = v;

  private readonly postSlotInit: PostSlotInit;
  private readonly postSlotUpdate: PostSlotUpdate;

  constructor(postSlotInit: PostSlotInit, postSlotUpdate: PostSlotUpdate) {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],
    ];

    this.customCallbacksUsed = [
      // This has to be the reordered callback because we don't want the `POST_SLOT_INIT` callback
      // firing on the first room of a floor before the `POST_NEW_LEVEL` callback.
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, this.postNewRoomReordered],
    ];

    this.postSlotInit = postSlotInit;
    this.postSlotUpdate = postSlotUpdate;
  }

  // ModCallback.POST_UPDATE (1)
  private readonly postUpdate = () => {
    for (const slot of getSlots()) {
      this.checkNewEntity(slot);
      this.postSlotUpdate.fire(slot);
    }
  };

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private readonly postNewRoomReordered = () => {
    for (const slot of getSlots()) {
      this.checkNewEntity(slot);
    }
  };

  private checkNewEntity(slot: EntitySlot) {
    const ptrHash = GetPtrHash(slot);
    if (!v.room.initializedSlots.has(ptrHash)) {
      v.room.initializedSlots.add(ptrHash);
      this.postSlotInit.fire(slot);
    }
  }
}
