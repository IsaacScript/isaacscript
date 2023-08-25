import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback } from "./utils";

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
  private readonly postSlotRender = (slot: EntitySlot) => {
    const text = this.textCallback(slot);
    renderTextOnEntity(slot, text);
  };
}
