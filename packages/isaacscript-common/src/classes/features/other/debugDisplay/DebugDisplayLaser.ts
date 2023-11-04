import { ModCallback } from "isaac-typescript-definitions";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback } from "./utils";

export class DebugDisplayLaser extends Feature {
  public textCallback: (laser: EntityLaser) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      // 49
      [ModCallback.POST_LASER_RENDER, this.postLaserRender],
    ];
  }

  // ModCallback.POST_LASER_RENDER (49)
  private readonly postLaserRender = (laser: EntityLaser) => {
    const text = this.textCallback(laser);
    renderTextOnEntity(laser, text);
  };
}
