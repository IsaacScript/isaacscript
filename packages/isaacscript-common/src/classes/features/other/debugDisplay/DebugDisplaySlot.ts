import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplaySlot extends Feature {
  public textCallback: (slot: EntitySlot) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_SLOT_RENDER, this.postSlotRender],
    ];
  }

  // ModCallbackCustom.POST_SLOT_RENDER
  private postSlotRender = (slot: EntitySlot) => {
    const text = this.textCallback(slot);
    renderTextOnEntity(slot, text);
  };
}
