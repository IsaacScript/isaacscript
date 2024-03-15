import type { ImGuiData } from "../../enums/imgui/ImGuiData";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  interface AddUpdateParametersImGui {
    [ImGuiData.COLOR_VALUES]: LuaMultiReturn<
      [r: number, g: number, b: number, a?: number]
    >;
    [ImGuiData.HINT_TEXT]: string;
    [ImGuiData.LABEL]: string;
    [ImGuiData.LIST_VALUES]: string[] | number[];
    [ImGuiData.MAX]: number;
    [ImGuiData.MAX]: number;
    [ImGuiData.VALUE]: number | string;
  }
}
