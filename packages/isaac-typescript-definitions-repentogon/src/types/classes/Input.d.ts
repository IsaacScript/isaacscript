import type { ControllerIndex } from "isaac-typescript-definitions";

declare global {
  namespace Input {
    function GetDeviceNameByIdx(index: ControllerIndex): string | undefined;
    function GetMouseWheel(): Vector;
  }
}
