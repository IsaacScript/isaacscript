import type { Controller } from "../../../enums/Controller";
import type { Keyboard } from "../../../enums/Keyboard";
import type { ImGuiColor } from "../../../enums/mods/repentogon/ImGuiColor";
import type { ImGuiElement } from "../../../enums/mods/repentogon/ImGuiElement";
import type { ImGuiNotificationType } from "../../../enums/mods/repentogon/ImGuiNotificationType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace ImGui {
    /**
     * Adds a button element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param clickCallback Default is undefined.
     * @param isSmall Default is false.
     */
    function AddButton(
      parentId: string,
      elementId: string,
      label?: string,
      clickCallback?: (clickCount: number) => void,
      isSmall?: boolean,
    ): void;

    /**
     * Adds a checkbox element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param isActive Default is false.
     */
    function AddCheckbox(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (isChecked: boolean) => void,
      isActive?: boolean,
    ): void;

    /**
     * Adds a combobox element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param options Default is an empty array.
     * @param selectedIndex Default is 0.
     * @param isSlider Default is false.
     */
    function AddCombobox(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (selectedIndex: int, optionValue: string) => void,
      options?: string[],
      selectedIndex?: int,
      isSlider?: boolean,
    ): void;

    /**
     * Adds a float drag element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param startingValue Default is 0.
     * @param speed Default is 1.
     * @param min Default is 0.
     * @param max Default is 100.
     * @param formatting The format specifier used to format the label displaying the current value
     *                   of the dragger. Default is "%.3f".
     */
    function AddDragFloat(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (newValue: number) => void,
      startingValue?: number,
      speed?: number,
      min?: number,
      max?: number,
      formatting?: string,
    ): void;

    /**
     * Adds an integer drag element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param startingValue Default is 0.
     * @param speed Default is 1.
     * @param min Default is 0.
     * @param max Default is 100.
     * @param formatting The format specifier used to format the label displaying the current value
     *                   of the dragger. Default is "%d%".
     */
    function AddDragInteger(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (newValue: int) => void,
      startingValue?: int,
      speed?: number,
      min?: int,
      max?: int,
      formatting?: string,
    ): void;

    /**
     * Adds a generic element. This is useful for adding simple elements that do not require
     * interaction such as bullets as an element id is not required.
     *
     * @param parentId
     * @param elementId
     * @param elementType
     * @param label Default is an empty string.
     */
    function AddElement(
      parentId: string,
      elementId: string | undefined,
      elementType: ImGuiElement,
      label?: string,
    ): void;

    /**
     * Adds an RGB selector element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param r Default is 0.
     * @param g Default is 0.
     * @param b Default is 0.
     */
    function AddInputColor(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (r: number, g: number, b: number) => void,
      r?: number,
      g?: number,
      b?: number,
    ): void;

    /**
     * Adds an RGBA selector element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param r Default is 0.
     * @param g Default is 0.
     * @param b Default is 0.
     * @param a Default is 0.
     */
    function AddInputColor(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (r: number, g: number, b: number, a: number) => void,
      r?: number,
      g?: number,
      b?: number,
      a?: number,
    ): void;

    /**
     * Adds a controller input element.
     *
     * @param parentId
     * @param elementId
     * @param buttonLabel Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param defaultValue Default is `Controller.D_PAD_LEFT`.
     */
    function AddInputController(
      parentId: string,
      elementId: string,
      buttonLabel?: string,
      changeCallback?: (selectedButton: Controller) => void,
      defaultValue?: Controller,
    ): void;

    /**
     * Adds a float input element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param defaultValue Default is 0.
     * @param step Default is 1.
     * @param stepFast Default is 100.
     */
    function AddInputFloat(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (newValue: number) => void,
      defaultValue?: number,
      step?: number,
      stepFast?: number,
    ): void;

    /**
     * Adds an integer input element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param defaultValue Default is 0.
     * @param step Default is 1.
     * @param stepFast Default is 100.
     */
    function AddInputInteger(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (newValue: int) => void,
      defaultValue?: int,
      step?: int,
      stepFast?: int,
    ): void;

    /**
     * Adds a keyboard input element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param defaultValue Default is 0.
     */
    function AddInputKeyboard(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (key: Keyboard, buttonName: string) => void,
      defaultValue?: Keyboard,
    ): void;

    /**
     * Adds a text input element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param defaultValue Default is an empty string.
     * @param hintText Default is an empty string.
     */
    function AddInputText(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (newValue: string) => void,
      defaultValue?: string,
      hintText?: string,
    ): void;

    /**
     * Adds a text input element which extends multiple lines.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param defaultValue Default is an empty string.
     * @param displayedLines Default is 6.
     */
    function AddInputTextMultiline(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (newValue: string) => void,
      defaultValue?: string,
      displayedLines?: int,
    ): void;

    /**
     * Adds a plot histogram element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param values Default is an empty array.
     * @param overlayText Default is an empty string.
     * @param minimum Default is the smallest possible number in Lua.
     * @param maximum Default is the largest possible number in Lua.
     * @param height Default is 60.
     */
    function AddPlotHistogram(
      parentId: string,
      elementId: string,
      label?: string,
      values?: number[],
      overlayText?: string,
      minimum?: number,
      maximum?: number,
      height?: number,
    ): void;

    /**
     * Adds a plot lines element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param values Default is an empty array.
     * @param overlayText Default is an empty string.
     * @param minimum Default is the smallest possible number in Lua.
     * @param maximum Default is the largest possible number in Lua.
     * @param height Default is 40.
     */
    function AddPlotLines(
      parentId: string,
      elementId: string,
      label?: string,
      values?: number[],
      overlayText?: string,
      minimum?: string,
      maximum?: string,
      height?: number,
    ): void;

    /**
     * Adds a progress bar element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param progress Default is 0.
     * @param overlayText Default is an empty string.
     */
    function AddProgressBar(
      parentId: string,
      elementId: string,
      label?: string,
      progress?: number,
      overlayText?: string,
    ): void;

    /**
     * Adds a radio buttons element.
     *
     * @param parentId
     * @param elementId
     * @param changeCallback Default is undefined.
     * @param options Default is an empty array.
     * @param selectedIndex Default is 0.
     * @param renderSameLine Default is true.
     */
    function AddRadioButtons(
      parentId: string,
      elementId: string,
      changeCallback?: (newValue: number) => void,
      options?: string[],
      selectedIndex?: int,
      renderSameLine?: boolean,
    ): void;

    /**
     * Adds a float slider element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param defaultValue Default is 0.
     * @param min Default is 0.
     * @param max Default is 100.
     * @param stringFormatting Default is "%.3f"
     */
    function AddSliderFloat(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (newValue: number) => void,
      defaultValue?: number,
      min?: number,
      max?: number,
      stringFormatting?: string,
    ): void;

    /**
     * Adds an integer slider element.
     *
     * @param parentId
     * @param elementId
     * @param label Default is an empty string.
     * @param changeCallback Default is undefined.
     * @param defaultValue Default is 0.
     * @param min Default is 0.
     * @param max Default is 100.
     * @param stringFormatting Default is "%d%"
     */
    function AddSliderInteger(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (newValue: int) => void,
      defaultValue?: int,
      min?: int,
      max?: int,
      stringFormatting?: string,
    ): void;

    /**
     * Adds a tab bar.
     *
     * @param parentId
     * @param elementId
     */
    function AddTab(parentId: string, elementId: string): void;

    /**
     * Adds a text element.
     *
     * @param parentId
     * @param text
     * @param wrapText Default is false.
     * @param elementId Default is an empty string.
     */
    function AddText(
      parentId: string,
      text: string,
      wrapText?: boolean,
      elementId?: string,
    ): void;

    /**
     * Creates an entry to the Main Menu bar in Repentogon.
     *
     * @param elementId
     * @param label Default is an empty string.
     */
    function CreateMenu(elementId: string, label?: string): void;

    /**
     * Creates a new window. You will need to use `ImGui.LinkToWindowElement` or `ImGui.SetVisible`
     * to toggle the visibility of the window.
     *
     * @param elementId
     * @param title Optional. Default is an empty string.
     */
    function CreateWindow(elementId: string, title?: string): void;

    function ElementExists(elementId: string): boolean;

    /**
     * Returns the player's mouse position in screen coordinates.
     *
     * Use this instead of `Input.GetMousePosition` when working with ImGui.
     */
    function GetMousePosition(): Vector;

    function GetWindowPinned(elementId: string): boolean;

    function Hide(): void;

    /**
     * Converts ImGui coordinates into world coordinates.
     *
     * This function will not work correctly if the game's scale factor exceeds MaxRenderScale.
     */
    function ImGuiToWorld(position: Vector): Vector;

    /**
     * Connects a window or popup element to another element, making said element as a "toggle" for
     * that window.
     *
     * ```ts
     * ImGui.CreateMenu("myMenu", "Test Menu")
     * ImGui.AddElement("myMenu", "myButton", ImGuiElement.MENU_ITEM, "Some Text")
     * ImGui.CreateWindow("myWindow", "Some Window Title")
     * ImGui.LinkWindowToElement("myWindow", "myButton")
     * ```
     */
    function LinkWindowToElement(windowId: string, elementId: string): void;

    /**
     * Displays a pop-up message window in the style of a notification.
     *
     * @param text
     * @param notificationType Default is `ImGuiNotificationType.INFORMATION`.
     * @param lifetime Default is 5000.
     */
    function PushNotification(
      text: string,
      notificationType?: ImGuiNotificationType,
      lifetime?: int,
    ): void;

    /** Removes a color modifier of the given type from the element. */
    function RemoveColor(elementId: string, colorType: ImGuiColor): void;

    function RemoveElement(elementId: string): void;

    function RemoveMenu(menuId: string): void;

    function Reset(): void;

    /**
     * Adds a color modifier to the element.
     *
     * @param elementId
     * @param colorType
     * @param red
     * @param green
     * @param blue
     * @param alpha Default is 0.
     */
    function SetColor(
      elementId: string,
      colorType: ImGuiColor,
      red: number,
      green: number,
      blue: number,
      alpha?: number,
    ): void;

    /**
     * Adds a helpmarker to a given element. A Helpmarker is a `(?)` element rendered on the right
     * of an element, which when hovered displays a tooltip.
     */
    function SetHelpmarker(elementId: string, text: string): void;

    /**
     * Adds a color modifier to text in the provided element.
     *
     * @param elementId
     * @param red
     * @param green
     * @param blue
     * @param alpha Default is 1.
     */
    function SetTextColor(
      elementId: string,
      red: number,
      green: number,
      blue: number,
      alpha?: number,
    ): void;

    /**
     * @param elementId Adds a tooltip to an element. The tooltip is displayed when hovering over
     *                  the element.
     * @param text
     */
    function SetTooltip(elementId: string, text: string): void;

    function SetVisible(elementId: string, isVisible: boolean): void;

    function SetWindowPinned(elementId: string, isPinned: boolean): void;

    /** Sets the position of the window in screen coordinates. */
    function SetWindowPosition(windowId: string, x: number, y: number): void;

    function SetWindowSize(
      windowId: string,
      width: number,
      height: number,
    ): void;

    function Show(): void;

    function UpdateText(elementId: string, text: string): void;

    /**
     * Converts world coordinates into ImGui coordinates.
     *
     * This function will not work correctly if the game's scale factor exceeds MaxRenderScale.
     */
    function WorldToImGui(position: Vector): Vector;
  }
}
