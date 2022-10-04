import { ModCallbackCustom } from "../../../../enums/ModCallbackCustom";
import { Feature } from "../../../private/Feature";
import { defaultGridEntityDisplayCallback, renderTextOnEntity } from "./utils";

export class DebugDisplayPressurePlate extends Feature {
  public textCallback: (pressurePlate: GridEntityPressurePlate) => string =
    defaultGridEntityDisplayCallback;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PRESSURE_PLATE_RENDER,
        [this.postPressurePlateRender],
      ],
    ];
  }

  // ModCallbackCustom.POST_PRESSURE_PLATE_RENDER
  private postPressurePlateRender = (
    pressurePlate: GridEntityPressurePlate,
  ) => {
    const text = this.textCallback(pressurePlate);
    renderTextOnEntity(pressurePlate, text);
  };
}
