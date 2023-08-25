import { ModCallback } from "isaac-typescript-definitions";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback } from "./utils";

export class DebugDisplayPickup extends Feature {
  public textCallback: (pickup: EntityPickup) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      // 36
      [ModCallback.POST_PICKUP_RENDER, this.postPickupRender],
    ];
  }

  // ModCallback.POST_PICKUP_RENDER (36)
  private readonly postPickupRender = (pickup: EntityPickup) => {
    const text = this.textCallback(pickup);
    renderTextOnEntity(pickup, text);
  };
}
