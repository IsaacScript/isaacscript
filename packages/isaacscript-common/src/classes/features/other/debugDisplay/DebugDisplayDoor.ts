import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback } from "./utils";

export class DebugDisplayDoor extends Feature {
  // ModCallbackCustom.POST_DOOR_RENDER
  private readonly postDoorRender = (door: GridEntityDoor) => {
    const text = this.textCallback(door);
    renderTextOnEntity(door, text);
  };

  public textCallback: (door: GridEntityDoor) => string =
    defaultGridEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_DOOR_RENDER, this.postDoorRender],
    ];
  }
}
