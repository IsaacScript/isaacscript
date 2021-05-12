export {};

declare global {
  /** @noSelf */
  namespace Input {
    function GetActionValue(action: ButtonAction, controllerID: int): float;
    function GetButtonValue(button: Keyboard, controllerID: int): float;
    function GetMousePosition(gameCoords: boolean): Vector;
    function IsActionPressed(action: ButtonAction, controllerID: int): boolean;
    function IsActionTriggered(
      action: ButtonAction,
      controllerID: int,
    ): boolean;
    function IsButtonPressed(button: Keyboard, controllerID: int): boolean;
    function IsButtonTriggered(button: Keyboard, controllerID: int): boolean;
    function IsMouseBtnPressed(button: Mouse): boolean;
  }
}
