import type { Controller, Keyboard } from "isaac-typescript-definitions";
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
     * Adds a clickable button ImGui element and appends it to a specified parent element.
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
      clickCallback?: (clickCount: int) => void,
      isSmall?: boolean,
    ): void;

    /**
     * Registers a callback function to be executed when a specific event occurs on an ImGui
     * element.
     *
     * Note: An ImGui element can only have one callback per `ImGuiCallback` type.
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
     * Creates a clickable checkbox element and appends it to a specified parent element.
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
      changeCallback?: (isChecked: boolean) => void,
      isActive?: boolean,
    ): void;

    /**
     * Creates a dropdown combobox element and appends it to a specified parent.
     *
     * The combobox allows you to select a single value from a list of options.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param options Optional. Default is an empty array.
     * @param initialSelectedIndex Optional. Default is 0.
     * @param isSlider Optional. Default is false.
     */
    function AddCombobox(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (index: int, value: string) => void,
      options?: string[],
      initialSelectedIndex?: int,
      isSlider?: boolean,
    ): void;

    /**
     * Creates a draggable UI element for adjusting a floating point number and appends it to a
     * specified parent element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is 0.
     * @param speed Optional. Default is 1.
     * @param min Optional. Default is the smallest number that can be stored.
     * @param max Optional. Default is the largest number that can be stored.
     * @param formatting Optional. A formatting string used to control how the value is displayed.
     *                   Default is "%.3f".
     */
    function AddDragFloat(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (newValue: number) => void,
      defaultValue?: number,
      speed?: number,
      min?: number,
      max?: number,
      formatting?: string,
    ): void;

    /**
     * Creates a draggable UI element for adjusting an integer and appends it to a specified parent
     * element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is 0.
     * @param speed Optional. Default is 1.
     * @param min Optional. Default is the smallest number that can be stored.
     * @param max Optional. Default is the largest number that can be stored.
     * @param formatting Optional. A formatting string used to control how the value is displayed.
     *                   Default is "%.3f".
     */
    function AddDragInteger(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (newValue: int) => void,
      defaultValue?: int,
      speed?: number,
      min?: int,
      max?: int,
      formatting?: string,
    ): void;

    /**
     * Creates a new UI element of the specified `ImGuiElement` and appends it to a specified parent
     * element.
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
     * Creates a color picker element for selecting an RGBA color value and appends it to a
     * specified parent element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param r Optional. Default is 0.
     * @param g Optional. Default is 0.
     * @param b Optional. Default is 0.
     * @param a Optional. If undefined, the color picker will only allow you to pick RGB values.
     *          Default is undefined.
     */
    function AddInputColor(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (
        r: number,
        g: number,
        b: number,
        a: number | undefined,
      ) => void,
      r?: float,
      g?: float,
      b?: float,
      a?: float,
    ): void;

    /**
     * Creates a UI element for receiving input from a game controller and appends it to a specified
     * parent element.
     *
     * @param parentId
     * @param elementId
     * @param buttonLabel Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional is `Controller.D_PAD_LEFT`.
     */
    function AddInputController(
      parentId: string,
      elementId: string,
      buttonLabel?: string,
      changeCallback?: (button: Controller, buttonName: string) => void,
      defaultValue?: Controller,
    ): void;

    /**
     * Creates a UI element for inputting a floating point number and appends it to a specified
     * parent element.
     *
     * You can type a value or adjust it incrementally using step sizes.
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
      changeCallback?: (newValue: number) => void,
      defaultValue?: number,
      step?: number,
      stepFast?: number,
    ): void;

    /**
     * Creates a UI element for inputting an integer and appends it to a specified parent element.
     *
     * You can type a value or adjust it incrementally using step sizes.
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
      changeCallback?: (newValue: int) => void,
      defaultValue?: int,
      step?: int,
      stepFast?: int,
    ): void;

    /**
     * Creates a UI element for receiving input from the keyboard and appends it to a specified
     * parent element.
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
      changeCallback?: (newKey: Keyboard, keyName: string) => void,
      defaultValue?: Keyboard,
    ): void;

    /**
     * Creates a UI element for typing in text and appends it to a specified parent element.
     *
     * The element can only display one line of text at a time. If want it to display multiple lines
     * of text, use `ImGui.AddInputTextMultiline` instead.
     *
     * @param parentId
     * @param elementId
     * @param description Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is an empty string.
     * @param placeholderText Optional. Default is an empty string.
     */
    function AddInputText(
      parentId: string,
      elementId: string,
      description?: string,
      changeCallback?: (newText: string) => void,
      defaultValue?: string,
      placeholderText?: string,
    ): void;

    /**
     * Creates a UI element for typing in text and appends it to a specified parent element.
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
      changeCallback?: (newText: string) => void,
      defaultValue?: string,
      hintText?: string,
      displayedLines?: int,
    ): void;

    /**
     * Creates a histogram plot element to visualize the distribution of numbers and appends it to a
     * specified parent element.
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
     * Adds a UI element that visualizes plot lines and appends it to a specified parent element.
     *
     * The line plot is used to visualize trends or connections between numbers.
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
     * Adds a UI element that visualizes a progress bar and appends it to a specified parent
     * element.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param progress Optional. The progress value, represented as a number between 0.0 (empty) and
     *                 1.0 (full). Default is 0.
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
     * Creates a UI element that is a set of radio buttons and appends it to a specified parent
     * element.
     *
     * Radio buttons allow you to select a single option from a list.
     *
     * @param parentId
     * @param elementId
     * @param changeCallback Optional. Default is an empty function.
     * @param options Optional. Default is an empty array.
     * @param initialSelectedIndex Optional. Default is 0.
     * @param renderSameLine Optional. Default is true.
     */
    function AddRadioButtons(
      parentId: string,
      elementId: string,
      changeCallback?: (selectedIndex: int) => void,
      options?: string[],
      initialSelectedIndex?: int,
      renderSameLine?: boolean,
    ): void;

    /**
     * Creates a UI element that is a slider and appends it to a specified parent. The slider allows
     * you to adjust a floating-point value within a range.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is 0.
     * @param min Optional. Default is the smallest number Lua can store.
     * @param max Optional. Default is the largest number Lua can store.
     * @param formatting Optional. A formatting string used to control how the value is displayed.
     *                   Default is "%.3f".
     */
    function AddSliderFloat(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (newValue: number) => void,
      defaultValue?: number,
      min?: number,
      max?: number,
      formatting?: string,
    ): void;

    /**
     * Creates a UI element that is a slider and appends it to a specified parent. The slider allows
     * you to adjust an integer value within a range.
     *
     * @param parentId
     * @param elementId
     * @param label Optional. Default is an empty string.
     * @param changeCallback Optional. Default is an empty function.
     * @param defaultValue Optional. Default is 0.
     * @param min Optional. Default is the smallest number Lua can store.
     * @param max Optional. Default is the largest number Lua can store.
     * @param formatting Optional. A formatting string used to control how the value is displayed.
     *                   Default is "%d%".
     */
    function AddSliderInteger(
      parentId: string,
      elementId: string,
      label?: string,
      changeCallback?: (newValue: int) => void,
      defaultValue?: int,
      min?: int,
      max?: int,
      formatting?: string,
    ): void;

    /**
     * Adds a UI tab element and appends it to a specified parent. The parent should be a tab bar
     * element (see `ImGui.AddTabBar` for more information).
     *
     * Tabs provide a way to switch between different areas.
     */
    function AddTab(parentId: string, elementId: string, label: string): void;

    /** Creates a UI tab bar element to organize and switch between multiple areas. */
    function AddTabBar(parentId: string, elementId: string): void;

    /**
     * Creates a UI text element and appends it to a specified parent.
     *
     * @param parentId
     * @param text
     * @param wrapText Optional. If true, the text will wrap within the available space. If false,
     *                 the text will extend horizontally as needed. Default is false.
     * @param elementId Optional. Default is an empty string.
     */
    function AddText(
      parentId: string,
      text: string,
      wrapText?: boolean,
      elementId?: string,
    ): void;

    /**
     * Creates a main menu entry in the menu bar.
     *
     * @param elementId
     * @param label Optional. Default is an empty string.
     */
    function CreateMenu(elementId: string, label?: string): void;

    /**
     * Creates an ImGui window.
     *
     * @param elementId
     * @param title Optional. Default is an empty string.
     */
    function CreateWindow(elementId: string, title?: string): void;

    /** Returns whether an element with the specified id exists. */
    function ElementExists(elementId: string): boolean;

    /**
     * Returns the current mouse position in screen coordinates.
     *
     * Use this over `Input.GetMousePosition` when working with ImGui, otherwise you will end up
     * with an inaccurate position.
     */
    function GetMousePosition(): Vector;

    /** Returns whether a window element with the given id is currently visible. */
    function GetVisible(elementId: string): boolean;

    /** Returns whether a window element with the given id is currently pinned. */
    function GetWindowPinned(windowId: string): boolean;

    /** Hides the ImGui interface. */
    function Hide(): void;

    /**
     * Converts a position in ImGui coordinates to world coordinates.
     *
     * This function does not work correctly when the game's scale factor exceeds
     * `Options.MaxRenderScale`.
     */
    function ImGuiToWorld(position: Vector): Vector;

    /**
     * Returns whether the ImGui interface is currently visible. This does not account for pinned
     * windows.
     */
    function IsVisible(): boolean;

    /**
     * Links a window (or popup) to another element, making the element act as a toggle for the
     * window's visibility.
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
     * Displays a notification message.
     *
     * @param text
     * @param notificationType Optional. Default is `ImGuiNotificationType.INFO`.
     * @param lifetime Optional. The duration is measured in milliseconds. Default is 5000.
     */
    function PushNotification(
      text: string,
      notificationType?: ImGuiNotificationType,
      lifetime?: int,
    ): void;

    /** Removes a previously added callback of the specified `ImGuiCallback` from the element. */
    function RemoveCallback(
      elementId: string,
      callbackType: ImGuiCallback,
    ): void;

    /** Removes a previously added color modifier of the specified `ImGuiColor` from an element. */
    function RemoveColor(elementId: string, colorType: ImGuiColor): void;

    /** Removes an element. */
    function RemoveElement(elementId: string): void;

    /** Removes a menu. */
    function RemoveMenu(elementId: string): void;

    /** Removes a window. */
    function RemoveWindow(elementId: string): void;

    /** Resets ImGui back to its default state, removing any custom elements. */
    function Reset(): void;

    /**
     * Applies a color modifier to an element.
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
     * Adds a helpmarker (question mark icon) to an element. Hovering over the help marker will
     * display a tooltip with the provided text.
     */
    function SetHelpmarker(elementId: string, text: string): void;

    /**
     * Sets the text color of an ImGui element.
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

    /**
     * Sets a tooltip to an ImGui element. The tooltip will be displayed when you hover over the
     * element.
     */
    function SetTooltip(elementId: string, text: string): void;

    /** Sets the visibility of an ImGui element. */
    function SetVisible(elementId: string, visible: boolean): void;

    /**
     * Sets whether an ImGui window is pinned. Pinned windows remain open even when the main ImGui
     * interface is not visible.
     */
    function SetWindowPinned(windowId: string, pinned: boolean): void;

    /** Sets the position of an ImGui window in screen coordinates. */
    function SetWindowPosition(windowId: string, x: number, y: number): void;

    /** Sets the size of an ImGui window in pixels. */
    function SetWindowSize(
      WindowId: string,
      width: number,
      height: number,
    ): void;

    /** Opens the ImGui interface. */
    function Show(): void;

    /** Updates arbitrary data associated with an ImGui element. */
    function UpdateData<T extends keyof AddUpdateParametersImGui>(
      elementId: string,
      dataType: ImGuiData,
      newDataValues: AddUpdateParametersImGui[T],
    ): void;

    /** Updates the text content or label of an ImGui element. */
    function UpdateText(elementId: string, text: string): void;

    /** Converts world coordinates to ImGui coordinates. */
    function WorldToImGui(position: Vector): Vector;
  }
}
