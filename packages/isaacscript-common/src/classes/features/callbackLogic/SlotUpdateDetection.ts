import { ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { getSlots } from "../../../functions/entitiesSpecific";
import { PostSlotInit } from "../../callbacks/PostSlotInit";
import { PostSlotUpdate } from "../../callbacks/PostSlotUpdate";
import { Feature } from "../../private/Feature";

export class SlotUpdateDetection extends Feature {
  public override v = {
    room: {
      initializedSlots: new Set<PtrHash>(),
    },
  };

  private postSlotInit: PostSlotInit;
  private postSlotUpdate: PostSlotUpdate;

  constructor(postSlotInit: PostSlotInit, postSlotUpdate: PostSlotUpdate) {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_UPDATE, [this.postUpdate]], // 1
    ];

    this.customCallbacksUsed = [
      // This has to be the reordered callback because we don't want the `POST_SLOT_INIT` callback
      // firing on the first room of a floor before the `POST_NEW_LEVEL` callback.
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, [this.postNewRoomReordered]],
    ];

    this.postSlotInit = postSlotInit;
    this.postSlotUpdate = postSlotUpdate;
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = () => {
    for (const slot of getSlots()) {
      this.checkNewEntity(slot);
      this.postSlotUpdate.fire(slot);
    }
  };

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private postNewRoomReordered = () => {
    for (const slot of getSlots()) {
      this.checkNewEntity(slot);
    }
  };

  private checkNewEntity(slot: EntitySlot) {
    const ptrHash = GetPtrHash(slot);
    if (!this.v.room.initializedSlots.has(ptrHash)) {
      this.v.room.initializedSlots.add(ptrHash);
      this.postSlotInit.fire(slot);
    }
  }
}
