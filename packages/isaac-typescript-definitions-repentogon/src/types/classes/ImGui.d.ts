import type { ActionTrigger, Keyboard } from "isaac-typescript-definitions";
import type { ImGuiCallback } from "../../enums/imgui/ImGuiCallback";
import type { ImGuiColor } from "../../enums/imgui/ImGuiColor";
import type { ImGuiData } from "../../enums/imgui/ImGuiData";
import type { ImGuiElement } from "../../enums/imgui/ImGuiElement";
import type { ImGuiNotificationType } from "../../enums/imgui/ImGuiNotificationType";

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
     * @param label Optional. Default is an empty string.
     * @param clickCallback Optional. Default is an empty function.
     * @param isSmall Optional. Default is false.
     */
    function AddButton(
      parentId: string,
      elementId: string,
      label?: string,
      clickCallback?: () => void,
      isSmall?: boolean,
    ): void;

    /**
     * Adds a callback to the ImGui element. An element can only have one callback per
     * `ImGuiElement`.
     *
     * @param elementId
     * @param callbackType
     * @param callbackFunction
     */
    function AddCallback(
      elementId: string,
      callbackType: ImGuiCallback,
      callbackFunction: () => void,
    ): void;

    /**
     * Adds a Checkbox element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param isActive Optional. Default is false.
     */
    function AddCheckbox(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: () => void,
      isActive?: boolean,
    ): void;

    /**
     * Adds a Combobox element which represents a single line element that allows you to select a
     * value from a dropdown menu. These values can be selected by interacting with a slider
     * element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param options Optional. Default is an empty array.
     * @param selectedIndex Optional. Default is 0.
     * @param isSlider Optional. Default is false.
     */
    function AddCombobox(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: () => void,
      options?: string[],
      selectedIndex?: int,
      isSlider?: boolean,
    ): void;

    /**
     * Adds a float dragger element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is 0.
     * @param speed Optional. Default is 1.
     * @param min Optional. Default is the smallest number that can be stored.
     * @param max Optional. Default is the largest number that can be stored.
     * @param formatting Optional. Default is "%.3f".
     */
    function AddDragFloat(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: () => void,
      defaultValue?: number,
      speed?: number,
      min?: number,
      max?: number,
      formatting?: string,
    ): void;

    /**
     * Adds a float dragger element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is 0.
     * @param speed Optional. Default is 1.
     * @param min Optional. Default is the smallest number that can be stored.
     * @param max Optional. Default is the largest number that can be stored.
     * @param formatting Optional. Default is "%d%".
     */
    function AddDragInteger(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: () => void,
      defaultValue?: int,
      speed?: number,
      min?: int,
      max?: int,
      formatting?: string,
    ): void;

    /**
     * Adds an element of the given type.
     *
     * @param parentId
     * @param elementId Optional. Default is an empty string.
     * @param elementType
     * @param label Optional. Default is an empty string.
     */
    function AddElement(
      parentId: string,
      elementId: string | undefined,
      elementType: ImGuiElement,
      label?: string,
    ): void;

    /**
     * Adds a RGBA color input.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param r Optional. Default is 0.
     * @param g Optional. Default is 0.
     * @param b Optional. Default is 0.
     * @param a Optional. Default is 1.
     */
    function AddInputColor(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: () => void,
      r?: float,
      g?: float,
      b?: float,
      a?: float,
    ): void;

    /**
     * Adds a controller input element.
     *
     * @param parentId
     * @param elementId
     * @param buttonLabel Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional is `ButtonAction.LEFT`.
     */
    function AddInputController(
      parentId: string,
      elementId: string,
      buttonLabel?: string,
      changeCallback?: () => void,
      defaultValue?: ActionTrigger,
    ): void;

    /**
     * Adds a float input element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is 0.
     * @param step Optional. Default is 1.
     * @param stepFast Optional. Default is 100.
     */
    function AddInputFloat(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: () => void,
      defaultValue?: number,
      step?: number,
      stepFast?: number,
    ): void;

    /**
     * Adds an integer input element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is 0.
     * @param step Optional. Default is 1.
     * @param stepFast Optional. Default is 100.
     */
    function AddInputInteger(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: () => void,
      defaultValue?: int,
      step?: int,
      stepFast?: int,
    ): void;

    /**
     * Adds a Keyboard button input element.
     *
     * @param parentId
     * @param elementId
     * @param buttonLabel Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is 0.
     */
    function AddInputKeyboard(
      parentId: string,
      elementId: string,
      buttonLabel?: string,
      changeCallback?: () => void,
      defaultValue?: Keyboard,
    ): void;

    /**
     * Adds a text input element.
     *
     * @param parentId
     * @param elementId
     * @param description Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is an empty string.
     * @param hintText Optional. Default is an empty string.
     */
    function AddInputText(
      parentId: string,
      elementId: string,
      description?: string,
      changeCallback?: () => void,
      defaultValue?: string,
      hintText?: string,
    ): void;

    /**
     * Adds a multiline text input element.
     *
     * @param parentId
     * @param elementId
     * @param description Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is an empty string.
     * @param hintText Optional. Default is an empty string.
     * @param displayedLines Optional. Default is 6.
     */
    function AddInputTextMultiline(
      parentId: string,
      elementId: string,
      description?: string,
      changeCallback?: () => void,
      defaultValue?: string,
      hintText?: string,
      displayedLines?: int,
    ): void;

    /**
     * Adds a bar-diagram displaying the given data as vertical bars.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param values Optional. Default is an empty array.
     * @param overlayText Optional. Default is an empty string.
     * @param min Optional. Default is the smallest number that Lua can hold.
     * @param max Optional. Default is the largest number that Lua can hold.
     * @param height Optional. Default is 40.
     */
    function AddPlotHistogram(
      parentId: string,
      elementId: string,
      label?: string,
      values?: number[],
      overlayText?: string,
      min?: number,
      max?: number,
      height?: number,
    ): void;

    /**
     * Adds a line-diagram connecting the given values.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param values Optional. Default is an empty array.
     * @param min Optional. Default is the smallest number that Lua can hold.
     * @param max Optional. Default is the largest number that Lua can hold.
     * @param height Optional. Default is 40.
     */
    function AddPlotLines(
      parentId: string,
      elementId: string,
      label?: string,
      values?: number[],
      min?: number,
      max?: number,
      height?: number,
    ): void;

    /**
     * Adds a progress bar element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param progress Optional. Determines how much the progress bar is filled. The value must be
     *                 between 0 and 1. Default is 0.
     * @param overlayText Optional. Default is "DEFAULT".
     */
    function AddProgressBar(
      parentId: string,
      elementId: string,
      label?: string,
      progress?: float,
      overlayText?: string,
    ): void;

    /**
     * Adds a Radio Button element.
     *
     * @param parentId
     * @param elementId
     * @param changeCallback Optional. Default is an empty function.
     * @param options Optional. Default is an empty array.
     * @param selectedIndex Optional. Default is 0.
     * @param renderSameLine Optional. Default is true.
     */
    function AddRadioButtons(
      parentId: string,
      elementId: string,
      changeCallback?: () => void,
      options?: string[],
      selectedIndex?: int,
      renderSameLine?: boolean,
    ): void;

    /**
     * Adds a float slider element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is 0.
     * @param min Optional. Default is the smallest number Lua can store.
     * @param max Optional. Default is the largest number Lua can store.
     * @param formatting Optional. Default is "%.3f".
     */
    function AddSliderFloat(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: () => void,
      defaultValue?: number,
      min?: number,
      max?: number,
      formatting?: string,
    ): void;

    /**
     * Adds an integer slider element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is 0.
     * @param min Optional. Default is the smallest number Lua can store.
     * @param max Optional. Default is the largest number Lua can store.
     * @param formatting Optional. Default is "%d%".
     */
    function AddSliderInteger(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: () => void,
      defaultValue?: int,
      min?: int,
      max?: int,
      formatting?: string,
    ): void;

    /**
     * Adds a tab element.
     *
     * A tab is a clickable area that shows another page or area. For it to work, its parent element
     * must be a tab bar.
     */
    function AddTab(parentId: string, elementId: string, label: string): void;

    /**
     * Adds a tab bar element.
     *
     * A tab bar is used to store tab elements.
     */
    function AddTabBar(parentId: string, elementId: string): void;

    /**
     * Adds a text element.
     *
     * @param parentId
     * @param text
     * @param wrapText Optional. If true, the text will wrap onto the window borders. Otherwise, it
     *                 will expand the window's content until it fits. Default is false.
     * @param elementId Optional. Default is an empty string.
     */
    function AddText(
      parentId: string,
      text: string,
      wrapText?: boolean,
      elementId?: string,
    ): void;

    /**
     * Creates an entry to the main menu bar of Repentogon.
     *
     * @param elementId
     * @param label Optional. Default is an empty string.
     */
    function CreateMenu(elementId: string, label?: string): void;

    /**
     * Creates a window. You need to use `ImGui.LinkWindowToElement` or `ImGui.SetVisible` to toggle
     * the visibility of the window.
     *
     * @param elementId
     * @param title Optional. Default is an empty string.
     */
    function CreateWindow(elementId: string, title?: string): void;

    /** Returns whether an element with the given id exists. */
    function ElementExists(elementId: string): boolean;

    /**
     * Returns the position of the mouse in screen coordinates.
     *
     * Use this over `Input.GetMousePosition` when working with ImGui.
     */
    function GetMousePosition(): Vector;

    /** Returns whether a window element with the given id is visible or not. */
    function GetVisible(elementId: string): boolean;

    /** Returns whether a window element with the given id is pinned or not. */
    function GetWindowPinned(windowId: string): boolean;

    /** Closes ImGui. */
    function Hide(): void;

    /**
     * Converts ImGui coordinates into World Coordinates.
     *
     * This function does not work correctly when the game's scale factor exceeds
     * `Options.MaxRenderScale`.
     */
    function ImGuiToWorld(position: Vector): Vector;

    /** Returns whether ImGui is visible. This does not account for pinned windows. */
    function IsVisible(): boolean;

    /**
     * Links a window or popup element to another element, making said element act as a toggle for
     * the window.
     *
     * **Example**
     *
     * ```ts
     * ImGui.CreateMenu("myMenu", "Test Menu");
     * ImGui.AddElement("myMenu", "myButton", ImGuiElement.MenuItem, "Some Text");
     * ImGui.CreateWindow("myWindow", "Some Window Title");
     * ImGui.LinkWindowToElement("myWindow", "myButton");
     * ```
     */
    function LinkWindowToElement(windowId: string, elementId: string): void;

    /**
     * Displays a notification.
     *
     * @param text
     * @param notificationType Optional. Default is `ImGuiNotificationType.INFO`.
     * @param lifetime Optional. Default is 5000.
     */
    function PushNotification(
      text: string,
      notificationType?: ImGuiNotificationType,
      lifetime?: int,
    ): void;

    /** Removes the callback of the given type from the element. */
    function RemoveCallback(
      elementId: string,
      callbackType: ImGuiCallback,
    ): void;

    /** Removes a color modifier of the given type from the element. */
    function RemoveColor(elementId: string, colorType: ImGuiColor): void;

    /** Removes the element. */
    function RemoveElement(elementId: string): void;

    /** Removes the menu. */
    function RemoveMenu(elementId: string): void;

    /** Removes the window. */
    function RemoveWindow(elementId: string): void;

    /** Removes all custom defined ImGui elements and resets ImGui back to its original state. */
    function Reset(): void;

    /**
     * Adds a color modifier to an element.
     *
     * @param elementId
     * @param colorType
     * @param r
     * @param g
     * @param b
     * @param a Optional. Default is 1.
     */
    function SetColor(
      elementId: string,
      colorType: ImGuiCallback,
      r: float,
      g: float,
      b: float,
      a?: float,
    ): void;

    /**
     * Adds a helpmarker to an element.
     *
     * A helpmarker is a question mark element rendered on the right of an element, which displays a
     * tooltip when hovered over.
     */
    function SetHelpmarker(elementId: string, text: string): void;

    /**
     * Sets the text color of an element.
     *
     * Equivalent of `ImGui.SetColor` using `ImGuiElement.TEXT`.
     *
     * @param elementId
     * @param r
     * @param g
     * @param b
     * @param a Optional. Default is 1.
     */
    function SetTextColor(
      elementId: string,
      r: float,
      g: float,
      b: float,
      a?: float,
    ): void;

    /** Adds a tooltip to an element. The tooltip is visible when the element is hovered over. */
    function SetTooltip(elementId: string, text: string): void;

    /** Sets the element's visibility. */
    function SetVisible(elementId: string, visible: boolean): void;

    /**
     * Sets whether a window is pinned or not.
     *
     * A pinned window is visible even when the ImGui interface is not active.
     */
    function SetWindowPinned(windowId: string, pinned: boolean): void;

    /** Sets the position of a window in screen coordinates. */
    function SetWindowPosition(windowId: string, x: number, y: number): void;

    /** Sets the size of the window in pixels. */
    function SetWindowSize(
      WindowId: string,
      width: number,
      height: number,
    ): void;

    /** Opens ImGui. */
    function Show(): void;

    /** Updates arbitrary data of a given element. */
    function UpdateData<T extends keyof AddUpdateParametersImGui>(
      elementId: string,
      dataType: ImGuiData,
      newDataValues: AddUpdateParametersImGui[T],
    ): void;

    /** Updates the text or label of an element. This is a shortcut to `ImGui.UpdateData`. */
    function UpdateText(elementId: string, text: string): void;

    /**
     * Converts world coordinates into ImGui coordinates.
     *
     * @param position
     */
    function WorldToImGui(position: Vector): Vector;
  }
}
