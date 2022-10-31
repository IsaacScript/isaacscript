import { ModCallback } from "isaac-typescript-definitions";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplayPickup extends Feature {
  public textCallback: (pickup: EntityPickup) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_PICKUP_RENDER, [this.postPickupRender]], // 36
    ];
  }

  // ModCallback.POST_PICKUP_RENDER (36)
  private postPickupRender = (pickup: EntityPickup) => {
    const text = this.textCallback(pickup);
    renderTextOnEntity(pickup, text);
  };
}
