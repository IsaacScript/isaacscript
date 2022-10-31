import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplayDoor extends Feature {
  public textCallback: (door: GridEntityDoor) => string =
    defaultGridEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_DOOR_RENDER, [this.postDoorRender]],
    ];
  }

  // ModCallbackCustom.POST_DOOR_RENDER
  private postDoorRender = (door: GridEntityDoor) => {
    const text = this.textCallback(door);
    renderTextOnEntity(door, text);
  };
}
